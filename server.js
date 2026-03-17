require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Process-level Error Handler
process.on('uncaughtException', (err) => {
    console.error(`[${new Date().toISOString()}] UNCAUGHT EXCEPTION:`, err.stack);
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

    // Redis Adapter for Cluster Mode (PM2 support)
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
        try {
            const { createAdapter } = require("@socket.io/redis-adapter");
            const { createClient } = require("redis");
            
            const pubClient = createClient({ url: redisUrl });
            const subClient = pubClient.duplicate();

            pubClient.on('error', (err) => console.error('[Redis] Pub Client Error:', err));
            subClient.on('error', (err) => console.error('[Redis] Sub Client Error:', err));

            Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
                io.adapter(createAdapter(pubClient, subClient));
                console.log(`[Server] Applied Redis Adapter (ID: ${process.env.pm_id || 'solo'})`);
            }).catch(err => {
                console.error('[Server] Redis connection failed:', err);
            });
        } catch (e) {
            console.error('[Server] Redis adapter initialization error:', e.message);
        }
    } else if (process.env.pm_id !== undefined) {
        // Fallback to local cluster adapter if Redis URL is missing but PM2 is detected
        try {
            const { createAdapter } = require("@socket.io/cluster-adapter");
            io.adapter(createAdapter());
            console.log(`[Server] Applied Local Cluster Adapter (ID: ${process.env.pm_id})`);
        } catch (e) {
            console.warn('[Server] Local Cluster adapter not available:', e.message);
        }
    } else {
        console.log('[Server] Single-core mode active (No Redis/Cluster).');
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
