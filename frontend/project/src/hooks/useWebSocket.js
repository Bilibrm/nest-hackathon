import { useEffect, useCallback, useState } from 'react';
import webSocketService from '../services/websocket';

export function useWebSocket(event, callback) {
  const [isConnected, setIsConnected] = useState(false);
  
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    webSocketService.socket?.on('connect', handleConnect);
    webSocketService.socket?.on('disconnect', handleDisconnect);
    
    if (webSocketService.socket?.connected) {
      setIsConnected(true);
    }

    webSocketService.subscribe(event, memoizedCallback);

    return () => {
      webSocketService.socket?.off('connect', handleConnect);
      webSocketService.socket?.off('disconnect', handleDisconnect);
      webSocketService.unsubscribe(event, memoizedCallback);
    };
  }, [event, memoizedCallback]);

  return {
    isConnected,
    emit: (data) => webSocketService.emit(event, data),
  };
}