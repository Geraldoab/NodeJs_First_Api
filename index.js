const UserController  = require('./src/users/controllers/user.controller');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require("dotenv-safe").config({silent: true});
const jwt = require('jsonwebtoken');

require('./src/users/models/user.model')

const app = express();

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// Endpoint
app.get('/', verifyJWT, cors(corsOptions), [
    UserController.getAll
]);

app.post('/users', verifyJWT, [
	UserController.insert
]);

app.delete("/users/:id", verifyJWT, [
    UserController.deleteById
])

app.put("/users/:id", verifyJWT, [
    UserController.updateById
]);

//authentication
app.post('/login', (req, res, next) => {
    if(req.body.user === 'user' && req.body.password === '123'){
      const id = 1;
      const token = jwt.sign({ id }, process.env.AUTH_SECRET, {
        expiresIn: 360 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Invalid login!'});
});

app.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
});

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.AUTH_SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

// Starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});
