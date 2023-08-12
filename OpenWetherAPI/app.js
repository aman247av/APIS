const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
// const bodyParser=require("body-Parser")
const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log(req.body);
    console.log(req.body.cityName);
    
    const location=req.body.cityName
    const unit="metric"
    const  url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=bee55b8f3740782d492dc2cae0ac8c83&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            console.log(data);
            console.log(JSON.parse(data));

            const wetherData=JSON.parse(data);
            const temp=wetherData.main.temp;
            // console.log(""+temp);

            const city=wetherData.name;
            

            const weatherDes=wetherData.weather[0].description;
            const iconLink="http://openweathermap.org/img/wn/"+ wetherData.weather[0].icon+"@2x.png";
            console.log(iconLink);
            console.log(city+" "+temp+" "+weatherDes);
            res.write("<h1>The temp in "+city+" is "+temp+" "+weatherDes+"</h1>");
            res.write("<p> Waether Description "+weatherDes+"<p>");
            res.write("<img src="+iconLink+">")
            res.send();
            
            // const obj={name:"Aman",fav:"Bread"}
            // console.log(JSON.stringify(obj));
        })
    })
    // res.send("Hi");
})





app.listen(3000,function(){
    console.log("Server Started");
})