import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { getCities, getCitiesByFilter } from "../../db/creators";
import Spinner from "../Spinner";

const Cities = () => {
  const dispatch = useDispatch();
  const { cities, loading } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(getCities());
  }, []);

  const delayedSearch = useRef(
    debounce(e => {
      dispatch(getCitiesByFilter(e));
    }, 500)
  ).current;

  const searchCities = e => {
    delayedSearch(e.target.value);
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
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div>
              <ul>
                {cities.map(c => (
                  <li key={c.geonameid}>{c.name}</li>
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
