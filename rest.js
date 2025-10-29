const http = require('http');
const { URL } = require('url');

const menu = [
    { id: 1, dishName: "Burger", price: 300 },
    { id: 2, dishName: "Pizza", price: 800 },
    { id: 3, dishName: "Coke", price: 100 },
];

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (method === "GET" && path === "/menu") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(menu));
    }

    else if (method === "GET" && path.startsWith("/menu/")) {
        const id = parseInt(path.split("/")[2]);
        const item = menu.find((item) => item.id === id);
        if (item) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(item));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Item not found" }));
        }
    }

    else if (method === "POST" && path === "/menu") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const newItem = JSON.parse(body);
            newItem.id = menu.length + 1;
            menu.push(newItem);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Item added", item: newItem }));
        });
    }

    else if (method === "PUT" && path.startsWith("/menu/")) {
        const id = parseInt(path.split("/")[2]);
        const itemIndex = menu.findIndex((item) => item.id === id);

        if (itemIndex !== -1) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                const updatedData = JSON.parse(body);
                menu[itemIndex] = { ...menu[itemIndex], ...updatedData };
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Item updated", item: menu[itemIndex] }));
            });
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Item not found" }
            
            ));
        }
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
