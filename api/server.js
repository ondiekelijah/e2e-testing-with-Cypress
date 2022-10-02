const express = require("express");
const app = express();

const cors = require("cors");

const moongose = require("mongoose")
const dotenv = require("dotenv")

const messageRoute = require("./routes/Message")


dotenv.config();

moongose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("DB connected")
}).catch((error) => {
    console.log(error)
})

// Middleware
app.use(cors({
    origin: '*'
}));

app.use(express.json())
app.use("/api/contact", messageRoute)


app.listen(5000, () => {
    console.log("Server is up")
})