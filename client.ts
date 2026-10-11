const hostname = "localhost";
const port = 3000;

// Create multiple clients and connect them to the server
const CLIENTS = 5;

for (let i = 0; i < CLIENTS; i++) {
    const socket = new WebSocket(`ws://${hostname}:${port}/chat?username=Client${i + 1}`);

    socket.onopen = () => {
        console.log(`Client${i + 1} connected`);
        socket.send(`Hello from Client${i + 1}`);
    }

    socket.onmessage = (event) => {
        console.log(`Client${i + 1} received: ${event.data}`);
    }
}