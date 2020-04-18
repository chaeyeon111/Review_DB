//preference에서 설치하더라도 이 코드 반드시 필요함.
var mysql = require('mysql');
//var config = require('../db/db_info').(XXX)
// 이런 형태로 db_info.js에 저장돼있는 데이터베이스의 정보를 손쉽게 변경이 가능합니다.
//local 객체를 config 변수에 바인딩시킵니다.
var config = require('./db_info').local;

module.exports = function () {
    return {
        init: function () {
            return mysql.createConnection({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database
            })
        }
    }
};
