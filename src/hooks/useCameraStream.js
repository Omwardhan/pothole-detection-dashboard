import { useState, useCallback } from 'react';
import { PI_VIDEO_URL } from '../config/firebaseConfig';

export const useCameraStream = () => {
  const [streamUrl, setStreamUrl] = useState(PI_VIDEO_URL);
  const [streamState, setStreamState] = useState('connecting'); // 'connecting' | 'streaming' | 'offline'
  const [reconnectKey, setReconnectKey] = useState(0);

  const handleImageLoaded = useCallback(() => {
    setStreamState('streaming');
  }, []);

  const handleImageError = useCallback(() => {
    setStreamState('offline');
  }, []);

  const retryConnection = useCallback(() => {
    setStreamState('connecting');
    setReconnectKey((prev) => prev + 1);
  }, []);

  return {
    streamUrl,
    streamState,
    reconnectKey,
    handleImageLoaded,
    handleImageError,
    retryConnection
  };
};
