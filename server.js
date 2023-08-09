// Import required modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Setup session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Use body-parser to easily retrieve post data from the frontend
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Set the view engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Main route
app.get('/', (req, res) => {
    res.render('index', { msg: req.session.msg });
});

// Handle login
app.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'tutorialspoint' && password === '1234') {
        req.session.valid = true;
        req.session.username = username;
        res.redirect('/dashboard');
    } else {
        req.session.msg = 'Wrong username or password';
        res.redirect('/');
    }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    if (req.session.valid) {
        res.send('You have entered a valid username and password');
    } else {
        res.redirect('/');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});
