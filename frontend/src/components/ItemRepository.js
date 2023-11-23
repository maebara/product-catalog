import axios from "axios";
import sessionStorage from "./SessionStorage";

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
        const options = {
            url: this.host + "/item/all",
            method: 'DELETE',
            headers: {
                'Authorization': token
            },
            data: items
        }
        return await axios(options)
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
        return sessionStorage.getToken();
    }
    /*
   return await new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve()
       }, 500)

   })*/
}

export default ItemRepository;