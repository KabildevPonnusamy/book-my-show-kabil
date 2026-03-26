const app = require('./app');
const AppDataSource = require('./data-source');

const PORT = 8080;

(async () => {
    try {
        // await AppDataSource.connect()
         console.log("Step 1: Starting app...");
        await AppDataSource.connect();
        console.log("Step 2: Connected to Database..."); // use "winston" logger
        app.listen(PORT, () => {
                console.log("Server running at MongoDB Atlas");
                
        })
    } catch(err) {
        console.log("DB Error: ", err);
    }
})()// -- Immediately Invoked Function Expression (IIFE)