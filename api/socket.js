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


        // Join a room for new order created
        socket.on("orderupdates", () => {
            socket.join("neworder")
        })

        // Leave room for new order created
        socket.on("leave-orderupdates", () => {
            socket.leave("neworder")
        })

        // Join a room for a specific order status updated
        socket.on("join-order", (orderId) => {
            socket.join(orderId)
        })


        // Leave room for a specific order status updated
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