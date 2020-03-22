import React from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

const ListPreferedItems = ({
  dataList,
  preferedList,
  actionEvent,
  loading,
  id
}) => (
  <ul>
    {preferedList.map(selected =>
      dataList.map(c => {
      if (selected === c.geonameid) {
        return (
            <li className="label-chip" key={`l-${c.geonameid}`}>
            <label>{`${c.name} - ${c.country}`}</label>
            {loading && c.geonameid === id ? (
                <Spinner />
              ) : (
              <label onClick={() => actionEvent(c)}>x</label>
              )}
          </li>
        );
      }
    })
    )}
  </ul>
);

ListPreferedItems.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  preferedList: PropTypes.arrayOf(PropTypes.number),
  actionEvent: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  id: PropTypes.string
};

export default ListPreferedItems;
