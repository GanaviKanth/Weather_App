const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express engine
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set handle engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to the server

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        'title':'Weather App',
        'name':'Ganavi'
    })
})


app.get('/about', (req,res)=>{
    res.render('about',{
        'title':'About',
        'name' : 'Ganavi'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        'msg':'Need any help?',
        'title':'Help',
        'name':'Ganavi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            'error': 'Please provide an address',
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                'forecast': forecastData,
                location,
                'address':req.query.address,
            })
        })
    })

  

})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        'msg':'help page not available',
        'title':'404',
        'name' : 'Ganavi'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        'msg': 'Page not found',
        'title':'404',
        'name' : 'Ganavi'
    })
})

app.listen(port, () => {
    console.log('Server is up on port'+ port)
})