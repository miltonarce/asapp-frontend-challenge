import React from "react";
import { useDispatch } from "react-redux";
import { getCities } from "../../db/creators";
import NextIcon from "../../assets/icons/chevron-forward-circle-outline.svg";
import BackIcon from "../../assets/icons/chevron-back-circle-outline.svg";
import BackIconDisabled from "../../assets/icons/chevron-back-circle-outline_disabled.svg";
import NextconDisabled from "../../assets/icons/chevron-forward-circle-outline_disabled.svg";

const Pager = ({ next, back }) => {
  const dispatch = useDispatch();

  const nextPage = () => {
    dispatch(getCities(`/${next.split("/")[3]}`));
  };

  const backPage = () => {
    dispatch(getCities(`/${back.split("/")[3]}`));
  };

  return (
    <div className="pager">
      <div>
        <button onClick={backPage} disabled={!back} type="button">
          <img src={back ? BackIcon : BackIconDisabled} alt="last icon" />
        </button>
      </div>
      <div>
        <button onClick={nextPage} disabled={!next} type="button">
          <img src={next ? NextIcon : NextconDisabled} alt="next icon" />
        </button>
      </div>
    </div>
  );
};

export default Pager;
