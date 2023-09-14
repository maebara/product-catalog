import cron from 'node-cron'
import axios from "axios";

class PingCron {

    constructor() {
        this.host = "https://product-catalog-backend-jmws.onrender.com"
    }

    run() {
        cron.schedule('*/10 * * * *', () => {
            axios.get(this.host + "/ping")
                .then(r => r)
                .catch(error => console.log(error))
        })
    }

}

export default PingCron;