const joi = require('joi');
const db = require('./db');
const uuid = require('./id');
const fs = require('fs');

async function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      db.query(query, params, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
}

async function login(query){
    let pattern = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    }).options({ allowUnknown: false });

    let { error } = pattern.validate(query);

    if (!error) {
        const email = query.email;
        const password = query.password;

        const getUserSQL = "SELECT * FROM account WHERE email = ? AND password = ?"
        const getUserParams = [email, password];

        const getUser = await executeQuery(getUserSQL, getUserParams).catch(error => {
            return {
                status: 400,
                message: error
            }
        })
        
        if(getUser.length > 0){  
            const token = uuid.generate('token')
            //update token
            const updateTokenSQL = "UPDATE account SET token = ? WHERE uuid = ?"
            const updateTokenParams = [token, getUser[0].uuid];

            const updateToken = await executeQuery(updateTokenSQL, updateTokenParams).catch(error => {
                return {
                    status: 400,
                    message: error
                }
            })

            return {
                status: 200,
                message: token
            }

        }else{
            return {
                status: 400,
                message: 'Error: Invalid credentials'
            }
        }
    }else{
        return {
            status: 400,
            message: error
        }
    }
}

async function createTicket(query, files){
    if(!query.latitude || !query.longitude){
        return {
            status: 400,
            message: 'Error: you need to authorize access to your location'
        }
    }

    
    let pattern = joi.object({
        attachements: joi.array().items(joi.string()),
        description: joi.string().required(),
        latitude: joi.string().required(),
        longitude: joi.string().required(),
    }).options({ allowUnknown: false });
    
    let { error } = pattern.validate(query);

    if (!error) {
        const ticketUuid = uuid.generate('ticket')
        const createTicketSQL = "INSERT INTO ticket (uuid, description, time_stamp, location) VALUES (?, ?, ?, ?)"
        const createTicketParams = [ticketUuid, query.description, new Date().getTime(), `${query.latitude};${query.longitude}`];
        const createTicket = await executeQuery(createTicketSQL, createTicketParams).catch(error => {
            return {
                status: 400,
                message: error
            }
        })
        console.log(createTicket)
        
        for(const file of files){
            const attachementUuid = uuid.generate('attachement')
            //move file to attachement folder
            const oldPath = file.path;
            const newPath = `./uploads/${attachementUuid}_${ticketUuid}.png`;
            fs.rename(oldPath, newPath, function (err) {
                if (err) console.log('ERROR move file: ' + err);
            })
            //insert attachement
            const createAttachementSQL = "INSERT INTO piecejointe (uuid, ticket_uuid, link) VALUES (?, ?, ?)"
            const createAttachementParams = [attachementUuid, ticketUuid, newPath.substring(1), new Date().getTime()];
            const createAttachement = await executeQuery(createAttachementSQL, createAttachementParams).catch(error => {
                return {
                    status: 400,
                    message: error
                }
            })
            console.log(createAttachement)

            return {
                status: 200,
                message: ticketUuid
            }
    
        }

    }
    return {
        status: 400,
        message: error
    }
}

async function sendChat(query){
    let pattern = joi.object({
        message: joi.string().required(),
        ticket_uuid: joi.string().required(),
        token: joi.string(),
        account_uuid: joi.string()
    }).options({ allowUnknown: false });

    let { error } = pattern.validate(query);

    if (!error) {
        const message = query.message;
        const ticket_uuid = query.ticket_uuid;
        let isOperator = 0;
        const chatUUID = uuid.generate('chat')

        const getTicketSQL = "SELECT * FROM ticket WHERE uuid = ?"
        const getTicketParams = [ticket_uuid];
        const getTicket = await executeQuery(getTicketSQL, getTicketParams).catch(error => {
            return {
                status: 400,
                message: error
            }
        })

        if(getTicket.length == 0){
            return {
                status: 400,
                message: 'Error: ticket not found'
            }
        }

        if(query.token && query.account_uuid){
            const token = query.token;
            const account_uuid = query.account_uuid;
            const getUserSQL = "SELECT * FROM account WHERE uuid = ? AND token = ?"
            const getUserParams = [account_uuid, token];

            const getUser = await executeQuery(getUserSQL, getUserParams)
            console.log(getUser)

            if(getUser.length > 0){  
                isOperator = 1;
                //if is an operator and ticket status is "waiting", change status to "in progress"
                if(getTicket[0].status == 'waiting'){
                    const updateTicketSQL = "UPDATE ticket SET status = ? WHERE uuid = ?"
                    const updateTicketParams = ['in progress', ticket_uuid];
                    const updateTicket = await executeQuery(updateTicketSQL, updateTicketParams)
                }
            }
        }

        const createChatSQL = "INSERT INTO chat (uuid, content, time_stamp, ticket_uuid, is_operator) VALUES (?, ?, ?, ?, ?)"
        const createChatParams = [chatUUID, message, new Date().getTime(), ticket_uuid, isOperator];
        const createChat = await executeQuery(createChatSQL, createChatParams).catch(error => {
            return {
                status: 400,
                message: error
            }
        })
        console.log(createChat)

        return {
            status: 200,
            message: 'Message sent'
        }
    }
    return {
        status: 400,
        message: error
    }
}

async function getChat(query){
    let pattern = joi.object({
        ticket_uuid: joi.string().required(),
        token: joi.string(),
        account_uuid: joi.string()
    }).options({ allowUnknown: false });

    let { error } = pattern.validate(query);

    if (!error) {
        const ticket_uuid = query.ticket_uuid;
        let isOperator = 0;

        const getTicketSQL = "SELECT * FROM ticket WHERE uuid = ?"
        const getTicketParams = [ticket_uuid];
        const getTicket = await executeQuery(getTicketSQL, getTicketParams).catch(error => {
            return {
                status: 400,
                message: error
            }
        })

        if(getTicket.length == 0){
            return {
                status: 400,
                message: 'Error: ticket not found'
            }   
        }

        if(query.token && query.account_uuid){
            const token = query.token;
            const account_uuid = query.account_uuid;
            const getUserSQL = "SELECT * FROM account WHERE uuid = ? AND token = ?"
            const getUserParams = [account_uuid, token];

            const getUser = await executeQuery(getUserSQL, getUserParams)

            if(getUser.length > 0){
                isOperator = 1;
            }
        }

        const getChatSQL = "SELECT * FROM chat WHERE ticket_uuid = ? ORDER BY time_stamp DESC"
        const getChatParams = [ticket_uuid];
        const getChat = await executeQuery(getChatSQL, getChatParams).catch(error => {
            return {
                status: 400,
                message: error
            }
        })

        let chat = [];
        for(const message of getChat){
            let messageObject = {
                message: message.content,
                time_stamp: message.time_stamp,
                is_sender: message.is_operator && isOperator || !message.is_operator && !isOperator
            }
            chat.push(messageObject)
        }

        return {
            status: 200,
            message: chat
        }
    }
    return {
        status: 400,
        message: error
    }
}

        


module.exports = {
    login: login,
    createTicket: createTicket,
    sendChat: sendChat,
    getChat: getChat
}