// doctorsData.js

const doctorsList = [
  {
    id: 1,
    name: "Dr. Robert Wilson",
    specialty: "Cardiology",
    contact: "robert.wilson@medihub.com",
    patients: 128,
    status: "Active",
    years: 15,
  },
  {
    id: 2,
    name: "Dr. Lisa Martinez",
    specialty: "Neurology",
    contact: "lisa.martinez@medihub.com",
    patients: 95,
    status: "Active",
    years: 12,
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    specialty: "Orthopedics",
    contact: "michael.chen@medihub.com",
    patients: 112,
    status: "On Leave",
    years: 10,
  },
];

// Function to get doctors from localStorage or fallback to default list
export const getDoctors = () => {
  return JSON.parse(localStorage.getItem("doctors")) || doctorsList;
};

// Function to save doctors to localStorage
export const saveDoctors = (doctors) => {
  localStorage.setItem("doctors", JSON.stringify(doctors));
};

// Function to add a new doctor
export const addDoctor = (newDoctor) => {
  const doctors = getDoctors();
  newDoctor.id = doctors.length ? doctors[doctors.length - 1].id + 1 : 1;
  doctors.push(newDoctor);
  saveDoctors(doctors);
};

// Function to delete a doctor
export const deleteDoctor = (doctorId) => {
  const doctors = getDoctors().filter((doctor) => doctor.id !== doctorId);
  saveDoctors(doctors);
};

// Function to update a doctor
export const updateDoctor = (updatedDoctor) => {
  const doctors = getDoctors().map((doctor) =>
    doctor.id === updatedDoctor.id ? updatedDoctor : doctor
  );
  saveDoctors(doctors);
};
