# broadcast-server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

To type check:

```bash
bun check
```

This project was created using `bun init` in bun v1.4.3. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## TODOs

- [x] Create a server that listens for incoming connections.
- [x] When a client connects, store the connection in a list of connected clients.
- [x] When a client sends a message, broadcast this message to all connected clients.
- [x] Handle client disconnections and remove the client from the list of connected clients.
- [x] Implement a client that can connect to the server and send messages.
- [x] Test the server by connecting multiple clients and sending messages.
- [ ] Implement error handling and graceful shutdown of the server.

