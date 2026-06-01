import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext();

function SocketProvider({ children, socketUrl }) {

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(socketUrl);
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

function useSocket() {
    const contextsocket = useContext(SocketContext);

    if (!contextsocket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return contextsocket;
}

export default SocketProvider
export { useSocket }