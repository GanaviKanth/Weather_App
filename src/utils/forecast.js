const request = require('request')

const forecast = (latitude,longitude, callback)=>{
    url='http://api.weatherstack.com/current?access_key=aea8c9bed148fc3bf5bff1db48e91833&query=' + longitude + ',' + latitude+ '&units=m'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('no connection',undefined)
        }
        else if(body.error){
            callback('No proper data',undefined)
        }
        else{
            callback(undefined,'It is a '+body.current.weather_descriptions[0]+
            ' with a temperature of '+ body.current.temperature +'C but it feels like '+
            body.current.feelslike+'C')
                
        }
    })
}

module.exports = forecast