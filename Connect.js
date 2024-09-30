const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
//const url = "mongodb+srv://<db_username>:<db_password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority";

// Replace the following with your Atlas connection string                                                                                                                                        
//const url = "mongodb+srv://Vikas:rRvfhZ68PSd12ZMJ@cluster0.ubp909w.mongodb.net/Digi2l/?retryWrites=true&w=majority";

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://Vikas:vksadmin@cluster0.ubp909w.mongodb.net/Digi2l";


// Connect to your Atlas cluster
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);