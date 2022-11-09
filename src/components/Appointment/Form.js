import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
//import "components/Appointment/styles.scss"

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [missing, setMissing] = useState(null);

  const reset = () => {
    setStudent("");
    setInterviewer(undefined);
  };

  const cancel = () => {
    setMissing("");
    reset();
    props.onCancel();
  };
  const save = () => {
    if (!student) {
      setMissing("student name cannot be blank");
    } else if (!interviewer) {
      setMissing("please select an interviewer");
    } else {
      setMissing("");
      if (props.isEdit) {
        props.onSave(student, interviewer, true);
      } else {
        props.onSave(student, interviewer);
      }
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
            }}
            data-testid="student-name-input"
          />
          {missing && (
            <section className="appointment__validation">{missing}</section>
          )}
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          setInterviewer={setInterviewer}
          interviewer={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={save}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
