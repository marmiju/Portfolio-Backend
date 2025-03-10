require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const db_name = process.env.DB_NAME;
const db_Pass = process.env.DB_PASS;

const uri = `mongodb+srv://${db_name}:${db_Pass}@cluster0.smwmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// ✅ Define & Export Function Correctly
async function connectDB() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("✅ MongoDB Connected Successfully!");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
}

// ✅ Correctly export only `connectDB`
module.exports = { connectDB, client };
