
const { ObjectId } = require('mongodb')
const { client } = require('../Config/Db')

const db = client.db('mar')
const coll = db.collection('Profile')

const id = "67d03f10e7e50e91a0fa8c34"

async function getProfile(req, res) {
    try {
        const result = await coll.findOne({ _id: new ObjectId(id) })
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send(err)
    }

}

async function updatprofile(req, res) {
    const { url, name, designation, description, bio, resume, quats } = req.body
    try {

        if (!id) {
            res.send('Id required')
        }
        const filter = { _id: new ObjectId(id) }
        const data = {
            $set: {
                url, name, designation, description, bio, resume, quats
            }
        }
        result = await coll.updateOne(filter, data)
        if (result.modifiedCount === 0) {
            return res.status(404).send({ message: 'Profile Not Found' });
        }
        res.status(200).send({ message: "Succesfully Updated Data", result });

    } catch (err) {
        res.status(400).send(err)
    }

}

module.exports = { getProfile, updatprofile }