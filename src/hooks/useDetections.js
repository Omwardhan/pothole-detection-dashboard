import { useState, useEffect, useMemo } from 'react';
import { shouldUseMockData, isFirebaseConfigured } from '../config/firebaseConfig';
import { MOCK_DETECTIONS } from '../data/mockDetections';
import { 
  subscribeToFirestoreDetections, 
  calculateStats, 
  calculateTimeDistribution, 
  calculateConfidenceDistribution 
} from '../services/detections';

export const useDetections = () => {
  const [detections, setDetections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if we are running in Mock Data mode
  const isMockMode = shouldUseMockData();

  useEffect(() => {
    let unsubscribe = () => {};

    if (isMockMode) {
      // Load mock detections with proper sorting (newest first)
      const sortedMock = [...MOCK_DETECTIONS].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setDetections(sortedMock);
      setIsLoading(false);
      setError(null);
    } else {
      // Connect to Firestore real-time listener
      setIsLoading(true);
      setError(null);

      unsubscribe = subscribeToFirestoreDetections(
        (fetchedDetections) => {
          setDetections(fetchedDetections);
          setIsLoading(false);
          setError(null);
        },
        (err) => {
          console.error('[useDetections Hook] Firestore Listener error:', err);
          setError(err.message || 'Failed to connect to Firestore detections collection.');
          setIsLoading(false);
        }
      );
    }

    return () => {
      unsubscribe();
    };
  }, [isMockMode]);

  // Derived statistics and chart data
  const stats = useMemo(() => calculateStats(detections), [detections]);
  const timeDistribution = useMemo(() => calculateTimeDistribution(detections), [detections]);
  const confidenceDistribution = useMemo(() => calculateConfidenceDistribution(detections), [detections]);

  // Determine realistic subsystem statuses
  const firebaseStatus = useMemo(() => {
    if (isMockMode) return 'mock';
    if (error) return 'disconnected';
    if (isLoading) return 'connecting';
    return isFirebaseConfigured() ? 'connected' : 'disconnected';
  }, [isMockMode, error, isLoading]);

  // YOLO Status: Active if recent detection arrived in the last 15 minutes, otherwise Standby/Unknown
  const yoloStatus = useMemo(() => {
    if (detections.length === 0) return 'unknown';
    const latest = detections[0];
    if (!latest || !latest.timestamp) return 'unknown';
    
    const diffMinutes = (Date.now() - new Date(latest.timestamp).getTime()) / (1000 * 60);
    return diffMinutes <= 30 ? 'active' : 'standby';
  }, [detections]);

  return {
    detections,
    stats,
    latestDetection: stats.latestDetection,
    timeDistribution,
    confidenceDistribution,
    isLoading,
    error,
    isMockMode,
    firebaseStatus,
    yoloStatus
  };
};
