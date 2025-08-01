import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { createDefaultAdmin } from "./src/user/user.controller.js"
config()
const startServer = async () => {
    try {
        await initServer();
        await createDefaultAdmin();
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
};

startServer();