/**
 * Disclaimer:
 * Some parts of this assignment were developed with the assistance of AI-based tools (e.g., ChatGPT)
 * to generate code structure, explanations, and documentation.
 * All AI-generated content was reviewed, tested, and adapted by the student to meet the course requirements.
 */

const http = require('http');
const url = require('url');
const utils = require('./modules/utils');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    // Only this route: /getDate/?name=Heraldo
    if (pathname === '/getDate') {
        const name = query.name || 'Guest';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(utils.getDate(name));
        return;
    }

    // Optional convenience: allow "/" and redirect to /getDate with name if provided
    if (pathname === '/') {
        const name = query.name || 'Guest';
        res.writeHead(302, { 'Location': `/getDate/?name=${encodeURIComponent(name)}` });
        res.end();
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});