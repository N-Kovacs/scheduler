import React, { useState } from "react";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";




export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }
  console.log(props.interviewers)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  // console.log(props.interview)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <header>{props.time}</header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE &&
        <Form interviewers={props.interviewers} onSave={() => save()} onCancel={() => transition(EMPTY)} />
      }
    </article>
  );
}
