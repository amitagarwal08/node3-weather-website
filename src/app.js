const path = require('path')
// import express library
const express = require('express')

const hbs = require('hbs')

// Import geocode and forecast function
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// express is only a function which return many 
// functions which are helpful in creating server
const app = express()

// Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Amit Agarwal'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Amit Agarwal'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Amit Agarwal'
	})
})

// setup weather route
app.get('/weather', (req, res) => {
	//console.log(req.query.address)
	if(!req.query.address){
		return res.send({
			error: "You must provide an address term"
		})
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if(error){
			return res.send({ error: error })
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if(error){
				return res.send({ error: error })
			}

			res.send({
				address: req.query.address,
				location: location,
				forecast: forecastData
			})	
		})
	})
	
})

app.get('/help/*', (req, res) => {
	//res.send('Help article not found')
	res.render('404', {
		title: '404 page',
		name: 'Amit Agarwal',
		error: 'Help article not found.'
	})
})

app.get('*', (req, res) => {
	//res.send('My 404 page')
	res.render('404', {
		title: '404 page',
		name: 'Amit Agarwal',
		error: 'Page not found.'
	})
})

// // get method which is provided by express 
// // setup empty route
// app.get('', (req, res) => {
// 	res.send('Hi express!')    // send method to send data back to client browser
// })

// //setup help route
// app.get('/help', (req, res) => {
// 	res.send('<h2>Help<h2>')
// })

// // setup about route
// app.get('/about', (req, res) => {
// 	res.send('<h1>About page</h1>')
// })


// listen method to run server on specific port
app.listen(3000, () => {
	console.log('Server is up on port 3000')
})