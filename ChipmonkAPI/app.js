// https://shrouded-spire-51793.herokuapp.com/

// git add .
// git commit -m "changes"
// git push heroku master

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email; 

    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsondata=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/4b8a7022d5";
    const options={
        method: "POST",
        auth: "authenticate:4fb7cdcf099dbf73caa5c4d8f7e85b21-us21"
    }
    var err=0;
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
            // err=JSON.parse(data).error_count;
            // console.log("This is error count "+err);
                            
        })
    })

    request.write(jsondata);
    request.end();
    
    // console.log(firstName+" "+lastName+" "+email);
    // res.send("OK"); 
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Started"); 
});

//apikey: 4fb7cdcf099dbf73caa5c4d8f7e85b21-us21 
// listId: 4b8a7022d5
