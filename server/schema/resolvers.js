const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');



const resolvers = {
    Mutation: {
        addLoginInfo: (parents, args) => {
            let {
                username,
                password
            } = args
            return new Promise((resolve, reject) => {
                let UserLoginInfoQuery = "INSERT INTO userLoginDetails (username,password) VALUES (?,?)";
                let tableCheckerQuery = `SELECT * FROM ${username}`

                db.all(tableCheckerQuery, (err) => {
                    if (err) {
                        console.log('table does not exist...proceding to create new table')
                        db.run(
                                `
                                CREATE TABLE IF NOT EXISTS ${username} (
                                id INTEGER PRIMARY KEY,
                                firstName TEXT,
                                lastName TEXT
                                address TEXT,
                                phoneNo INTEGER,
                                dateOfbirth TEXT
                                )
                                `
                                )
                        db.run(UserLoginInfoQuery, [username, password], (err) => {
                            if (err) {
                                console.log('an error occured while saving the login info')
                                reject(err)
                            } else {
                                resolve(true)
                            }
                        })
                    } else {
                        resolve(false)
                    }
                })




            })
        }
    },
    Query: {
        getLoginInfo: (parents, args, context) => {
            return new Promise((resolve, reject) => {
                let queryString = "SELECT * FROM login_info WHERE username= ?";
                let {
                    username
                } = args

                db.all(queryString, username, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });

            });
        }
    }
}


module.exports = resolvers;