const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const app = express();
const apiKey ='a5302b7304b3541c80be805513f16439';
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.get('/',function(req,res){
    res.render('index',{weather:null,errors:null})
})
app.post("/", (req , res) =>{
   
    let city = req.body.city
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    console.log(req.body.city)
   request(url,function(err,response,body){
        if(err){
            
            res.render('index',{weather:null,errors:"please enter a validate "})
        }else{
          
            let weather=JSON.parse(body)
            if(weather.main == undefined){
                res.render('index',{
                    weather :null,
                    errors:"please enter a validate " 
                })
               
            }else{
                let weatherText=`it's ${weather.main.temp} degress Celsius with ${weather.weather[0].main} in ${weather.name}`
                res.render('index',{weather:weatherText,errors:null})
                console.log('Body: '+ body)
            }
        }
    })

})
app.listen(3005,function(){
    console.log('weatherly app listning on port 3005!')
})