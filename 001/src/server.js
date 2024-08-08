const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send("Welcome to my awsome app");
});

app.listen(3000, function (){
    console.log("app listenin gon port 3000");
});