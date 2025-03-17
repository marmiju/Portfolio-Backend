const { ObjectId } = require('mongodb');
const { client } = require('../Config/Db');

//=================================
const myDB = client.db('mar');
const myColl = myDB.collection("Experience");

// Post data on the database
async function postExperience(req, res) {
    const { designation, company, description, start, end } = req.body;
    try {
        const experience = { designation, company, description, start, end };
        const result = await myColl.insertOne(experience);
        res.status(201).send({ message: 'Experience added successfully', data: result });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}
// Get all data from the collection
async function getExperience(req, res) {
    try {
        const result = await myColl.find().toArray();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
//delete one of skills
async function deleteExperience(req, res) {
    const { id } = req.body

    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }

    try {
        const result = await myColl.deleteOne({ _id: new ObjectId(id) })
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send({ error: err })
    }
}

async function updateExperience(req, res) {
    try {
        const { id, designation, company, description, start, end } = req.body;  // Extract id, title, and description

        if (!id) res.send('ID is required')
        const filter = { _id: new ObjectId(id) };
        updateData = {
            $set: {
                designation, description, company, start, end
            }
        }




        const result = await myColl.updateOne(filter, updateData);

        if (result.modifiedCount === 0) {
            return res.status(404).send({ message: 'No Experience found with the provided ID or no changes made' });
        }

        res.status(200).send({ message: 'Experience updated successfully' });
    } catch (err) {
        res.status(400).send({ message: 'Error updating Experience', error: err.message });
    }
}


module.exports = { postExperience, getExperience, deleteExperience, updateExperience };
