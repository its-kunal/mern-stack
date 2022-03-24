import express from "express"
import userModel from "../models/userModel.js"
import bcrpyt from "bcrpyt"

const router = express.Router()

// Add new user
router.get("/add",async(req,res)=>{
    const {name,email,password}=req.body
    userModel.create({
        name,email,password:bcrpyt.hashSync(password,10)
    })
    .then((db)=>{
        console.log(db)
        res.send(db)
    })
    .catch((err)=>{
        console.log(err)
        res.sendStatus(500)
    })
})

// Login User
router.post("/login", async (req, res) => {
    const { name, email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
        await bcrpyt.genSalt(10, async (err, salt) => {
            await bcrpyt.hash(password, salt, async (err, hash) => {
                if (hash === user.password) {
                    res.send(user)
                }
            })
        })
    }
    else {
        res.sendStatus(404)
    }
})

// update a User
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const { name, email, password } = req.body
    const hashPswd = await bcrpyt.hash(password, 10)
    const user = await userModel.findByIdAndUpdate(id, {
        name, email, password: hashPswd
    })
    res.send(user)
})


// Delete a user
router.delete("/del/:id", async (req, res) => {
    const id = req.params.id
    const user = await userModel.findByIdAndDelete(id)
    res.send(user)
})

export default router