const http = require('http');
const url = require('url');
const utils = require('./modules/utils');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    if (pathname === '/') {  
        const name = query.name || 'Guest';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(utils.getDate(name));
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});