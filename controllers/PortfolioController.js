const { ObjectId } = require('mongodb');
const { client } = require('../Config/Db');

//=================================
const myDB = client.db('mar');
const myColl = myDB.collection("Portfolio");

async function createportfolio(req, res) {
    const { name, desc, tech, repo, live, preview } = req.body
    try {
        const portfolio = { name, desc, tech, repo, live, preview }
        const result = await myColl.insertOne(portfolio)
        res.status(200).send({ message: 'Congratulation portfolio Created', data: result })


    } catch (err) {
        throw new Error('Opps! Something Went wrong')
    }

}

async function getAllPortfolio(req, res) {
    try {
        const result = await myColl.find().toArray();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
async function getPortfolio(req, res) {

    const portfolioId = req.params.id;
    try {
        const result = await myColl.findOne({ _id: new ObjectId(portfolioId) });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
//delete
async function deletePortfolio(req, res) {
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


module.exports = { createportfolio, getAllPortfolio, getPortfolio, deletePortfolio }


