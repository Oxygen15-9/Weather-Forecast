const temp = document.querySelector(".temp");
const place = document.querySelector(".place");
const city = document.querySelector(".city");
const condition = document.querySelector(".condition");
const input = document.querySelector(".input input");
const btn = document.querySelector(".input button");
const detailsPlace = document.querySelector("#details-place");
const date = document.querySelector("#date");
const feelsLike = document.querySelector(".feelslike");
const humidity = document.querySelector("#forecast-humidity");
const clouds = document.querySelector("#forecast-clouds");
const winds = document.querySelector("#forecast-winds");
const pressure = document.querySelector("#forecast-pressure");
const sunrise = document.querySelector("#forecast-sunrise");
const sunset = document.querySelector("#forecast-sunset");
const direction = document.querySelector("#forecast-direction");
const form = document.querySelector('form');
const body = document.querySelector('body');


form.addEventListener('submit',(e)=>{
	e.preventDefault();
	if(input.value != ''){
		getDetails(input.value)
	}
	input.value = '';
})

function getDetails(cityName) {
	const inputCity = input.value;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=8d8bf1fa631693640260f9f00d9a2a68`;
	console.log(cityName);
	fetch(url)
	.then((res)=>{return res.json()})
	.then((data)=>{
		console.log(data)
		if(data.cod == '404'){
			alert("City not found")
			return;
		}
		getImages(data.name);
		condition.innerHTML = data.weather[0].main+', mostly '+data.weather[0].description;
		temp.innerHTML = data.main.temp+'°c';
		feelsLike.innerHTML = 'Feels like '+data.main.feels_like+'°';
		pressure.innerHTML = data.main.pressure+'hPa';
		humidity.innerHTML = data.main.humidity+'%';
		winds.innerHTML = data.wind.speed+'m/s';
		direction.innerHTML = data.wind.deg+'deg';
		clouds.innerHTML = data.clouds.all+'%';
		city.innerHTML = data.name+"";
		detailsPlace.innerHTML = data.name;

		const newDate = currDate(data.dt)
		date.innerHTML = ''+newDate;

		// date
		const newSunset = dateFinder(data.sys.sunset)
		// console.log(newDate)
		const newSunrise = dateFinder(data.sys.sunrise)
		sunset.innerHTML = newSunset+'PM';
		sunrise.innerHTML = newSunrise+'AM';
	})
}

function dateFinder(unix){
		const d = new Date(unix*1000)
		const cd = d.toUTCString();
		var theDate = new Date(Date.parse(cd));
		theDate.toLocaleString();
		const stringDate = theDate.toString();
		return stringDate.slice(16,21);
}

function currDate(dt){
	const d = new Date(dt*1000);
	const cd = d.toUTCString();
	return cd.slice(0,22);
}

function getImages(newPlace){

	url = `https://api.unsplash.com/search/photos?page=1&query=${newPlace}&per_page=1&client_id=0cQ4EPFmmb_yTFW5ujr3PLuzYxQizlFJAKLsbgHIGWd`;
	fetch(url)
	.then((res)=>{return res.json()})
	.then((data)=>{
		console.log(data)
		body.style.backgroundImage = `url("${data.results[0].urls.regular}")`;
		})
}