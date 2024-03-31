import React, { useEffect, useState } from "react";
import Input from "./Input";
import { createMember, deleteMember, getMemberById, updateMember } from "../api";
import { validateMemberDetails } from "../validations";
import "./PatientDetails.css";

const newPatient = {
  taz: "",
  firstName: "",
  lastName: "",
  city: "",
  street: "",
  dob: "",
  phone: "",
  mobilePhone: "",
  vaccinations: [],
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


  const handleSavePatient = async () => {
    setError("");

    const validation = validateMemberDetails(patientDetails);
    if (validation) {
      setError(validation);
      return;
    }

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
  };

  const handleAddCovidDetails = () => {
    setPatientDetails({ ...patientDetails, covidMember: { sickDate: "", recoveryDate: "" } });
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
    setPatientDetails({ ...patientDetails, covidMember: { ...patientDetails.covidMember, [name]: value } });
  };

  const handleAddVaccine = () => {
    setPatientDetails({
      ...patientDetails,
      vaccinations: [
        ...patientDetails.vaccinations,
        {
          dateOfVaccination: "",
          vaccinationType: "",
        },
      ],
    });
  };

  const handleChangeVaccine = (e, index) => {
    const { name, value } = e.target;
    const vaccinations = patientDetails.vaccinations.map((vaccine, i) => {
      if (index === i) {
        return { ...vaccine, [name]: value };
      }
      return vaccine;
    });

    setPatientDetails({ ...patientDetails, vaccinations });
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
            name="firstName"
            label="First Name"
            type="text"
            placeholder="First Name"
            value={patientDetails.firstName}
          />
          <Input
            onChange={handleFieldChange}
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            value={patientDetails.lastName}
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
            name="phone"
            label="Phone"
            type="text"
            placeholder="Phone"
            value={patientDetails.phone}
          />
          <Input
            onChange={handleFieldChange}
            name="mobilePhone"
            label="Mobile Phone"
            type="text"
            placeholder="Mobile Phone"
            value={patientDetails.mobilePhone}
          />
          <Input
            onChange={handleFieldChange}
            name="dob"
            label="Date Of Birth"
            type="date"
            placeholder="Date Of Birth"
            value={patientDetails.dob}
          />
        </div>

        <h2>Covid Details</h2>
        <div className="inputs-container-2">
          {patientDetails.covidMember ? (
            <React.Fragment>
              <Input
                onChange={handleCovidFieldChange}
                name="sickDate"
                label="Covid Sick Date"
                type="date"
                placeholder="Covid Sick Date"
                value={patientDetails?.covidMember?.sickDate}
              />
              <Input
                onChange={handleCovidFieldChange}
                name="recoveryDate"
                label="Covid Recovery Date"
                type="date"
                placeholder="Covid Recovery Date"
                value={patientDetails?.covidMember?.recoveryDate}
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
          {patientDetails.vaccinations?.map((vaccine, index) => (
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

          {patientDetails.vaccinations.length < 4 && (
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
    </div>
  );
};

export default PatientDetails;
