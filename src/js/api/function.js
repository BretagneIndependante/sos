const joi = require('joi');
const db = require('./db');
const uuid = require('./id');

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

async function createTicket(query){
    let pattern = joi.object({
        attachements: joi.array().items(joi.string()),
        description: joi.string().required(),
        position: joi.string().required(),
    }).options({ allowUnknown: false });
    
    let { error } = pattern.validate(query);


}


module.exports = {
    login: login
}