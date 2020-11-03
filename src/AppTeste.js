/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect, useState } from "react";
import socketio from "socket.io-client";

function App() {
  const [messages, setMessages] = useState([]);

  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: {
          user_id: 1,
          employee: false,
        },
      }),
    []
  );

  useEffect(() => {
    socket.on("notification", (notification) =>
      setMessages([...messages, { ...notification }])
    );
  }, [socket]);

  return (
    <div>
      <p>Teste.</p>
      {messages.length > 0 && messages.map(({ message }) => <p>{message}</p>)}
    </div>
  );
}

export default App;
