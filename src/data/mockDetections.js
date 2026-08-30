/**
 * Mock Detection Records
 * Used strictly for local development, offline demos, and unit testing.
 * 
 * Strictly contains ONLY the confirmed Firestore fields:
 * - confidence (number)
 * - class (string: "pothole")
 * - timestamp (Date)
 * - camera_id (string: "pi4-001")
 * - test (boolean)
 * 
 * NO fabricated GPS coordinates, severity levels, bounding boxes, or image links.
 */

// Helper to generate a timestamp relative to current local time
const getOffsetTime = (minutesAgo) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date;
};

export const MOCK_DETECTIONS = [
  {
    id: "mock-det-001",
    confidence: 0.912,
    class: "pothole",
    timestamp: getOffsetTime(3),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-002",
    confidence: 0.845,
    class: "pothole",
    timestamp: getOffsetTime(12),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-003",
    confidence: 0.768,
    class: "pothole",
    timestamp: getOffsetTime(25),
    camera_id: "pi4-001",
    test: true
  },
  {
    id: "mock-det-004",
    confidence: 0.890,
    class: "pothole",
    timestamp: getOffsetTime(42),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-005",
    confidence: 0.684,
    class: "pothole",
    timestamp: getOffsetTime(65),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-006",
    confidence: 0.821,
    class: "pothole",
    timestamp: getOffsetTime(90),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-007",
    confidence: 0.542,
    class: "pothole",
    timestamp: getOffsetTime(125),
    camera_id: "pi4-001",
    test: true
  },
  {
    id: "mock-det-008",
    confidence: 0.938,
    class: "pothole",
    timestamp: getOffsetTime(160),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-009",
    confidence: 0.715,
    class: "pothole",
    timestamp: getOffsetTime(195),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-010",
    confidence: 0.882,
    class: "pothole",
    timestamp: getOffsetTime(240),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-011",
    confidence: 0.627,
    class: "pothole",
    timestamp: getOffsetTime(300),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-012",
    confidence: 0.793,
    class: "pothole",
    timestamp: getOffsetTime(360),
    camera_id: "pi4-001",
    test: true
  },
  {
    id: "mock-det-013",
    confidence: 0.854,
    class: "pothole",
    timestamp: getOffsetTime(420),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-014",
    confidence: 0.675,
    class: "pothole",
    timestamp: getOffsetTime(480),
    camera_id: "pi4-001",
    test: false
  },
  {
    id: "mock-det-015",
    confidence: 0.901,
    class: "pothole",
    timestamp: getOffsetTime(540),
    camera_id: "pi4-001",
    test: false
  }
];
