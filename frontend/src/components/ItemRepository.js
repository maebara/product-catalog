import axios from "axios";

class ItemRepository {
    constructor() {
        this.host = "https://product-catalog-backend-jmws.onrender.com"
    }

    async getItems() {
        return await axios.get(this.host + "/item")
    }

    async createItem(item) {
        return await axios.post(this.host + "/item", item)
    }

    async deleteAll(items) {
        return await axios.delete(this.host + "/item/all", {data: items})
    }

    /*
   return await new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve()
       }, 500)

   })*/
}

export default ItemRepository;