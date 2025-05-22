import * as http from 'http';
import * as fs from 'fs';
import { IncomingMessage, ServerResponse } from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse): void => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/customers') {
        fs.readFile('customer.json', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Error reading data' }));
                return;
            }
            try {
                const customers = data ? JSON.parse(data) : [];
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(customers));
            } catch (parseError) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Error parsing data' }));
            }
        });
        return;
    }

    if (req.method === 'POST' && req.url === '/customers') {
        let body: string = '';
        req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            fs.readFile('customer.json', 'utf8', (err, data) => {
                let customers: any[] = [];
                if (!err && data) {
                    try {
                        customers = JSON.parse(data);
                    } catch (parseError) {
                        customers = [];
                    }
                }
                customers.push(JSON.parse(body));
                fs.writeFile('customer.json', JSON.stringify(customers, null, 2), (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ message: 'Error saving data' }));
                        return;
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Data saved successfully', data: JSON.parse(body) }));
                });
            });
        });
        return;
    }

    if (req.method === 'PUT' && req.url && req.url.startsWith('/customers/')) {
        const customerId = req.url.split('/')[2]; 
        let body: string = '';
        
        req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            fs.readFile('customer.json', 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ message: 'Error reading data' }));
                    return;
                }

                let customers: any[] = [];
                try {
                    customers = JSON.parse(data);
                } catch (parseError) {
                    customers = [];
                }

                const customerIndex = customers.findIndex(customer => customer.id === parseInt(customerId));

                if (customerIndex === -1) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: 'Customer not found' }));
                    return;
                }

                const updatedCustomer = { ...customers[customerIndex], ...JSON.parse(body) };

                customers[customerIndex] = updatedCustomer;

                fs.writeFile('customer.json', JSON.stringify(customers, null, 2), (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ message: 'Error saving data' }));
                        return;
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Customer updated successfully', data: updatedCustomer }));
                });
            });
        });
        return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/customers`);
});
