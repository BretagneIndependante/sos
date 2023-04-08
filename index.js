const express = require("express");
const cors = require("cors");
const joi = require('joi');
var mysql = require('mysql');
const app = express();
const path = require('path');
const api = require('./src/js/api/function.js')
const multer = require('multer')

require('dotenv').config();

const APIversion = "/API/v1"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/temp')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
  
const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'))
    }
    if(file.size > 100000000) {
        return cb(new Error('File size is too big! Max size is 100MB'))
    }
    cb(null, true)
  }
})

function check(token) {
    db.get('account', { token: token}, function (accounts) {
        return accounts.length > 0
    })
}

app.use(cors());

app.get(`${APIversion}/account/login`, async (req, res) => {
    const resp = await api.login(req.query)
    res.status(resp.status).send(resp.message)
})

app.post(`${APIversion}/ticket/create`, upload.array("images"), async (req, res) => {
    const resp = await api.createTicket(req.body, req.files)
    res.status(resp.status).send(resp.message)
})

app.get(`${APIversion}/ticket/get`, async (req, res) => {
    const resp = await api.getTickets(req.query)
    res.header("Content-Type",'application/json');
    res.status(resp.status).send(resp.message)
})

app.post(`${APIversion}/chat/send`, async (req, res) => {	
    const resp = await api.sendChat(req.query)
    res.status(resp.status).send(resp.message)
})

app.get(`${APIversion}/chat/get`, async (req, res) => {
    const resp = await api.getChat(req.query)
    res.header("Content-Type",'application/json');
    res.status(resp.status).send(resp.message)
})

app.use(express.static('public'));


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