"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var hostname = '127.0.0.1';
var port = 3000;
var server = http.createServer(function (req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    // Handling GET request for customers
    if (req.method === 'GET' && req.url === '/customers') {
        fs.readFile('customer.json', 'utf8', function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Error reading data' }));
                return;
            }
            try {
                var customers = data ? JSON.parse(data) : [];
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(customers));
            }
            catch (parseError) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Error parsing data' }));
            }
        });
        return;
    }
    // Handling POST request to add a customer
    if (req.method === 'POST' && req.url === '/customers') {
        var body_1 = '';
        req.on('data', function (chunk) {
            body_1 += chunk.toString();
        });
        req.on('end', function () {
            fs.readFile('customer.json', 'utf8', function (err, data) {
                var customers = [];
                if (!err && data) {
                    try {
                        customers = JSON.parse(data);
                    }
                    catch (parseError) {
                        customers = [];
                    }
                }
                customers.push(JSON.parse(body_1));
                fs.writeFile('customer.json', JSON.stringify(customers, null, 2), function (err) {
                    if (err) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ message: 'Error saving data' }));
                        return;
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Data saved successfully', data: JSON.parse(body_1) }));
                });
            });
        });
        return;
    }
    // Handling PUT request to update customer data
    if (req.method === 'PUT' && req.url && req.url.startsWith('/customers/')) {
        var customerId_1 = req.url.split('/')[2]; // Extract customer ID from URL
        var body_2 = '';
        req.on('data', function (chunk) {
            body_2 += chunk.toString();
        });
        req.on('end', function () {
            fs.readFile('customer.json', 'utf8', function (err, data) {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ message: 'Error reading data' }));
                    return;
                }
                var customers = [];
                try {
                    customers = JSON.parse(data);
                }
                catch (parseError) {
                    customers = [];
                }
                var customerIndex = customers.findIndex(function (customer) { return customer.id === parseInt(customerId_1); });
                if (customerIndex === -1) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: 'Customer not found' }));
                    return;
                }
                // Update the customer data
                var updatedCustomer = __assign(__assign({}, customers[customerIndex]), JSON.parse(body_2));
                customers[customerIndex] = updatedCustomer;
                // Save the updated data back to the JSON file
                fs.writeFile('customer.json', JSON.stringify(customers, null, 2), function (err) {
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
    // If no matching routes are found
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
});
server.listen(port, hostname, function () {
    console.log("Server running at http://".concat(hostname, ":").concat(port, "/customers"));
});
