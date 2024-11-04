import { useEffect, useRef, useState, useCallback } from 'react';

export default function useWebSocket(url: string) {
  const [message, setMessage] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket is connected');
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'ping') {
        sendMessage({ type: 'pong', payload: message.payload });
      } else {
        setMessage(event.data); // 使用 setState 更新 message
      }
    };

    ws.current.onerror = () => {
      setError(new Error('WebSocket error'));
    };

    ws.current.onclose = () => {
      if (isConnected) {
        console.log('WebSocket is closed');
      }
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = useCallback(
    (message: any) => {
      if (ws.current && isConnected) {
        ws.current.send(JSON.stringify(message));
      } else {
        console.error('WebSocket is not connected');
      }
    },
    [isConnected]
  );

  return { message, isConnected, error, sendMessage };
}
