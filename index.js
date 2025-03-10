const express = require('express')
const cors = require('cors')
const connectDB = require('./Database/Db')

const port = process.env.PORT || 3000
const app = express()

app.use(cors())
connectDB()
app.get('/', (req, res) => {
    res.send(`Hello I'm Azizar rahman`)
})
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
