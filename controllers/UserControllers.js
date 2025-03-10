const { client } = require('../Config/Db');

async function Skills(req, res) {
    try {
        const database = client.db("yourDatabaseName");  // Change this to your DB name
        const usersCollection = database.collection("users"); // Change this to your Collection name
        const users = await usersCollection.find().toArray();

        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function postSkill(req, res) {
    const { name, age } = req.body;
    console.log(name, age)
    res.send({ message: 'user added Successfully', data: { name, age } })
}

module.exports = { postSkill };
