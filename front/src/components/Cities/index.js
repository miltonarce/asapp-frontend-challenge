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
import ListItems from "../ListItems";
import ListPreferedItems from "../ListPreferedItems";
import FunnelIcon from "../../assets/icons/funnel-outline.svg";
import BusinessIcon from "../../assets/icons/business-outline.svg";

const Cities = () => {
  const dispatch = useDispatch();
  const { cities, preferedCities } = useSelector(state => state);

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
          geonameid,
          name
        })
      );
    } else {
      dispatch(
        setPreferedCity({
          [geonameid]: true,
          geonameid,
          name
        })
      );
    }
  };
  if (cities.message !== "") {
    console.log("cities", cities.message);
  }
  if (preferedCities.message !== "") {
    console.log("prefer cities", preferedCities.message);
  }
  return (
    <div className="filter-box">
      <div className="filter-box__items">
        <div className="filter-box__items__search">
          <img className="icon" src={FunnelIcon} alt="funnel icon" />
          <input
            type="text"
            placeholder="Type to filter by city name or country"
            onChange={searchCities}
          />
        </div>
        {cities.loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="filter-box__items__list">
              {cities.data.length !== 0 ? (
                <ListItems
                  actionEvent={selectCity}
                  dataList={cities.data.map(c => ({
                    ...c,
                    active: preferedCities.data.find(e => e === c.geonameid)
                  }))}
                  loading={preferedCities.loading}
                  id={preferedCities.id}
                />
              ) : (
                <div className="filter-box__items__list__message">
                  <picture>
                    <img src={BusinessIcon} alt="info message" />
                  </picture>
                  <p>
                    ups! we couldn&apos;t find the cities yet, please try again.
                  </p>
                </div>
              )}
            </div>
            <div className="filter-box__items__prefered">
              <ListPreferedItems
                dataList={cities.data}
                preferedList={preferedCities.data}
                loading={preferedCities.loading}
                actionEvent={selectCity}
                id={preferedCities.id}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cities;
