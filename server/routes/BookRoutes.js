import express from "express"
import BookModel from "../models/booksModel.js"


const router = express.Router()

router.get("/", async (req, res) => {
    const Books = await BookModel.find({})
    res.send(Books)
})
// Delete All
router.delete("/delete/all", async (req, res) => {
    if (req.headers.user === "admin") {
        await BookModel.deleteMany({})
            .then((db) => {
                console.log(db)
                res.send(db)
            })
            .catch(er => {
                console.log(er)
            })
    }
    else {
        res.status(404).send("Cannot accept your request")
    }
})

// Add New Book
router.post("/add", async (req, res) => {
    const { title, description, athName, datePublished, ratings, imageUrls } = req.body
    BookModel.create({
        title, description, athName, datePublished, ratings, imageUrls
    })
        .then((db) => {
            console.log(db)
            res.redirect("/books")
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
})
// Get a particular Book
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const book = await BookModel.findById(id)
    res.send(book)
})
// Update a particular Book
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, athName, datePublished, ratings, imageUrls } = req.body
    const book = await BookModel.findByIdAndUpdate(id, {
        title, description, athName, datePublished, ratings, imageUrls
    })
    res.send(book)
})
// Delete a particular Book
router.delete("/del/:id", async (req, res) => {
    const id = req.params.id
    const book = await BookModel.findByIdAndDelete(id)
    res.send(book)
})

export default router