import { io, type Socket } from "socket.io-client";
import { API_BASE_URL } from "@/lib/api/config";

let socket: Socket | null = null;

/**
 * Returns a singleton Socket.io client instance.
 * Lazily connects on first call.
 */
export function getSocket(): Socket {
  if (!socket) {
    socket = io(API_BASE_URL, {
      autoConnect: true,
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  }
  return socket;
}
