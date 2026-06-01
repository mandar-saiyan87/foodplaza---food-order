import { Server } from "socket.io"

let io;

export function initSocket(server) {
    io = new Server(
        server,
        {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })

    io.on('connection', (socket) => {
        console.log('Socket connected', socket.id)

        socket.on("join-order", (orderId) => {
            socket.join(orderId)
        })

        socket.on("leave-room", (room) => {
            socket.leave(room)
        })
    })

    return io;
}

export function getIo() {
    if (!io) {
        throw new Error("Socket.io not initialized!")
    }
    return io;
}