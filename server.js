const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
    // Handle root path
    if (req.url === '/') {
        req.url = '/public/index.html';
    }

    // Get file path
    let filePath = path.join(__dirname, req.url);
    const ext = path.extname(filePath);
    
    // Set content type
    const contentType = MIME_TYPES[ext] || 'text/plain';

    // Read file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('To stop the server, press Ctrl+C');
}); 