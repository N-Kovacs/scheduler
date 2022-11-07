import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
//import "components/Appointment/styles.scss"




export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const test=student



const reset = () => {
  setStudent("")
  setInterviewer(null)
}

const cancel = () => {
  console.log("cancel")
  reset()
  props.onCancel()
  
  
}
const save = () => {
  props.onSave(student)
}
console.log(props.interviewers)

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off"
    onSubmit={event => event.preventDefault()}>
    
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value = {props.student}
        onChange={(event) => setStudent(event.target.value)}
      />

    </form>
    <InterviewerList 
      interviewers= {[]}
      setInterviewer={setInterviewer}
      interviewer={interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel} >Cancel</Button>
      <Button confirm onClick={save} >Save</Button>
    </section>
  </section>
</main>


  )
}
