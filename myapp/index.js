const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();


app get('/books/',async(response,request)=>{
    
    const getbooksquery=`
    select 
    * 
    from 
    book
    where book_id=${bookId};
    `;
    const booksarray=await db.all(getbooksquery);
    response.send(booksarray);
    
});

app get('/books/:bookId/',async(response,request)=>{
    const {bookId}=request.params;
    const getbookquery=`
    select 
    * 
    from 
    book
    where book_id=${bookId};
    `;
    const book=await db.get(getbookquery);
    response.send(book);
    
});
module.exports=app;