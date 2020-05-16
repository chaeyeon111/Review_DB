var express = require('express');
var router = express.Router();


const cors= require('cors');
const logger = require('morgan');

const app = express();

app.use(
    cors({
      origin:'http://localhost:7030/write',
      credential:true,
    })
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

let books = [];

app.get('/write',function(req,res){
  console.log('Inside Home Login');
  res.writeHead(200,{
    'Content-Type':'application/json'
  });
  console.log('Movies :', JSON.stringify(books));
  res.end(JSON.stringify(books))
})

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


app.post('/write',function(req,res){
  const newMovie ={
    idx : req.body.idx,
    name : req.body.name,
    title : req.body.title,
    content : req.body.content,
    passwd : req.body.password,

}

 books.push(newMovie);
  console.log(books);


})


/* GET users listing. */
router.post('http://localhost:3000/write', function(req, res, next) {
  res.send(books);

});





module.exports = router;
