const { ObjectId } = require('mongodb');
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

//delete one of skills
async function deleteSkills(req, res) {
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

//Update
async function updateskills(req, res) {
    try {
        const { id, title, description, url } = req.body;  // Extract id, title, and description

        if (!id) res.send('ID is required')


        const filter = { _id: new ObjectId(id) };
        // let upDatedata;
        // if (title || !description || !url) {
        //     upDatedata = { $set: { title } }
        // }
        // if (description || !title) {
        //     upDatedata = {
        //         $set: {
        //             description
        //         }
        //     }
        // }
        const updateData = {
            $set: {
                title, description, url
            }
        }




        const result = await myColl.updateOne(filter, updateData);

        if (result.modifiedCount === 0) {
            return res.status(404).send({ message: 'No skill found with the provided ID or no changes made' });
        }

        res.status(200).send({ message: 'Skill updated successfully' });
    } catch (err) {
        res.status(400).send({ message: 'Error updating skill', error: err.message });
    }
}


module.exports = { postSkill, getData, deleteSkills, updateskills };
