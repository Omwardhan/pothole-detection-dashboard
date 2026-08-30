import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Parses and normalizes various Firestore timestamp formats into a standard JS Date.
 */
export const normalizeTimestamp = (raw) => {
  if (!raw) return new Date();
  if (typeof raw.toDate === 'function') {
    return raw.toDate();
  }
  if (raw instanceof Date) {
    return raw;
  }
  if (typeof raw === 'string' || typeof raw === 'number') {
    const parsed = new Date(raw);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }
  return new Date();
};

/**
 * Parses a raw Firestore document strictly into the 5 confirmed schema fields:
 * - confidence (number)
 * - class (string)
 * - timestamp (Date)
 * - camera_id (string)
 * - test (boolean)
 */
export const parseDetection = (id, data) => {
  const confidence = typeof data.confidence === 'number' ? data.confidence : parseFloat(data.confidence) || 0;
  
  return {
    id: id,
    confidence: Number(confidence.toFixed(4)),
    class: data.class || 'pothole',
    timestamp: normalizeTimestamp(data.timestamp),
    camera_id: data.camera_id || 'pi4-001',
    test: Boolean(data.test)
  };
};

/**
 * Subscribes to the Firestore 'detections' collection in real-time.
 * 
 * @param {Function} onUpdate - Callback invoked with parsed, sorted detections array.
 * @param {Function} onError - Callback invoked with error object if connection/permission fails.
 * @returns {Function} Unsubscribe function.
 */
export const subscribeToFirestoreDetections = (onUpdate, onError) => {
  if (!db) {
    if (onError) onError(new Error('Firestore database instance is not initialized.'));
    return () => {};
  }

  try {
    const detectionsRef = collection(db, 'detections');
    const q = query(detectionsRef, orderBy('timestamp', 'desc'), limit(150));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const detections = snapshot.docs.map((doc) => parseDetection(doc.id, doc.data()));
        onUpdate(detections);
      },
      (error) => {
        console.error('[Firestore Error]: Error in detections listener:', error);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error('[Firestore Subscribe Error]:', err);
    if (onError) onError(err);
    return () => {};
  }
};

/**
 * Computes core statistical metrics from a detections array.
 */
export const calculateStats = (detections = []) => {
  if (!detections || detections.length === 0) {
    return {
      totalPotholes: 0,
      todayDetections: 0,
      averageConfidence: 0,
      latestConfidence: 0,
      latestDetection: null
    };
  }

  const now = new Date();
  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Filter detections recorded today
  const todayDets = detections.filter((d) => isSameDay(d.timestamp, now));
  
  // Calculate average confidence
  const totalConfidence = detections.reduce((sum, d) => sum + (d.confidence || 0), 0);
  const avgConf = detections.length > 0 ? (totalConfidence / detections.length) * 100 : 0;

  // Latest detection is the first element (since array is sorted newest first)
  const latest = detections[0] || null;
  const latestConf = latest ? (latest.confidence || 0) * 100 : 0;

  return {
    totalPotholes: detections.length,
    todayDetections: todayDets.length,
    averageConfidence: Number(avgConf.toFixed(1)),
    latestConfidence: Number(latestConf.toFixed(1)),
    latestDetection: latest
  };
};

/**
 * Calculates hourly detections over time for the temporal chart.
 */
export const calculateTimeDistribution = (detections = []) => {
  if (!detections || detections.length === 0) return [];

  // Group by hour of the day (00:00 to 23:00)
  const hourlyCounts = {};
  
  // Initialize with 24 hours or dynamic range based on available detections
  detections.forEach((d) => {
    const dDate = d.timestamp;
    const hour = dDate.getHours();
    const periodKey = `${hour.toString().padStart(2, '0')}:00`;
    hourlyCounts[periodKey] = (hourlyCounts[periodKey] || 0) + 1;
  });

  // Sort chronologically
  const sortedHours = Object.keys(hourlyCounts).sort();

  return sortedHours.map((time) => ({
    time,
    detections: hourlyCounts[time]
  }));
};

/**
 * Calculates distribution of detection confidence buckets.
 */
export const calculateConfidenceDistribution = (detections = []) => {
  const buckets = [
    { range: '50-59%', min: 0.50, max: 0.5999, count: 0 },
    { range: '60-69%', min: 0.60, max: 0.6999, count: 0 },
    { range: '70-79%', min: 0.70, max: 0.7999, count: 0 },
    { range: '80-89%', min: 0.80, max: 0.8999, count: 0 },
    { range: '90-100%', min: 0.90, max: 1.0001, count: 0 },
  ];

  if (!detections || detections.length === 0) return buckets;

  detections.forEach((d) => {
    const conf = d.confidence;
    for (const b of buckets) {
      if (conf >= b.min && conf <= b.max) {
        b.count += 1;
        break;
      }
    }
  });

  return buckets;
};
