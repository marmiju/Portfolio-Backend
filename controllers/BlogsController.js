const { client } = require('../Config/Db');
const { ObjectId } = require('mongodb')

const db = client.db('mar')
const coll = db.collection('Blogs')

//create blog
async function createBlogs(req, res) {
    try {
        const { cover, title, description = [] } = req.body; // Default to an empty array
        date = Date.now()
        const blog = { cover, title, description, date }
        const result = await coll.insertOne(blog)

        res.status(201).json({ message: "Blog created successfully!", result });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
}

//get blocks
async function getBlogs(req, res) {
    try {
        const result = await coll.find().toArray();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
//delete Blog
async function deleteBlogs(req, res) {
    const { id } = req.body

    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }

    try {
        const result = await coll.deleteOne({ _id: new ObjectId(id) })
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send({ error: err })
    }
}
async function updateBlog(req, res) {
    try {
        const { id, cover, title, description = [] } = req.body;

        if (!id) res.send('ID is required')
        const filter = { _id: new ObjectId(id) };
        date = Date.now()
        updateData = {
            $set: {
                cover, title, description, date
            }
        }
        const result = await coll.updateOne(filter, updateData);

        if (result.modifiedCount === 0) {
            return res.status(404).send({ message: 'No Data found' });
        }

        res.status(200).send({ message: 'Blog updated successfully' });
    } catch (err) {
        res.status(400).send({ message: 'Error updating Blog', error: err.message });
    }
}



module.exports = { createBlogs, getBlogs, deleteBlogs, updateBlog }