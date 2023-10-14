import express from "express"
import cors from "cors"
import ItemRepository from "./persistence/ItemRepository.js";
import PingCron from "./cron/PingCron.js";
import winston, { transports, format } from 'winston';

const app = express()
let repository = {}
try {
    repository = new ItemRepository()
    await repository.connect()
} catch (error) {
    console.log("Error ocurred " + error)
    process.exit(0)
}


const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [new transports.Console()]
});

app.use(cors())
app.use(express.json())

//Endpoints
app.get("/item", async (req, res) => {
    logger.log({ level: 'info', message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip} ` })
    let items = await repository.findAll()
    res.send(items)
        .status(200)
})

app.post("/item", async (req, res) => {
    logger.log({
        level: 'info',
        message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}, body: ${JSON.stringify(req.body)}`
    })
    let item = req.body
    await repository.save(item)
    res.send({ message: "POST OK" })
        .status(200)
})

app.put("/item", async (req, res) => {
    logger.log({
        level: 'info',
        message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}, body: ${JSON.stringify(req.body)}`
    })
    let item = req.body
    await repository.replace(item)
    res.send({ message: "PUT OK" })
        .status(200)
})

app.put("/item/all", async (req, res) => {
    logger.log({
        level: 'info',
        message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}, body: ${JSON.stringify(req.body)}`
    })
    let items = req.body
    await repository.replaceAll(items)
    res.send({ message: "PUT OK" })
        .status(200)
})


app.delete("/item", async (req, res) => {
    logger.log({
        level: 'info',
        message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}, body: ${JSON.stringify(req.body)}`
    })
    let item = req.body
    await repository.delete(item)
    res.send({ message: "DELETE OK" })
        .status(200)
})

app.delete("/item/all", async (req, res) => {
    logger.log({
        level: 'info',
        message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}, body: ${JSON.stringify(req.body)}`
    })
    let body = req.body
    await repository.deleteAll(body.ids)
    res.send({ message: "DELETE ALL OK" })
        .status(200)
})

app.get("/ping", async (req, res) => {
    logger.log({ level: 'info', message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}` })
    res.send("pong")
        .status(200)
})

app.listen(5000, () => console.log("app is running"))

process.on("SIGINT", async () => {
    await repository.close()
    console.log("Exit Succefull!");
    process.exit(0)
})


let pingCron = new PingCron();
pingCron.run();

