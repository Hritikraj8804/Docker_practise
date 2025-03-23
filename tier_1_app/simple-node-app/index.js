const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Simple Node.js Webpage</title>
    </head>
    <body>
      <h1>Hello from Node.js!</h1>
      <p>This is a simple one-tier webpage.</p>
      <p>Current time: ${new Date()}</p>
    </body>
    </html>
  `);
});

const port = 3000; // You can change this port number

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});