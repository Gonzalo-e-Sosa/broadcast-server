interface WebSocketData {
    username: string;
}

function getUsernameFromReq(req: Request): string {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    if (!username) {
        throw new Error("Username is required");
    }
    return username;
}

const connectedClients = new Set<Bun.ServerWebSocket<WebSocketData>>();

const server: Bun.Server<WebSocketData> = Bun.serve({
    fetch(req, server) {
        const url = new URL(req.url);
        if (url.pathname === "/chat") {
            console.log(`upgrade!`);
            const username = getUsernameFromReq(req);
            const success = server.upgrade(req, { data: { username } });
            return success ? new Response("WebSocket upgraded", { status: 101 }) : new Response("WebSocket upgrade error", { status: 400 });
        }

        return new Response("Not Found", { status: 404 });
    },
    websocket: {
        // a socket is opened
        open(ws) {
            connectedClients.add(ws);
            console.log(`Client connected: ${ws.data.username}`);
        },
        // a message is received
        message(ws, message) {
            console.log(`Message from ${ws.data.username}: ${message}`);

            // broadcast the message to all connected clients
            for (const client of connectedClients) {
                if (client !== ws) {
                    client.send(`${ws.data.username}: ${message}`);
                }
            }
        },
        // the socket is ready to receive more data
        drain(ws) {
            console.log(`Socket is ready to receive more data: ${ws.data.username}`);
        },
        // a socket is closed
        close(ws, code, message) {
            connectedClients.delete(ws);
            console.log(`Client disconnected: ${ws.data.username}`);
        },
    }
});

console.log(`Server running on ${server.hostname}:${server.port}`);