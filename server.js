/**
 * Disclaimer:
 * Some parts of this assignment were developed with the assistance of AI-based tools (e.g., ChatGPT)
 * to generate code structure, explanations, and documentation.
 * All AI-generated content was reviewed, tested, and adapted by the student to meet the course requirements.
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const utils = require('./modules/utils');

const PORT = process.env.PORT || 3000;

function safeName(name) {
    return /^[\w.\-]+$/.test(name) ? name : null;
}

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    // --- Part B: Get Date ---
    // /COMP4537/labs/3/getDate/?name=Heraldo
    if (pathname === '/COMP4537/labs/3/getDate') {
        const name = query.name || 'Guest';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(utils.getDate(name));
        return;
    }

    // --- Part C.1: Write File ---
    // /COMP4537/labs/3/writeFile/?text=BCIT
    if (pathname === '/COMP4537/labs/3/writeFile') {
        const text = query.text;
        if (!text) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Error: Missing "text" query parameter');
            return;
        }
        const filePath = path.join(__dirname, 'file.txt');
        fs.appendFile(filePath, text + '\n', 'utf8', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server error: could not write to file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Appended "${text}" to file.txt`);
        });
        return;
    }

    // --- Part C.2: Read File ---
    // /COMP4537/labs/3/readFile/file.txt
    if (pathname.startsWith('/COMP4537/labs/3/readFile/')) {
        const filename = pathname.split('/').pop();
        const safe = safeName(filename);
        if (!safe) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad filename');
            return;
        }
        const filePath = path.join(__dirname, safe);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`404 Not Found: ${filename}`);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
        return;
    }

    // --- Fallback ---
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})