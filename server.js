require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Process-level Error Handler
process.on('uncaughtException', (err) => {
    console.error(`[${new Date().toISOString()}] UNCAUGHT EXCEPTION:`, err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(`[${new Date().toISOString()}] UNHANDLED REJECTION at:`, promise, 'reason:', reason);
});

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js
// Standard init usually works best unless there's a custom structure.
const app = next({ dev });
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
    if (process.env.pm_id !== undefined) {
        try {
            const { createAdapter } = require("@socket.io/cluster-adapter");
            io.adapter(createAdapter());
            console.log(`[Server] Applied Cluster Adapter (ID: ${process.env.pm_id})`);
        } catch (e) {
            console.warn('[Server] Cluster adapter not available:', e.message);
        }
    } else {
        console.log('[Server] Single-core mode active.');
    }

    console.log('[Server] Socket.io initialized.');

    // Import socket logic
    const { initSocket } = require('./src/lib/socket-logic');
    initSocket(io);

    httpServer.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
}).catch((err) => {
    console.error("Next.js prepare failed:", err);
    process.exit(1);
});
