const express=require("express")
const mongoose=require("mongoose")
const ShortUrl=require("./models/model")
const app=express()

//mongodb connection to localhost
mongoose.connect('mongodb://localhost:27017/urlShortener',{
    useNewUrlParser:true,
    useUnifiedTopology:true,  
})

//setting initial render view
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

//getting url everytime and rendering
app.get('/',async(req,res)=>{
   
       const shortUrL =await ShortUrl.find();
       res.render('index',{shortUrL:shortUrL})
});


app.post('/shortURLs',async(req,res)=>{
    try{
        await  ShortUrl.create({full:req.body.fullUrl})
    }
    catch(error){
        console.log(error)
    }   

  res.redirect('/')
})

//redirecting code
app.get('/:shortUrl',async(req,res)=>{
    try{
        const shortU=await ShortUrl.findOne({short: req.params.shortUrl})
    if(shortU==null) return res.sendStatus(404)

    shortU.clicks++
    shortU.save()
    
    res.redirect(shortU.full)
    }
    catch(error){
        console.log("error found")
    }
})



app.listen(8500, () => console.log('server: SellerSpot POS Server Started at the PORT 8500'));
