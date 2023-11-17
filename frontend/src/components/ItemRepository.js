import axios from "axios";

class ItemRepository {
    constructor() {
        //this.host= "http://localhost:5000"
        this.host = "https://product-catalog-backend-jmws.onrender.com"

        this.client = axios.create({
            baseURL: "https://product-catalog-backend-jmws.onrender.com",
            timeout: 10000, // 10 seconds
        });
    }

    async getItems() {
        return await axios.get(this.host + "/item")
    }

    async createItem(item) {
        let token = this.getToken()
        return await axios.post(this.host + "/item", item, {
            headers: {
                'Authorization': token
            }
        })
    }

    async deleteAll(items) {
        let token = this.getToken()
        return await axios.delete(this.host + "/item/all", { data: items }, {
            headers: {
                'Authorization': token
            }
        })
    }

    async updateAll(items) {
        let token = this.getToken()
        return await axios.put(this.host + "/item/all", items, {
            headers: {
                'Authorization': token
            }
        })
    }

    getToken() {
        return window.sessionStorage.getItem("token");
    }
    /*
   return await new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve()
       }, 500)

   })*/
}

export default ItemRepository;