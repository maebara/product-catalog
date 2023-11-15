import express from "express"
import cors from "cors"
import ItemRepository from "./persistence/ItemRepository.js";
import PingCron from "./cron/PingCron.js";
import winston, { transports, format } from 'winston';
import * as jose from 'jose'
import MongoDBConnection from "./persistence/MongoDBConnection.js";
import UserRepository from "./persistence/UserRepository.js";
import bcrypt from 'bcryptjs';

const app = express()
let repository = {}
let userRepository = {}
let mongoDBConnection = {}
let SECRET = '8njJKw1ExEGAaeqDhidTB9KRL3mBCx5g'

try {
    mongoDBConnection = new MongoDBConnection()
    let connection = await mongoDBConnection.connect();
    repository = new ItemRepository(connection)
    userRepository = new UserRepository(connection)
} catch (error) {
    console.log("Error ocurred " + error)
    process.exit(0)
}

const logger = winston.createLogger({
    level: 'debug',
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
    try {
        logger.log({ level: 'info', message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip} ` })
        let items = await repository.findAll()
        res.send(items)
            .status(200)
    } catch (error) {
        logger.error({
            message: `Error Message: ${error.message}`
        })
        res.status(500)
            .send({ message: error.message })
    }
})

app.post("/item", async (req, res) => {
    try {
        logger.log({
            level: 'info',
            message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}, body: ${JSON.stringify(req.body)}`
        })
        let item = req.body
        await repository.save(item)
        res.send({ message: "POST OK" })
            .status(200)
    } catch (error) {
        logger.error({
            message: `Error Message: ${error.message}`
        })
        res.status(500)
            .send({ message: error.message })
    }
})

app.put("/item", async (req, res) => {
    try {
        logger.log({
            level: 'info',
            message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}, body: ${JSON.stringify(req.body)}`
        })
        let item = req.body
        await repository.replace(item)
        res.send({ message: "PUT OK" })
            .status(200)
    } catch (error) {
        logger.error({
            message: `Error Message: ${error.message}`
        })
        res.status(500)
            .send({ message: error.message })
    }
})

app.put("/item/all", async (req, res) => {
    try {
        logger.info({
            message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}, body: ${JSON.stringify(req.body)}`
        })
        let items = req.body
        await repository.replaceAll(items)
        res.send({ message: "PUT OK" })
            .status(200)
    } catch (error) {
        logger.error({
            message: `Error Message: ${error.message}`
        })
        res.status(500)
            .send({ message: error.message })
    }
})


app.delete("/item", async (req, res) => {
    try {
        logger.log({
            level: 'info',
            message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}, body: ${JSON.stringify(req.body)}`
        })
        const secret = new TextEncoder().encode(SECRET)
        let jwt = req.headers.authorization
        if (!jwt) {
            res
                .status(401)
                .send({ error: "Authorization Token Required" })
            return;
        }
        await jose.jwtVerify(jwt, secret)

        let item = req.body
        await repository.delete(item)
        res.send({ message: "DELETE OK" })
            .status(200)
    } catch (error) {
        logger.error({
            message: `Error: ${error}`
        })

        res.status(500)
            .send({ message: error.message })
    }
})

app.delete("/item/all", async (req, res) => {
    try {
        logger.log({
            level: 'info',
            message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}, body: ${JSON.stringify(req.body)}`
        })
        let body = req.body
        await repository.deleteAll(body.ids)
        res.send({ message: "DELETE ALL OK" })
            .status(200)
    } catch (error) {
        logger.error({
            message: `Error Message: ${error.message}`
        })
        res.status(500)
            .send({ message: error.message })
    }
})

app.get("/ping", async (req, res) => {
    try {
        logger.log({ level: 'info', message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}` })

        //    const secret = new TextEncoder().encode(SECRET)
        //    let jwt = req.headers.authorization
        //    await jose.jwtVerify(jwt, secret)

        // console.log(verified)
        res.send("pong")
            .status(200)
    } catch (error) {
        logger.error({
            message: `Error Message: ${error.message}`
        })
        res.status(500)
            .send({ message: error.message })
    }
})


app.post("/auth/token", async (req, res) => {
    try {
        logger.log({ level: 'info', message: `Incoming request: ${req.url}, method: ${req.method}, from: ${req.ip}` })
        const secret = new TextEncoder().encode(SECRET)
        const alg = 'HS256'

        let body = req.body

        //await userRepository.save({ user: 'userHere', pass: bcrypt.hashSync('passwordHere') })

        let user = await userRepository.findByUsername(body.user);

        if (user == null) {
            res.status(404)
                .send({ error: "User Not Found" })
            return;
        }

        if (!bcrypt.compareSync(body.pass, user.pass)) {
            res.status(401)
                .send({ error: "Invalid credentials" })
            return;
        }

        const jwt = await new jose.SignJWT({ user: 'Usuarioadmin32' })
            .setProtectedHeader({ alg })
            .setExpirationTime('12h')
            .sign(secret)

        res.status(200)
            .send({ token: jwt })
    } catch (error) {
        logger.error({
            message: `Error: ${error}`
        })
        res.status(500)
            .send({ message: error.message })
    }
})


app.listen(5000, () => console.log("app is running"))

process.on("SIGINT", async () => {
    await mongoDBConnection.close()
    console.log("Exit Succefull!");
    process.exit(0)
})

let pingCron = new PingCron();
pingCron.run();

