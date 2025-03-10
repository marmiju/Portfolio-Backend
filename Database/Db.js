require('dotenv').config()

db_name = process.env.DB_NAME
db_Pass = process.env.DB_PASS

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${db_name}:${db_Pass}@cluster0.smwmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
module.exports = connectDB
