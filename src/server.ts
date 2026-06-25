import config from "./config"
import app from "./app"
import { prisma } from "./lib/prisma"
function main() {
    try {
        prisma.$connect()
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`)
        })
    }
    catch (err:any){
        console.error("Error starting server:", err.message)
        prisma.$disconnect()
    }
}


main()