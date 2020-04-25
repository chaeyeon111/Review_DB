//모듈을 function이란 이름으로 export함.
module.exports = (function () {
    return {
        local: {
            host: 'database.cfxizsz1qcmu.ap-southeast-1.rds.amazonaws.com',
            port: '3306',
            user: 'admin',
            password: '12345678',
            database: 'nodedb'
        },
        //우선 로컬만 필요함.
        /*real: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        staging: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        dev: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }*/

    }
})();
