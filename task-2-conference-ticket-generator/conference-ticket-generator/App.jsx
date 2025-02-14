import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FirstForm from "./components/FirstForm";
import SecondForm from "./components/SecondForm";

export default function App() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 3;

  // putting my formData in the parent App component so I will have a direct access to all the data I need for the ticket UI
  const [formData, setFormData] = React.useState({
    ticketType: "",
    ticketCount: "",
    image: "",
    name: "",
    email: "",
    projectDetail: "",
  });

  console.log(formData);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  return (
    <div className="container">
      <Header step={step} totalSteps={totalSteps} />

      {step === 1 && <Hero />}

      {step === 1 && (
        <FirstForm
          nextStep={() => setStep(2)}
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {step === 2 && (
        <SecondForm
          prevStep={() => setStep(1)}
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
        />
      )}
    </div>
  );
}
