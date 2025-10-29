
const express = require('express');
const app = express();
app.use(express.json());

let bookings = [];

app.get('/api/bookings', (req, res) => {
    res.status(200).json({ success: true, message: "All event bookings fetched successfully.", data: bookings });
});

app.post('/api/bookings', (req, res) => {
    const { name, email, eventName } = req.body;
    if (!name || !email || !eventName) {
        return res.status(400).json({ success: false, message: "Please provide name, email, and eventName." });
    }
    const newBooking = { id: bookings.length + 1, name, email, eventName };
    bookings.push(newBooking);
    res.status(201).json({ success: true, message: "Booking created successfully.", data: newBooking });
});

app.get('/api/bookings/:id', (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });
    res.status(200).json({ success: true, message: "Booking details fetched successfully.", data: booking });
});

app.put('/api/bookings/:id', (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });
    const { name, email, eventName } = req.body;
    if (name) booking.name = name;
    if (email) booking.email = email;
    if (eventName) booking.eventName = eventName;
    res.status(200).json({ success: true, message: "Booking updated successfully.", data: booking });
});

app.delete('/api/bookings/:id', (req, res) => {
    const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: "Booking not found." });
    bookings.splice(index, 1);
    res.status(200).json({ success: true, message: "Booking cancelled successfully." });
});

app.listen(3000, () => console.log('Synergia Event Booking API running at http://localhost:3000'));
