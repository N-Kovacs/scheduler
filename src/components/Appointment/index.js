import React, { useState } from "react";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {

      const interview = {
        student: name,
        interviewer,
      };
     
      transition(SAVING);
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(err => transition(ERROR_SAVE, true));
    };

  function deleteIn() {
    transition(DELETING);
    //console.log(props.id);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }

  //console.log(props.interviewers)


  ///console.log(props.interview)

  // console.log("HHHHHHHHHHHHHHHHHHHH", props.interviewers, props.interview, mode)
  if (!props.interview && mode===SHOW){
    console.log(mode)
    console.log("why")
  }
  //console.log(props.interview)

  return (
    <article className="appointment" data-testid="appointment">
      <header>{props.time}</header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
      {mode === CONFIRM && (
        <Confirm
          message="Confirm Delete"
          onConfirm={deleteIn}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Error Saving"} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Error Deleting"} onClose={() => back()} />
      )}
      
    </article>
  );
}
