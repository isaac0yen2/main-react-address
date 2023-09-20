const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

const resolvers = {
    Mutation: {
        addLoginInfo: (parents, args) => {
            const {
                username,
                password
            } = args;
            console.log(username, password)
            return new Promise((resolve, reject) => {
                const tableCheckerQuery = `SELECT * FROM ${username}`;
                db.all(tableCheckerQuery, (err, row) => {
                    if (err) {
                        console.log('table does not exist...proceding to create new table');
                        db.run(
                            `
              CREATE TABLE IF NOT EXISTS ${username} (
                id INTEGER PRIMARY KEY,
                firstName TEXT,
                lastName TEXT,
                address TEXT,
                phoneNo TEXT,
                dateOfbirth TEXT
              )
              `
                        );
                        db.run(
                            `INSERT INTO userLoginDetails (username , password) VALUES (? , ?)`,
                            [username, password],
                            (err) => {
                                if (err) {
                                    console.log('an error occured while saving the login info');
                                    reject(err);
                                } else {
                                    console.log('done')
                                    resolve({
                                        username: username,
                                        password: password
                                    })
                                }
                            }
                        );
                    } else {
                        console.log('already there')
                        resolve({
                            username: username,
                            password: password
                        })
                    }
                });
            });
        },
        addAddressInfo: (parents, args) => {
            const {
                tableName,
                firstName,
                lastName,
                phoneNo,
                dateOfbirth,
                address
            } = args;
            console.log(dateOfbirth)
            const queryString = `INSERT INTO ${tableName} (firstName, lastName, phoneNo, dateOfBirth, address) VALUES (?,?,?,?,?)`;
            return new Promise((resolve, reject) => {
                db.run(queryString, [firstName, lastName, phoneNo, dateOfbirth, address], (err) => {
                    //there's a chance the bug is coming from here.....|||||
                    if (err) {
                        console.log(err);
                        console.log(tableName)
                    } else {
                        resolve(args);
                        console.log(dateOfbirth)
                    }
                });
            });
        },
        editAddressInfo: (parents, args) => {
            let {
                tableName,
                firstName,
                lastName,
                phoneNo,
                dateOfbirth,
                address,
                id
            } = args
            console.log(args)

            let queryString = `UPDATE ${tableName} SET firstName = ?, lastName = ?, phoneNo = ?, dateOfbirth = ?, address = ? WHERE id = ?`
            return new Promise((resolve, reject) => {
                db.run(queryString, [firstName, lastName, phoneNo, dateOfbirth, address, id], (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            id: id,
                            firstName: firstName,
                            lastName: lastName,
                            phoneNo: phoneNo,
                            dateOfbirth: dateOfbirth,
                            address: address
                        })
                    }
                })
            })
        },
        deleteAddressInfo: (parents, args) => {
            let {
                tableName,
                id
            } = args
            let queryString = `DELETE FROM ${tableName} WHERE id = ?`
            return new Promise((resolve, reject) => {
                db.run(queryString, id, () => {
                    let queryString = `SELECT * FROM ${tableName}`

                    db.all(queryString, (err, row) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(row)
                        }
                    })
                })
            })
        }




    },
    Query: {
        getLoginInfo: (parents, args, context) => {
            const {
                username
            } = args;
            return new Promise((resolve, reject) => {
                const queryString = `SELECT * FROM userLoginDetails WHERE username = ?`;
                db.all(queryString, username, (err, rows) => {
                    if (err) {
                        resolve({
                            username: 'wrong username',
                            password: "wrong password"
                        })
                    } else {
                        console.log(rows)
                        resolve(rows[0]);
                    }
                });
            });
        },
        getAddressInfo: (parents, args) => {
            const {
                tableName
            } = args;
            let queryString = `SELECT * FROM ${tableName}`

            return new Promise((resolve, reject) => {
                db.all(queryString, (err, row) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(row)
                    }
                })
            })
        }
    },
};

module.exports = resolvers;