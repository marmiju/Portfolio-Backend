const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    cover: { type: String, required: true }, // Blog cover image URL or path
    title: { type: String, required: true }, // Blog title
    date: { type: Date, default: Date.now }, // Auto set current date
    description: [
        {
            text: { type: String, required: false }, // Make 'text' optional
            type: { type: String, enum: ['text', 'code'], required: false } // 'type' optional
        }
    ]
});

module.exports = mongoose.model('Blog', blogSchema);
