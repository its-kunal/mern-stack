// Module Imports
import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"

// Local Imports
import BookModel from "./models/booksModel.js"
import BookRoute from "./routes/BookRoutes.js"
import UserRoute from "./routes/UserRoutes.js"

// Constants for App
const app = express()
const port = 4000

// App uses
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
// App Routes
// Books Get request
app.use("/books", BookRoute)
app.use("/user", UserRoute)
app.get("/", async (req, res) => {

    res.send("Hello from server")
})

// App Listening Or Connection
// Database Connection
app.listen(port, () => {
    console.log(`Server is live at http://localhost:${port}`)
    mongoose.connect('mongodb://localhost:27017/mern-books')
        .then(() => {
            console.log("Connected to DB")
        })
        .catch((err) => {
            console.log(`Error from DB: ${err}`)
        })
})
