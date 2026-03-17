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
// Use absolute path for dir to avoid 'production build not found' logic issues on Linux
const app = next({ 
    dev, 
    hostname, 
    port, 
    dir: path.resolve(__dirname) 
});
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

    // PM2 / Cluster Mode Support
    // Use the specific PM2 adapter for better stability in clustered environments
    if (process.env.pm_id !== undefined) {
        try {
            // Check if pm2-adapter is installed
            const { createAdapter } = require("@socket.io/pm2-adapter");
            io.adapter(createAdapter());
            console.log(`[Server] Applied PM2 Cluster Adapter (ID: ${process.env.pm_id})`);
        } catch (e) {
            console.warn('[Server] PM2 adapter not found. For better scaling, run: npm install @socket.io/pm2-adapter');
            // Falling back to internal IPC check or default
        }
    } else {
        console.log('[Server] Single-core/Standard mode. Default adapter active.');
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
