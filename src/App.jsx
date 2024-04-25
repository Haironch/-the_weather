import { useEffect, useState } from "react";

import { getCountries } from "./services/countries";
import { getCities } from "./services/cities";
import { getCityWeather } from "./services/weather";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    (async () => {
      const paises = await getCountries();
      //ordenar paises por nombreññ
      paises.sort((a, b) => {
        if (a.name.common > b.name.common) {
          return 1;
        }
        if (a.name.common < b.name.common) {
          return -1;
        }
        return 0;
      });
      setCountries(paises);
    })();
  }, []);

  const countryHandler = async (e) => {
    e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
    setWeather(null);
  };

  const cityHandler = async (e) =>
    e.currentTarget.value &&
    setWeather(await getCityWeather(e.currentTarget.value));

  return (
    <>
      <div>
        <label>Elige un país:</label>
        <select onChange={countryHandler}>
          <option value="">Selecciona</option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.cca2}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>

      {cities.length > 0 && (
        <div>
          <label>Elige una ciudad:</label>
          <select onChange={cityHandler}>
            <option value="">Selecciona</option>
            {cities.map((city) => (
              <option key={city.id}>{city.name}</option>
            ))}
          </select>
        </div>
      )}

      

      {weather && (
        <div>
          <h2>Clima actual {weather.main.temp}º</h2>
          <p>Minimo: {weather.main.temp_min.toFixed()}°</p>
          <p>Maximo: {weather.main.temp_max.toFixed()}°</p>
          
        </div>
      )}
    </>
  );
};


export default App;
