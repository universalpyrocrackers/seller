var express=require ('express');
var mongoose=require ("mongoose");
var bodyparser=require ("body-parser");
var cors=require ("cors");
var path=require ("path");
require('dotenv').config();
// const uri="mongodb://localhost:27017/contactlist2";
const uri="mongodb+srv://"+process.env.DBUSERNAME+":"+process.env.DBPASSWORD+"@ecommclus.bmbfz.mongodb.net/personal?retryWrites=true&w=majority";
const port=process.env.PORT ||3000;
const route=require("./routes/route");
mongoose
     .connect( uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then()
     .catch();
var app=express();
//adding middleware
app.use(cors());
//body-parser
app.use(bodyparser.json());
//routing
app.use("/api",route);
//static files
app.use(express.static(path.join(__dirname,'dist')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'));
})

app.listen(port,()=>{
//  console.log(port)
    })
    