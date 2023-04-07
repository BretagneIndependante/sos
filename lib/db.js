var mysql = require('mysql');
require('dotenv').config();

var db = mysql.createConnection({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

module.exports = {
    start() {
        db.connect(function(err) {
            if (err) {
              return console.error('error: ' + err.message);
            }
          
            console.log('Connected to the MySQL server.');
          });
    },
    
    stop() {
        db.end();
    },
    
    add(table, object) {
        // let tables = db.query(query);
        let query = (`INSERT INTO ${table} (`);
        for(property in object) {
            query += `${property}, `;
        }
        query = `${query.slice(0, query.length - 2)}) VALUES (`;
        for(property in object) {
            query += `'${object[property]}', `;
        }
        query = `${query.slice(0, query.length - 2)})`;
        db.query(query);
    },

    edit(table, objectToEdit, object, callback) {
        let query = (`UPDATE ${table} SET `);
        for(property in object) {
            query += `${property} = '${object[property]}', `;
        }
        query = `${query.slice(0, query.length - 2)} WHERE (`;
        for(property in objectToEdit) {
            query += `${property} = '${objectToEdit[property]}' AND `;
        }
        query = `${query.slice(0, query.length - 5)})`
        console.log(query)
        db.query(query);
    },
    
    get(table, object, callback) {
        let query = `SELECT * FROM ${table} WHERE (`;
        for(property in object) {
            query += `${property} = '${object[property]}' AND `;
        }
        query = `${query.slice(0, query.length -5)})`;
        db.query(query, (error, results)=>{
            callback(results);
        });
    },
    
    delete(table, object) {
        let query = `DELETE FROM ${table} WHERE (`;
        for(property in object) {
            query += `${property} = '${object[property]}' AND `;
        }
        query = `${query.slice(0, query.length - 5)})`;
        db.query(query);
    },

    column(table, name, type, defaultValue = 'NULL') {
        db.query(`ALTER TABLE ${table} ADD ` + "`" + name + "`" + ` ${type} DEFAULT ${defaultValue}`)
    }
}