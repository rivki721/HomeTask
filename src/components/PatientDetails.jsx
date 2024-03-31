import React, { useEffect, useState } from "react";
import Input from "./Input";
import { createMember, deleteMember, getMemberById, updateMember } from "../api";
import "./PatientDetails.css";

const newPatient = {
  taz: "",
  memberFirstName: "",
  memberLastName: "",
  city: "",
  street: "",
  memberDob: "",
  memberPhone: "",
  memberMobilePhone: "",
  gettingVaccinated: [],
};

const PatientDetails = ({ patientId, getAllMembers }) => {
  const [patientDetails, setPatientDetails] = useState(newPatient);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMember = async () => {
      const patient = await getMemberById(patientId);
      setPatientDetails(patient.data);
    };

    if (patientId === null) {
      setPatientDetails(newPatient);
    } else {
      getMember();
    }
  }, [patientId]);


//  func to check valid of phone
  function isTel(s) {
    if (s === "")
        return true;

    for (let i = 0; i < s.length; i++) {
        if (s[i] < '0' || s[i] > '9')
            return false;
    }

    if (s.indexOf('0') !== 0 || s.length !== 9)
        return false;

    return true;
}

//  func to check valid of Mphone
function isPelepon(s) {
    for (let i = 0; i < s.length; i++) {
        if (s[i] < '0' || s[i] > '9')
            return false;
    }

    if (s.indexOf('0') !== 0 || s.length !== 10)
        return false;

    return true;
}
//func to check valid of id
function checkId(d) {
  while (d.length < 9) {
      d = "0" + d;
  }

  let s = 0, t;
  for (let i = 0; i < d.length; i++) {
      if (i % 2 === 0) {
          s += parseInt(d[i]);
      }
      if (i % 2 !== 0) {
          t = parseInt(d[i]) * 2;
          if (t < 10)
              s += t;
          else
              s += t % 10 + Math.floor(t / 10);
      }
  }

  return s % 10 === 0;
}

  const handleSavePatient = async () => {
    setError("");
    try {
      if (patientId === null) {
        await createMember(patientDetails);
      } else {
        await updateMember(patientId, patientDetails);
      }
    } catch (error) {
      setError("There is a problem with one of the fields, please check and try again.");
    }

    await getAllMembers();
    if (
      !patientDetails.taz ||
      !patientDetails.memberFirstName ||
      !patientDetails.memberLastName ||
      !patientDetails.city ||
      !patientDetails.street ||
      !patientDetails.memberDob ||
      !patientDetails.memberPhone ||
      !patientDetails.memberMobilePhone
    )
    {
      setError("Please fill all fields");
      return;
    }
     //check ID Validation
     if(checkId(patientDetails.taz)==false)
     {
       setError("Illegal Taz");
       return;
     }

     //check MobilePhone Validation
     if(isPelepon(patientDetails.memberMobilePhone)==false)
     {
       setError("Illegal Mobile Phone number");
       return;
     }

     //check Phone Validation
     if(isTel(patientDetails.memberPhone)==false)
     {
       setError("Illegal Phone number");
       return;
     }

 
  };

  const handleAddCovidDetails = () => {
    setPatientDetails({ ...patientDetails, covidPatient: { sickDate: "", recoveryDate: "" } });
  };

  const handleDeletePatient = async () => {
    await deleteMember(patientId);
    await getAllMembers();
  };

  const handleFieldChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleCovidFieldChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, covidPatient: { ...patientDetails.covidPatient, [name]: value } });
  };

  const handleAddVaccine = () => {
    setPatientDetails({
      ...patientDetails,
      gettingVaccinated: [
        ...patientDetails.gettingVaccinated,
        {
          dateOfVaccination: "",
          vaccinationType: "",
        },
      ],
    });
  };

  const handleChangeVaccine = (e, index) => {
    const { name, value } = e.target;
    const gettingVaccinated = patientDetails.gettingVaccinated.map((vaccine, i) => {
      if (index === i) {
        return { ...vaccine, [name]: value };
      }
      return vaccine;
    });

    setPatientDetails({ ...patientDetails, gettingVaccinated });
  };




  return (
    <div className="patient-details-container">
      <div className="patient-details">
        {!patientId && <h1>Add New Member</h1>}
        <h2>Member Details</h2>
        
        <div className="inputs-container">
       
          <Input
            onChange={handleFieldChange}
            name="taz"
            label="ID"
            type="text"
            placeholder="ID"
            value={patientDetails.taz}
            disabled={!!patientId}
         
          />
          <Input
            onChange={handleFieldChange}
            name="memberFirstName"
            label="First Name"
            type="text"
            placeholder="First Name"
            value={patientDetails.memberFirstName}
          />
          <Input
            onChange={handleFieldChange}
            name="memberLastName"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            value={patientDetails.memberLastName}
          />
          <Input
            onChange={handleFieldChange}
            name="city"
            label="City"
            type="text"
            placeholder="City"
            value={patientDetails.city}
          />
          <Input
            onChange={handleFieldChange}
            name="street"
            label="Street+House number"
            type="text"
            placeholder="Street"
            value={patientDetails.street}
          />
          <Input
            onChange={handleFieldChange}
            name="memberPhone"
            label="Phone"
            type="text"
            placeholder="Phone"
            value={patientDetails.memberPhone}
          />
          <Input
            onChange={handleFieldChange}
            name="memberMobilePhone"
            label="Mobile Phone"
            type="text"
            placeholder="Mobile Phone"
            value={patientDetails.memberMobilePhone}
          />
          <Input
            onChange={handleFieldChange}
            name="memberDob"
            label="Date Of Birth"
            type="date"
            placeholder="Date Of Birth"
            value={patientDetails.memberDob}
          />
        </div>

        <h2>Covid Details</h2>
        <div className="inputs-container-2">
          {patientDetails.covidPatient ? (
            <React.Fragment>
              <Input
                onChange={handleCovidFieldChange}
                name="sickDate"
                label="Covid Sick Date"
                type="date"
                placeholder="Covid Sick Date"
                value={patientDetails?.covidPatient?.sickDate}
              />
              <Input
                onChange={handleCovidFieldChange}
                name="recoveryDate"
                label="Covid Recovery Date"
                type="date"
                placeholder="Covid Recovery Date"
                value={patientDetails?.covidPatient?.recoveryDate}
              />
            </React.Fragment>
          ) : (
            <button className="add-button" onClick={handleAddCovidDetails}>
              Add Covid Details
            </button>
          )}
        </div>




        <h2>Vaccines</h2>
        <div className="inputs-container-2">
          {patientDetails.gettingVaccinated?.map((vaccine, index) => (
            <React.Fragment key={index}>
              <Input
                onChange={(e) => handleChangeVaccine(e, index)}
                name="dateOfVaccination"
                label="Date Of Vaccination"
                type="date"
                placeholder="Date Of Vaccination"
                value={vaccine.dateOfVaccination}
              />
              <Input
                onChange={(e) => handleChangeVaccine(e, index)}
                name="vaccinationType"
                label="Vaccination Type"
                type="text"
                placeholder="Vaccination Type"
                value={vaccine.vaccinationType}
              />
            </React.Fragment>
          ))}

          {patientDetails.gettingVaccinated.length < 4 && (
            <button className="add-button" onClick={handleAddVaccine}>
              Add Vaccination
            </button>
          )}
        </div>

        <div className="buttons-container">
    

          <button className="save-button" onClick={handleSavePatient}>
            save
          </button>
          <button className="delete-button" onClick={handleDeletePatient}>
            delete
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>);





     
    };
    

export default PatientDetails;
