import * as http from 'http';
import * as fs from 'fs';
import { IncomingMessage, ServerResponse } from 'http';

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse): void => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/feedback') {
        fs.readFile('feedback.json', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Error reading data' }));
                return;
            }
            try {
                const feedback = data ? JSON.parse(data) : [];
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(feedback));
            } catch (parseError) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Error parsing data' }));
            }
        });
        return;
    }

    if (req.method === 'POST' && req.url === '/feedback') {
        let body: string = '';
        req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            fs.readFile('feedback.json', 'utf8', (err, data) => {
                let feedback: any[] = [];
                if (!err && data) {
                    try {
                        feedback = JSON.parse(data);
                    } catch (parseError) {
                        feedback = [];
                    }
                }
                const newFeedback = JSON.parse(body);
                feedback.push(newFeedback);
                fs.writeFile('feedback.json', JSON.stringify(feedback, null, 2), (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ message: 'Error saving data' }));
                        return;
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Feedback saved successfully', data: newFeedback }));
                });
            });
        });
        return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
});

    server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/feedback`);
});
