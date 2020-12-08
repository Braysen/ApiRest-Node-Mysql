const pool = require('../../config/gestionDB')

module.exports = {
    create: (data, callback) => {
            pool.query(
                `insert into users(userName, email, password) values(?, ?, ?)`,
                [
                    data.userName,
                    data.email,
                    data.password
                ],
                (error, results, fields) => {
                    if(error){
                        return callback(error)
                    }
                    return callback(null, results)
                }
            )
    },

    getUsers: callback => {
            pool.query(
                `select id, userName, email,password from users`,
                [],
                (error, results, fields) => {
                    if(error){
                        return callback(error)
                    }
                    return callback(null, results)
                }
            )
    },

    getUserByUserId: (id, callback) => {
        pool.query(
            `select id, userName, email from users where id = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, results[0])
            }
        )
    },

    updateUser: (data, callback) => {
        pool.query(
            `update users set userName = ?, email = ?, password = ? where id = ?`,
            [
                data.userName,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    deleteUser: (data, callback) => {
        pool.query(
            `delete from users where id = ?`,
            [
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callback(error)
                }
                return callback(null, results[0])
            }
        )
    },

    getUserByUserEmail: (email, callback) => {
        pool.query(
            `select * from users where email = ?`,
            [
                email
            ],
            (error, results, fields) => {
                if(error){
                    callback(error)
                }
                return callback(null, results[0])
            }
        )
    }
}

//1:00:58