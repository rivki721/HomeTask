import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import PatientDetails from "./components/PatientDetails";
import { getMembers, getUnvaccinatedMembers } from "./api";
import "./App.css";

function App() {
  const [pickedPatientId, setPickedPatientId] = useState(null);
  const [unvaccinatedMembers, setUnvaccinatedMembers] = useState(0)
  const [members, setMembers] = useState([]);

  const getAllMembers = async () => {
    const allMembers = await getMembers();
    const unvaccinatedMembers = await getUnvaccinatedMembers();

    setUnvaccinatedMembers(unvaccinatedMembers.data);
    setMembers(allMembers.data);
    setPickedPatientId(null);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  const handleOnCardClick = (patient) => {
    setPickedPatientId(patient.id);
  };

  const handleNewPatient = () => {
    setPickedPatientId(null);
  };

  return (
    <div className="app-container">
      <PatientDetails patientId={pickedPatientId} getAllMembers={getAllMembers} />

      <div className="cards-container">
        <div className="cards-header">
          <button className="new-patient-button" onClick={handleNewPatient}>
            New Patient
          </button>
          <div className="unvaccinated-members">
            Unvaccinated: {unvaccinatedMembers}
            </div>
        </div>

        {members.map((patient) => (
          <Card key={patient.id} patient={patient} onClick={handleOnCardClick} pickedPatientId={pickedPatientId} />
        ))}
      </div>
    </div>
  );
}

export default App;
