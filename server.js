import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import serveStatic from 'serve-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(serveStatic('public', { 
    maxAge: '1d',
    index: ['index.html']
}));

// Serve static files from src directory
app.use('/src', serveStatic('src', { 
    maxAge: '1d',
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Handle root path
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! Please refresh the page.');
});

// Handle 404s
app.use((req, res) => {
    res.status(404).sendFile(join(__dirname, 'public/index.html'));
});

// Start server with port retry logic
const startServer = (retryPort = PORT) => {
    const server = app.listen(retryPort)
        .on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${retryPort} is busy, trying ${retryPort + 1}...`);
                server.close();
                startServer(retryPort + 1);
            } else {
                console.error('Server error:', err);
            }
        })
        .on('listening', () => {
            const url = `http://localhost:${retryPort}`;
            console.log('\n🎲 Virtual Bet Simulator is running!');
            console.log(`📱 Open your browser and navigate to: ${url}`);
            console.log('🛑 To stop the server, press Ctrl+C\n');
        });
};

startServer(); 