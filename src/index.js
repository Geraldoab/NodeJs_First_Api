const UserController  = require('./users/controllers/user.controller');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

require('./users/models/user.model')

const app = express();

const ads = [
    {title: 'Hello, world!'}
];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// Endpoint

app.get('/', [
    UserController.getAll
]);

app.post('/users', [
	UserController.insert
]);

app.delete("/users/:id", [
    UserController.deleteById
])

app.put("/users/:id", [
    UserController.updateById
]);

// Starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});
