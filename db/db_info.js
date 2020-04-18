//모듈을 function이란 이름으로 export함.
module.exports = (function () {
    return {
        local: {
            host: 'localhost',
            port: '3306',
            user: 'root',
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
