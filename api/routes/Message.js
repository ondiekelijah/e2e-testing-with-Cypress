const router = require("express").Router();
const Message = require("../model/Message");

// Save message to database
router.post("/", async (req, res) => {
    // Message contains name, email, message
    // Validate both name and email

    const { name, email, message } = req.body;
    // Validate all the 3 fields, if any of them is empty, return error also match email format
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    // Assert email format
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email" });
    }

    // Save message to database
    const newMessage = new Message({
        name,
        email,
        message,
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json({ success: "Message sent successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
    
