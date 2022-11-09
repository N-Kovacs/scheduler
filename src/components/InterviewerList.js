import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  //console.log(props.interviewers)
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
