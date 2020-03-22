import React from "react";
import PropTypes from "prop-types";
import ArrowIcon from "../../assets/icons/arrow-forward-circle-outline.svg";
import CloseIcon from "../../assets/icons/close-circle-outline.svg";
import Spinner from "../Spinner";

const ListItems = ({
 dataList, actionEvent, loading, id 
}) => (
  <ul>
    {dataList.map(c => (
      <li key={c.geonameid}>
        <div className="elements">
          <div className="elements__text">
            <p
              className={`elements__text__name${
                c.active ? " elements__text__name--selected" : ""
              }`}
            >
              {c.name}
            </p>
            <p>{`${c.subcountry} - ${c.country}`}</p>
          </div>
          <div className="elements__button">
            {loading && c.geonameid === id ? (
              <Spinner />
            ) : (
              <button type="button" onClick={() => actionEvent(c)}>
                <img src={c.active ? CloseIcon : ArrowIcon} alt="arrow icon" />
              </button>
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
);

ListItems.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  actionEvent: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  id: PropTypes.string
};

export default ListItems;
