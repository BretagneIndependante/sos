const express = require("express");
const cors = require("cors");
const joi = require('joi');
const uuid = require("./lib/id.js")

const APIversion = "/API/v1"

function check(token) {
    db.get('account', { token: token}, function (accounts) {
        return accounts.length > 0
    })
}

db.start();

app.use(cors());

app.get(`${APIversion}/account/login`, (req, res) => {
    if(!check(req.query.token)) {
        res.status(401).send('ERROR: Invalid token')
    }

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
            res.send(uuid.generate('token'))
            let query = 'UPDATE * FROM Account WHERE email = ? AND password = ?';

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

app.post(`${APIversion}/ticket/create`, (req, res) => {
    let  = joi.object({
        ticket: joi.string().required(),
        page: joi.number().integer().required(),
    }).options({ allowUnknown: false });
    let { error } = pattern.validate(req.query);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    db.get('ticket', { id: req.query.id}, function (ticket) {
        res.send(db.get('message', { id: ticket[0].id }))
    })
})

app.get(`${APIversion}/conversation/get`, (req, res) => {
    if(!check(req.query.token)) {
        res.status(401).send('ERROR: Invalid token')
    }
    let pattern = joi.object({
        ticket: joi.string().required(),
        page: joi.number().integer().required(),
    }).options({ allowUnknown: false });
    let { error } = pattern.validate(req.query);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    db.get('ticket', { id: req.query.id}, function (ticket) {
        res.send(db.get('message', { id: ticket[0].id }))
    })
})

app.get(`${APIversion}/attachments/get`, (req, res) => {
    if(!check(req.query.token)) {
        res.status(401).send('ERROR: Invalid token')
    }
    let pattern = joi.object({
        ticket: joi.string().required()
    }).options({ allowUnknown: false });
    let { error } = pattern.validate(req.query);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    db.get('ticket', { id: req.query.id}, function (ticket) {
        res.send(db.get('attachments', { id: ticket[0].url }))
    })
})

app.get(`${APIversion}/ticket/get`, (req, res) => {
    if(!check(req.query.token)) {
        res.status(401).send('ERROR: Invalid token')
    }
    let pattern = joi.object({
        id: joi.string().required()
    }).options({ allowUnknown: false });
    let { error } = pattern.validate(req.query);
    if (error) {
        return res.status(400).send(error.details[0].message);  
    }
    db.get('ticket', { id: req.query.id}, function (ticket) {
        res.send(ticket)
    })
})

app.put(`${APIversion}/ticket/close`, (req, res) => {
    if(!check(req.query.token)) {
        res.status(401).send('ERROR: Invalid token')
    }
    let pattern = joi.object({
        id: joi.string().required()
    }).options({ allowUnknown: false });
    let { error } = pattern.validate(req.query);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    db.edit('ticket', { id: req.query.id}, { status: false})
})

app.get(`${APIversion}/quoi`, (req, res) => {res.send('QUOICOUBEH')})