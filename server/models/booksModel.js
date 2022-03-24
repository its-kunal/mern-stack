import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    athName: {
        type: String,
        required: true
    },
    datePublished: {
        type: Date,
        default: Date.now()
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    imageUrls: [String]
})

const bookModel = mongoose.model("Books", bookSchema)
export default bookModel