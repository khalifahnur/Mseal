import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NODE_ENV === "production"
  ? "https://msealserver-production.up.railway.app"
  : "http://localhost:3002";

interface WebSocketData {
  paymentStatus: "Pending" | "Completed" | "Failed";
}

const useSocketData = (event: string, transactionReference: string | null) => {
  const [data, setData] = useState<WebSocketData>({
    paymentStatus: "Pending",
  });

  useEffect(() => {
    if (!transactionReference) {
      //console.log("No transactionReference, skipping Socket.IO connection");
      return;
    }

    const socket: Socket = io(SOCKET_URL, {
      query: { transactionReference },
      withCredentials: true,
    });

    socket.on("connect", () => {
      //console.log("Socket.IO connected to", SOCKET_URL, "with transactionReference:", transactionReference);
    });

    socket.on(event, (newData: WebSocketData) => {
      //console.log("Received data:", newData);
      setData(newData);
    });

    socket.on("connect_error", () => {
      //console.error("Socket.IO connection error:", err.message);
      toast.error("Failed to connect to server. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
      });
    });

    return () => {
      socket.off(event);
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
      //console.log("Socket.IO disconnected");
    };
  }, [event, transactionReference]);

  return data;
};

export default useSocketData;