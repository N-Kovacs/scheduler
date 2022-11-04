

export function getAppointmentsForDay(state, day) {
  let output = []
  const filteredAppointments = state.days.filter(id => id.name === day)
  if(filteredAppointments[0]){
    console.log("shouldnt")
    for(let search in state.appointments){
      for(let numApp of filteredAppointments[0].appointments)
      if (state.appointments[search].id === numApp){
        output.push(state.appointments[search])
      } 
    }

  }
  return output
}

export function getInterview(state, interview) {
  let output = null

  if (interview){
    let iName = state.interviewers[interview.interviewer].name
    let iAvatar = state.interviewers[interview.interviewer].avatar
    output = {
      student: interview.student,
      interviewer:{
        id:interview.interviewer,
        name: iName,
        avatar: iAvatar
      }
    }
  }

  return output
}
