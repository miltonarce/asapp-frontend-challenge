import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import {
  getCities,
  getCitiesByFilter,
  getPreferedCities,
  setPreferedCity
} from "../../db/creators";
import Spinner from "../Spinner";

const Cities = () => {
  const dispatch = useDispatch();
  const { cities, preferedCities } = useSelector(state => {
    console.log(state);
    return state;
  });

  useEffect(() => {
    dispatch(getCities());
    dispatch(getPreferedCities());
  }, []);

  const delayedSearch = useRef(
    debounce(e => {
      dispatch(getCitiesByFilter(e));
    }, 500)
  ).current;

  const searchCities = e => {
    delayedSearch(e.target.value);
  };

  const selectCity = async city => {
    const { geonameid, name } = city;
    const selectedCity = preferedCities.data.find(e => e === geonameid);

    if (selectedCity) {
      dispatch(
        setPreferedCity({
          [geonameid]: false,
          name
        })
      );
    } else {
      dispatch(
        setPreferedCity({
          [geonameid]: true,
          name
        })
      );
    }
  };

  return (
    <>
      <h2>To Select</h2>
      <div>
        <div>
          <input
            type="text"
            placeholder="Type to filter by city name or country"
            onChange={searchCities}
          />
        </div>
        {cities.loading ? (
          <Spinner />
        ) : (
          <>
            <div>
              <ul>
                {cities.data.map(c => (
                  <li key={c.geonameid} onClick={() => selectCity(c)}>
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cities;
