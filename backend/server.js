import express from "express"
import cors from "cors"
import ItemRepository from "./persistence/ItemRepository.js";

const app = express()
let repository = {}
try {
    repository = new ItemRepository()
    await repository.connect()
} catch (error) {
    console.log("Error ocurred " + error)
    process.exit(0)
}

app.use(cors())
app.use(express.json())

//Endpoints
app.get("/item", async (req, res) => {
    let items = await repository.findAll()
    res.send(items)
        .status(200)
})

app.post("/item", async (req, res) => {
    let item = req.body
    await repository.save(item)
    res.send({message: "POST OK"})
        .status(200)
})

app.put("/item", async (req, res) => {
    let item = req.body
    await repository.replace(item)
    res.send({message: "PUT OK"})
        .status(200)
})


app.delete("/item", async (req, res) => {
    let item = req.body
    await repository.delete(item)
    res.send({message: "DELETE OK"})
        .status(200)
})

app.delete("/item/all", async (req, res) => {
    let body = req.body
    await repository.deleteAll(body.ids)
    res.send({message: "DELETE ALL OK"})
        .status(200)
})

app.listen(5000, () => console.log("app is running"))


process.on("SIGINT", async () => {
    await repository.close()
    console.log("Exit Succefull!");
    process.exit(0)
})



