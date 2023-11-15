import { MongoClient, ServerApiVersion } from "mongodb"

class MongoDBConnection {
    constructor() {
        const url = "mongodb+srv://sergioxfernando98:TXX5YYFVRBLiWY0e@cluster0.jh3spm5.mongodb.net/?retryWrites=true&w=majority";
        this.client = new MongoClient(url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        this.connection = {}
    }

    async connect() {
        this.connection = await this.client.connect()
        return this.connection;
    }

    async close() {
        await this.client.close();
    }
}

export default MongoDBConnection;