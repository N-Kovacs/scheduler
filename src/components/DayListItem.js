import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

const formatSpots = function (number) {
  let output = "";
  if (number > 1) {
    output = <h3 className="text--light">{number} spots remaining</h3>;
  } else if (number === 1) {
    output = <h3 className="text--light">1 spot remaining</h3>;
  } else {
    output = <h3 className="text--light">no spots remaining</h3>;
  }
  return output;
};

export default function DayListItem(props) {
  let dayClass = classNames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );

  return (
    <li
      className={dayClass}
      data-testid="day"
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots(props.spots)}
    </li>
  );
}
