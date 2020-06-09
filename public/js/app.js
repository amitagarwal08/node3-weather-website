console.log('Javascript loaded from client side')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// 	response.json().then((data) => {
// 		console.log(data)
// 	})
// })

// fetch('http://localhost:3000/weather?address=kuchaman').then((response) => {
// 	response.json().then((data) => {
// 		console.log(data)
// 		if(data.error){
// 			console.log(data.error)
// 		} else {
// 			console.log(data.location)
// 			console.log(data.forecast)
// 		}
// 	})
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''

	const location = search.value
	//console.log(location)
	const url = 'http://localhost:3000/weather?address=' + location
	//console.log(url)

	fetch(url).then((response) => {
		response.json().then((data) => {
			if(data.error){
				//console.log(data.error)
				messageOne.textContent = data.error
				messageTwo.textContent = ''
			} else {
				// console.log(data.location) 
				// console.log(data.forecast)
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
		})
	})
})