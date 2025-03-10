const { client } = require('../Config/Db');

//=================================
const myDB = client.db('mar');
const myColl = myDB.collection("Skills");

// Post data on the database
async function postSkill(req, res) {
    const { title, description, url } = req.body;
    try {
        const skills = { title, description, url };
        const result = await myColl.insertOne(skills);
        res.status(201).send({ message: 'Skill added successfully', data: result });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// Get all data from the collection
async function getData(req, res) {
    try {
        const result = await myColl.find().toArray();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { postSkill, getData };
