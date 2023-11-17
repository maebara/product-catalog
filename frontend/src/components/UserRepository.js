import axios from "axios";

class UserRepository {
    constructor() {
        //this.host = "http://localhost:5000"
        this.host = "https://product-catalog-backend-jmws.onrender.com"
    }

    async getToken(user) {
        return await axios.post(this.host + "/auth/token", user)
    }

}

export default UserRepository;