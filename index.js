const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'public/uploads/' }); // Updated to serve images from the public directory

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs'); // Make sure this line is present

let blogs = [
    {
        id: 1,
        title: "Welcome to BlogMaster 🤟🏻",
        content: "Hello and welcome! I'm thrilled to have you here in your little corner of the internet. This blog is a space where you can share your thoughts, experiences, and passions, and I'm excited to embark on this journey with you. You can share snippets from your life, whether it is a recent adventure, a personal milestone, or just a random day in your world. Think of it as a diary open for you to peek into. Whether it's cooking, photography, travel, or something else entirely, you can show it here. From life hacks and productivity tips to DIY projects and recipes, you can share what you've learned along the way. I hope these posts can add a little value to your day-to-day life. Sometimes, you just need a space to ponder and reflect. Make posts that dive into your thoughts on various topics, from current events to personal growth and everything in between.",
        image: ""
      }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { blogs });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : '';
    blogs.push({ id: Date.now(), title, content, image });
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const blog = blogs.find(blog => blog.id == req.params.id);
    res.render('edit', { blog });
});

app.post('/edit/:id', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : '';
    const index = blogs.findIndex(blog => blog.id == req.params.id);
    blogs[index] = { id: req.params.id, title, content, image: image || blogs[index].image };
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    blogs = blogs.filter(blog => blog.id != req.params.id);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('BlogMaster is running on port 3000');
});
