const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Serve static files from src directory
app.use('/src', express.static('src'));

// Handle root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! Please refresh the page.');
});

// Start server with port retry logic
const startServer = (retryPort = PORT) => {
    app.listen(retryPort)
        .on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${retryPort} is busy, trying ${retryPort + 1}...`);
                startServer(retryPort + 1);
            } else {
                console.error('Server error:', err);
            }
        })
        .on('listening', () => {
            console.log(`Server running at http://localhost:${retryPort}/`);
            console.log('To stop the server, press Ctrl+C');
        });
};

startServer(); 