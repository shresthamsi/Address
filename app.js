var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    pin             = require("pincode");
    
mongoose.connect("mongodb://localhost:27017/address_app", {useNewUrlParser : true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

//SCHEMA SETUP
var addressSchema = new mongoose.Schema({
    Address1: String,
    Address2: String,
    Pincode : String,
    Landmark: String,
    City    : String,
    State   : String
});

var Address = mongoose.model("Address",addressSchema);

//ROUTES
app.get("/",function(req,res){
    res.render("home");
});

app.get("/Address",function(req,res){
    // get new address from DB 
    Address.find({}, function(err, allAddress){
        
        if(err){
            console.log(err);
               }
        
        else{
            console.log(allAddress);
            res.render("showAddress", {addressVar:allAddress});
            }
        });
    
    });


//Add a new address using form
app.get("/Address/new",function(req,res){
    res.render("new");
});

app.post("/Address",function(req,res){
    
// Get data from form
  var Address1 = req.body.address1;
  var Address2 = req.body.address2;
  var Pincode = req.body.pincode;
  var Landmark = req.body.landmark;
  var City = req.body.city;
  var State = req.body.state;
  var newAddress = { 
                    Address1: Address1,
                    Address2: Address2,
                    Pincode : Pincode,
                    Landmark: Landmark,
                    City    : City,
                    State   : State
                    }
  
  
  //Create a new address and save it to database
  Address.create(newAddress, function(err, newlyCreated){
        if(err){
            console.log(err);
               }
        
        else{
            res.redirect("/Address");
            }
       });
   
    });


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is listening");
});
