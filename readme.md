#Movie Review

###DB

#### 1.db_info.js
#####database connection file
#####connection with localhost db

#### 2. db_conn.js
#####connection reference file
#####Use require(),module.exports to get db information
#####Use function called createConnection

#### 3. Local DB using SQL
##### Use/ Create Table/ Insert Into
##### Schema Name: nodedb, port: 3306

### Routes

#### 1. board.js
##### routing list(format rendered data to ejs)
##### Use router get, post to render and query views

####2. views
##### list.ejs --> 
##### write.ejs --> Write down data
##### read.ejs --> set method with post, check out the post
##### page.ejs --> arrange list page
##### mysql.ejs --> Check connction availability
##### index.ejs

####link
#####http://localhost:3000/board/list/:1


http://localhost:3000/board/write
