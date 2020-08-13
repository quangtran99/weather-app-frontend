import React, { useEffect, useState } from 'react';
import './App.css';
import { Switch, Route, useHistory, useParams } from "react-router-dom";

function App() {
  return (
    <div>
      <div>This is my little title</div>

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:city" exact component={WeatherPage} />
      </Switch>
    </div>
  );
}

function HomePage() {
  const history = useHistory()
  return (
    <div>
      HomePage
      <form onSubmit={e => {
        e.preventDefault();
        history.push(`/${e.target.city.value}`)
      }}>
        <input type="text" name="city" placeholder="Enter your place/city name" />
        <input type="submit" value="enter" />
      </form>

    </div>
  )
}

function WeatherPage() {
  const { city } = useParams()
  const [weather, setWeather] = useState(null)


  useEffect(() => {

    async function getData(city) {
      try {
        const res = await fetch(`http://localhost:5000/weather?city=${city}`)
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error)
        }
        console.log(data)
        setWeather(data)
        
      } catch (err) {
        console.log(err)
      }
    }



    if (city) {
      getData(city)
    }
  }, [city])
  return (
    <div>
      WP
    </div>
  )
}

export default App;
