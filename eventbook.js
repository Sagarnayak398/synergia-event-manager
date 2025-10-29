const express = require('express');
const app = express();

app.use(express.json());

let events = [
    { id: 1, name: "Music Concert", date: "2023-10-15", location: "New York" },
    { id: 2, name: "Art Exhibition", date: "2023-11-20", location: "Los Angeles" },
    { id: 3, name: "Tech Conference", date: "2024-01-10", location: "San Francisco" },
];

app.post('/events', (req, res) => {
    const { name, date, location } = req.body || {};
    const newEvent = {
        id: events.length ? events[events.length - 1].id + 1 : 1,
        name: name,
        date: date,
        location: location,
    };
    events.push(newEvent);
    res.status(201).send({ data: events, message: "Event created successfully" });
});

app.get('/events',(req,res) => {
    res.status(200).send({data: events, message: "Events retrieved successfully"});
});

app.post('/events/:id',(req,res) => {
    const {name, date, location} = req.body || {};
    const newEvent = {
        id:events.length + 1,
        name:req.body.name,
        date:req.body.date,
        location:req.body.location,
    };
    events.push(newEvent);
    res.status(201).send({data:events, message:"Event created successfully"});
});

app.put('/events/:id',(req,res) => {
    const eventId = parseInt(req.params.id);
    const {name, date, location} = req.body || {};
    const findEvent = events.find(e => e.id === eventId);
    if(!findEvent){
        res.status(404).send({message:"Event not found"});
        return;
    }
    if(name) findEvent.name = name;
    if(date) findEvent.date = date;
    if(location) findEvent.location = location;

    res.status(200).send({data:events, message:"Event updated successfully"});
});
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})