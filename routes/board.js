var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.json())

app.use(express.json())


app.use(function (req,res,next) {
    console.log(req.body)
    next()

})

var router = express.Router();
//mysql_dbc 변수에 db_con의 값을 require을 시키고,
// 위에서 설명한 init 메서드를 통해서
// 생성된 Mysql Connnection을 변수 connection에 저장시킵니다
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();


//uri를 /list/:page' 형태로 받습니다
//board/list/(페이지 숫자) 형식으로 게시판 리스트를 노출하는 방식
router.get('/list:page', function(req, res, next) {
    res.redirect('/board/list/1');
});

router.get('/list/:page', function(req, res, next) {
    console.log("-------------------")
    var page = req.params.page;
    var sql = "select idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(date,'%Y-%m-%d %H:%i:%s') regdate,hit from board";
    conn.query(sql, function (err, rows) {
        // rows = class
        if (err) console.error("err : " + err);
        // res.render('list', {title: 'Movie Reviews!', rows: rows});
        res.json(rows);
        //res.send(json);
        //const i = JSON.stringify(json);
        //res.redirect(i);


    });

        // res.json(rows);
        // var idx = rows[0].idx;
        // var title = rows[1].title;
        // var name = rows[2].name;
        // var content = rows[3].content;
        // var date_format = rows[4].dateFormat;


});


module.exports = router;



router.get('/write', function(req,res,next){
    res.render('write',{title : "Write Your Movie Review"});
});

router.post('/write', function(req,res,next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.password;
    var datas = [name,title,content,passwd];

    var sql = "insert into board(name, title, content, date, modidate, password,hit) values(?,?,?,now(),now(),?,0)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/board/list');



        /*app.use(function (req, res) {
            res.setHeader('Content-Type', 'text/plain')
            res.write('you posted:\n')
            res.end(JSON.stringify(req.body, null, 2))
        })*/

    /*const data = require('/db/data')
        app.get(datas, function(req,res){
        res.json(data);
        })*/
    });


});

router.get('/read/:idx',function(req,res,next)
{
    var idx = req.params.idx;
    var sql = "select idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board where idx=?";
    conn.query(sql,[idx], function(err,rows)
    {
        if(err) console.error(err);
        res.render('read', {title:"Detail", row:rows[0]});
    });
});

router.post('/update',function(req,res,next)
{
    var idx = req.body.idx;
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.password;
    var datas = [name,title,content,idx,passwd];

    var sql = "update board set name=? , title=?,content=?, modidate=now() where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('Incorrect Password');history.back();</script>");
        }
        else
        {
            res.redirect('/board/read/'+idx);
        }
    });
});

router.get('/page/:page',function(req,res,next)
{
    var page = req.params.page;
    var sql = "select idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('page', {title: ' Movie reviews', rows: rows, page:page, length:rows.length-1, page_num:10});
        console.log(rows.length-1);


    });
});

router.post('/delete',function(req,res,next)
{
    var idx = req.body.idx;
    var password = req.body.password;
    var datas = [idx,password];

    var sql = "delete from board where idx=? and password=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('Incorrect Password');history.back();</script>");
        }
        else
        {
            res.redirect('/board/list/');
        }
    });
})


