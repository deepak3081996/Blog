const express = require('express');
const morgon = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');



//express app
app = express();

mongoose.connect('mongodb://localhost:27017/node-tuts', {useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => console.log('Connected to db'))
        .catch((err) => console.log(err));

app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.listen(3000);

// Middleware
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

// app.use((req, res, next) => {
//     console.log('In the next middleware');
//     next();
// });


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgon('dev'));

// routes

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'second blog',
//         snippet: 'second body snippet',
//         body: 'second blog body'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('60dca97f78c28d11244bf5a3')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

app.get('/', (req, res) => {
    // res.send("<p>Home Page</p>");
    // res.sendFile('./views/index.html', { root: __dirname});
    // const blogs = [
    //     {title:'first blog', snippet: 'first blog snippet'},
    //     {title:'second blog', snippet: 'second blog snippet'},
    //     {title:'third blog', snippet: 'third blog snippet'},
    // ];
    // // res.send(blogs);
    // res.render('index', { title: 'Home', blogs});
    res.redirect('/blogs');
});


app.get('/about', (req, res) => {
    // res.send("<p>About Page</p>");
    // res.sendFile('./views/about.html', { root: __dirname});
    res.render('about', { title: 'About'});
});

// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// blog routes

app.use('/blogs', blogRoutes);



// 404 Page 
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname});
    res.status(404).render('404', { title: '404'});
});