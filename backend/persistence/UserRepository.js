import { ObjectId } from "mongodb";

class UserRepository {
    constructor(connection) {
        this.collection = connection.db("products-catalog").collection("users")
    }

    async findAll() {
        return await this.collection.find({})
            .toArray()
    }

    async findByUsername(username) {
        return await this.collection.findOne({ user: username })
    }

    async save(user) {
        return await this.collection.insertOne(user)
    }

    async delete(user) {
        let filter = { "_id": new ObjectId(user._id) };
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

}

export default UserRepository;