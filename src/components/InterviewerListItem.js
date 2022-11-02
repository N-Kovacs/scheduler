import React, { useState } from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  let interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected} )
  const [interviewer, setInterviewer] = useState();



  return (
    <li className={interviewerClass}
    onClick={() => {setInterviewer(props.id)}} >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
