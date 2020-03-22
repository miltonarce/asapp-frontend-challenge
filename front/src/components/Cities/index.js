import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import Notifications, { notify } from "react-notify-toast";
import {
  getCities,
  getCitiesByFilter,
  getPreferedCities,
  setPreferedCity,
  cleanErrorMessage
} from "../../db/creators";
import Spinner from "../Spinner";
import ListItems from "../ListItems";
import ListPreferedItems from "../ListPreferedItems";
import FunnelIcon from "../../assets/icons/funnel-outline.svg";
import BusinessIcon from "../../assets/icons/business-outline.svg";
import Pager from "../Pager";

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
    const selectedCity = preferedCities.data.includes(geonameid);

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

  if (preferedCities.message !== "") {
    notify.show(preferedCities.message, "error");
    dispatch(cleanErrorMessage());
  }

  if (cities.message !== "") {
    notify.show(cities.message, "error");
    dispatch(cleanErrorMessage());
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
                    active: preferedCities.data.includes(c.geonameid)
                  }))}
                  loading={preferedCities.loading}
                  id={preferedCities.id}
                />
              ) : (
                <div className="filter-box__items__list__message">
                  <picture>
                    <img src={BusinessIcon} alt="info message" />
                  </picture>
                  <p>ups! Sorry cities not found.</p>
                </div>
              )}
            </div>
            <div className="filter-box__items__pager">
              <Pager next={cities.nextLink} back={cities.backLink} />
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
      <Notifications />
    </div>
  );
};

export default Cities;
