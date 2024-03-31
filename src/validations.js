const isTel = (s) => {
  if (s === "") return true;

  for (let i = 0; i < s.length; i++) {
    if (s[i] < "0" || s[i] > "9") return false;
  }

  if (s.indexOf("0") !== 0 || s.length !== 9) return false;

  return true;
}

//  func to check valid of Mphone
const isPhone = (s) => {
  for (let i = 0; i < s.length; i++) {
    if (s[i] < "0" || s[i] > "9") return false;
  }

  if (s.indexOf("0") !== 0 || s.length !== 10) return false;

  return true;
}
//func to check valid of id
const checkId = (d) => {
  while (d.length < 9) {
    d = "0" + d;
  }

  let s = 0,
    t;
  for (let i = 0; i < d.length; i++) {
    if (i % 2 === 0) {
      s += parseInt(d[i]);
    }
    if (i % 2 !== 0) {
      t = parseInt(d[i]) * 2;
      if (t < 10) s += t;
      else s += (t % 10) + Math.floor(t / 10);
    }
  }

  return s % 10 === 0;
}


export const validateMemberDetails = (patientDetails) =>{
  if (
    !patientDetails.taz ||
    !patientDetails.firstName ||
    !patientDetails.lastName ||
    !patientDetails.city ||
    !patientDetails.street ||
    !patientDetails.dob ||
    !patientDetails.phone ||
    !patientDetails.mobilePhone
  ) {
    return "Please fill all fields"
  }
  //check ID Validation
  if (checkId(patientDetails.taz) === false) {
    return "Illegal Taz"
  }

  //check MobilePhone Validation
  if (isPhone(patientDetails.mobilePhone) === false) {
    return "Illegal Mobile Phone number"
  }

  //check Phone Validation
  if (isTel(patientDetails.phone) === false) {
    return "Illegal Phone number"
  }

  if (patientDetails.covidMember && patientDetails.covidMember.sickDate && patientDetails.covidMember.recoveryDate) {
    if (new Date(patientDetails.covidMember.sickDate) > new Date(patientDetails.covidMember.recoveryDate)) {
      return "Recovery date must be after sick date"
    }
  }
}