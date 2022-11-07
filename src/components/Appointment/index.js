import React, { useState } from "react";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm"
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        console.log("error");
      });
  }
  function deleteIn(){
    transition(DELETING)
    console.log(props.id)
    props.cancelInterview(props.id)
    .then(()=>{
      transition(EMPTY)
    });


  }

  // console.log(props.interviewers)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
  
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
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === CONFIRM && <Confirm message = "Confirm Delete" onConfirm={deleteIn} onCancel={() => transition(SHOW)} />}
      {mode === EDIT &&         <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => transition(SHOW)}
        />}
      
    </article>
  );
}
