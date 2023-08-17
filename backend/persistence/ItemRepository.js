import {MongoClient, ServerApiVersion} from "mongodb"
import {ObjectId} from "mongodb";

class ItemRepository {
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
        this.collection = {}
    }

    async connect() {
        this.connection = await this.client.connect()
        this.collection = await this.connection.db("products-catalog").collection("items")
    }

    async findAll() {
        return await this.collection.find({})
            .toArray()
    }

    async save(item) {
        return await this.collection.insertOne(item)
    }

    async replace(item) {
        let filter = {"_id": new ObjectId(item._id)};
        delete item._id
        return await this.collection.replaceOne(filter, item)
    }

    async delete(item) {
        let filter = {"_id": new ObjectId(item._id)};
        return await this.collection.deleteOne(filter)
    }

    async deleteAll(items) {
        let ids = items.map(itemId => new ObjectId(itemId));
        return await this.collection.deleteMany({_id: {$in: ids}})
    }

    async close() {
        await this.client.close();
    }
}

export default ItemRepository;