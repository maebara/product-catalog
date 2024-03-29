import { ObjectId } from "mongodb";

class ItemRepository {
    constructor(connection) {
        this.collection = connection.db("products-catalog").collection("items")
    }

    async findAll() {
        return await this.collection.find({})
            .toArray()
    }

    async save(item) {
        return await this.collection.insertOne(item)
    }

    async delete(item) {
        let filter = { "_id": new ObjectId(item._id) };
        return await this.collection.deleteOne(filter)
    }

    async deleteAll(items) {
        let ids = items.map(itemId => new ObjectId(itemId));
        return await this.collection.deleteMany({ _id: { $in: ids } })
    }

    async replace(item) {
        let filter = { "_id": new ObjectId(item._id) };
        delete item._id
        return await this.collection.replaceOne(filter, item)
    }

    async replaceAll(items) {
        let operations = items.map(item => {
            let filter = { "_id": new ObjectId(item._id) };
            delete item._id
            return {
                replaceOne: {
                    "filter": filter,
                    "replacement": item
                }
            }
        })
        return await this.collection.bulkWrite(operations)
    }

    async close() {
        await this.client.close();
    }
}

export default ItemRepository;