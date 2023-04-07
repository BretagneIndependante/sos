const express = require("express");
const cors = require("cors");
const joi = require('joi');
const uuid = require("./lib/id.js")
var mysql = require('mysql');
const app = express();

require('dotenv').config();

var db = mysql.createConnection({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

db.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
          
     console.log('Connected to the MySQL server.');
});

const APIversion = "/API/v1"

function check(token) {
    db.get('account', { token: token}, function (accounts) {
        return accounts.length > 0
    })
}


app.use(cors());

app.get(`${APIversion}/account/login`, (req, res) => {
    // if(!check(req.header.token)) {
    //     res.status(401).send('ERROR: Invalid token')
    // }

    let pattern = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    }).options({ allowUnknown: false });
    
    let { error } = pattern.validate(req.query);
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let query = 'SELECT * FROM Account WHERE email = ? AND password = ?';
    let params = [req.query.email, req.query.password];
    db.query(query, params, {error, result }).then(accounts => {
        if(error) {
            res.status(503).send('')
        }
        else if (accounts.length > 0) {
            let token = uuid.generate('token')
            let query = 'UPDATE Account SET token = ? WHERE id = ?';
            let params = [req.query.id, token]
            db.query(query, params, {error, result }).then( response => {
                if(error) {
                    res.status(503).send('')
                }
                else {
                    res.send(id)
                }
            })
        }
        else {
            res.send(false)
        }
    })

    // db.get('account', { email: req.query.email, password: req.query.password }, function (accounts) {
    //     if (accounts.length == 1) {
    //         let token = uuid.generate(token)
    //         db.edit('account', { id: accounts[0].id }, { token: token})
    //         res.send(token)
    //     }
    //     else {
    //         res.send(false)
    //     }
    // })
})

// app.post(`${APIversion}/ticket/create`, (req, res) => {
//     let  = joi.object({
//         ticket: joi.string().required(),
//         page: joi.number().integer().required(),
//     }).options({ allowUnknown: false });
//     let { error } = pattern.validate(req.query);
//     if (error) {
//         return res.status(400).send(error.details[0].message);
//     }
//     db.get('ticket', { id: req.query.id}, function (ticket) {
//         res.send(db.get('message', { id: ticket[0].id }))
//     })
// })

// app.get(`${APIversion}/conversation/get`, (req, res) => {
//     if(!check(req.query.token)) {
//         res.status(401).send('ERROR: Invalid token')
//     }
//     let pattern = joi.object({
//         ticket: joi.string().required(),
//         page: joi.number().integer().required(),
//     }).options({ allowUnknown: false });
//     let { error } = pattern.validate(req.query);
//     if (error) {
//         return res.status(400).send(error.details[0].message);
//     }
//     db.get('ticket', { id: req.query.id}, function (ticket) {
//         res.send(db.get('message', { id: ticket[0].id }))
//     })
// })

// app.get(`${APIversion}/attachments/get`, (req, res) => {
//     if(!check(req.query.token)) {
//         res.status(401).send('ERROR: Invalid token')
//     }
//     let pattern = joi.object({
//         ticket: joi.string().required()
//     }).options({ allowUnknown: false });
//     let { error } = pattern.validate(req.query);
//     if (error) {
//         return res.status(400).send(error.details[0].message);
//     }
//     db.get('ticket', { id: req.query.id}, function (ticket) {
//         res.send(db.get('attachments', { id: ticket[0].url }))
//     })
// })

// app.get(`${APIversion}/ticket/get`, (req, res) => {
//     if(!check(req.query.token)) {
//         res.status(401).send('ERROR: Invalid token')
//     }
//     let pattern = joi.object({
//         id: joi.string().required()
//     }).options({ allowUnknown: false });
//     let { error } = pattern.validate(req.query);
//     if (error) {
//         return res.status(400).send(error.details[0].message);  
//     }
//     db.get('ticket', { id: req.query.id}, function (ticket) {
//         res.send(ticket)
//     })
// })

// app.put(`${APIversion}/ticket/close`, (req, res) => {
//     if(!check(req.query.token)) {
//         res.status(401).send('ERROR: Invalid token')
//     }
//     let pattern = joi.object({
//         id: joi.string().required()
//     }).options({ allowUnknown: false });
//     let { error } = pattern.validate(req.query);
//     if (error) {
//         return res.status(400).send(error.details[0].message);
//     }
//     db.edit('ticket', { id: req.query.id}, { status: false})
// })

app.get(`${APIversion}/quoi`, (req, res) => {res.send('QUOICOUBEH')})

app.listen(process.env.API_PORT)