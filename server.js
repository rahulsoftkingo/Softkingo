require('dotenv').config();
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    // Initialize Socket.io with WebSocket transport only
    // This avoids sticky session issues in cluster mode and meets user requirement.
    console.log('[Server] Initializing Socket.io (WebSocket only)...');
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
        transports: ['websocket'], // Force WebSockets as requested
        allowEIO3: true
    });

    // PM2 / Cluster Mode Support (without Redis)
    // Check if running in a cluster environment
    const cluster = require('cluster');
    if (!cluster.isMaster || process.env.pm_id !== undefined) {
        try {
            const { createAdapter } = require("@socket.io/cluster-adapter");
            io.adapter(createAdapter());
            console.log(`[Server] Applied Cluster/PM2 Adapter (Instance: ${process.env.pm_id || 'Worker'})`);
        } catch (e) {
            console.warn('[Server] Cluster adapter not available, using default.', e.message);
        }
    } else {
        console.log('[Server] Single-core mode. Default adapter in use.');
    }

    console.log('[Server] Socket.io initialized.');

    // Import socket logic
    const { initSocket } = require('./src/lib/socket-logic');
    initSocket(io);

    httpServer.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
