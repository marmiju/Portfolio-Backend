const { client } = require("../Config/Db");
const { ObjectId } = require("mongodb");

const db = client.db("mar");
const coll = db.collection("Blogs");

//create blog
async function createBlogs(req, res) {
  console.log(req.body);
  try {
    const { title, description } = req.body;
    if ((!title, !description)) {
      return res
        .status(201)
        .json({ message: "title and description required" });
    }
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const cover = req.file
      ? `${baseUrl}/uploads/${req.file.filename}`
      : "http://localhost:5000/uploads/1749609914134-Untitled%20design%20(1).png";

    const blog = {
      cover: cover, // just store filename or full path
      title,
      description,
      date: Date.now(),
    };

    const result = await coll.insertOne(blog);

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
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({ message: "ID is required" });
  }

  try {
    const result = await coll.deleteOne({ _id: new ObjectId(id) });
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ error: err });
  }
}

async function updateBlog(req, res) {
  try {
    const { id, title, description } = req.body;

    if (!id) return res.status(400).send({ message: "ID is required" });

    const filter = { _id: new ObjectId(id) };
    const date = Date.now();

    // Get image URL if uploaded
    let cover = req.body.cover; // fallback to old cover
    if (req.file) {
      cover = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const updateData = {
      $set: {
        cover,
        title,
        description,
        date,
      },
    };

    const result = await coll.updateOne(filter, updateData);

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "No data found" });
    }

    res
      .status(200)
      .send({ message: "Blog updated successfully", imageUrl: cover });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send({ message: "Error updating blog", error: err.message });
  }
}

module.exports = { createBlogs, getBlogs, deleteBlogs, updateBlog };
