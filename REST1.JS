

const http = require('http');
const url = require('url');

const menu = [
{ id: 1, dishname: "Burger", price: 100 },
{ id: 2, dishname: "pizza", price: 800 },
{ id: 3, dishname: "fries", price: 1000 },
];
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;
    console.log(req.method);

    res.setHeader("Content-Type", "application/json");
    if (method === "GET" && path === "/menu") {
        res.writeHead(200);
        res.end(JSON.stringify(menu));
    }
    else if (method === "GET--" && path.startsWith("/menu/")) {
        const id = path.split("/")[2];
        const item = menu.find((item) => item.id == id);
        if (item) {
            res.writeHead(200);
            res.end(JSON.stringify(item));
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Dish not found" }));
        }
    }


});
server.listen(5000, () => {
    console.log("Server running on port 5000");
});




