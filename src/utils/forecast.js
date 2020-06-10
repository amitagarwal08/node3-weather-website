const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=48f4f682099719607752de5286bced6f'

	request({ url, json: true }, (error, { body }) => {
		if(error){
			callback('Unable to connect to weather services!', undefined)
		}else if(!body.current){
			callback('Unable to find location', undefined)
		}else{
			callback(undefined, 'It is currently ' + body.current.temp + ' degreess out. Maximum temperature ' + body.daily[0].temp.max + ' and Minimum temperature ' + body.daily[0].temp.min + ' for today.')
		}
	})
}

module.exports = forecast