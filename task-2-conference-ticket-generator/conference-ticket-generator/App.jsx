import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FirstForm from "./components/FirstForm";
import SecondForm from "./components/SecondForm";
import ConferenceTicket from "./components/ConferenceTicket";

export default function App() {
  const [step, setStep] = React.useState(() => {
    const savedStep = localStorage.getItem("formStep");
    return savedStep ? JSON.parse(savedStep) : 1;
  });
  const totalSteps = 3;

  // putting my formData in the parent App component so I will have a direct access to all the data I need for the ticket UI
  const [formData, setFormData] = React.useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          ticketType: "",
          ticketCount: "1",
          avatarUrl: "",
          name: "",
          email: "hello@avioflagos.io",
          projectDetail: "",
        };
  });

  // Updating formData in localStorage whenever formData changes
  React.useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  // console.log(formData);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "ticketCount") {
      if (value === "" || (!isNaN(value) && parseInt(value) > 0)) {
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [name]: value,
          };
        });
      }
    } else {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
    }
  }

  function bookAnotherTicket() {
    localStorage.removeItem("formData");
    localStorage.removeItem("formStep");

    setFormData({
      ticketType: "",
      ticketCount: "1",
      avatarUrl: "",
      name: "",
      email: "hello@avioflagos.io",
      projectDetail: "",
    });

    setStep(1);
  }
  function nextStep() {
    localStorage.setItem("formStep", JSON.stringify(2));
    setStep(2);
  }

  function prevStep() {
    localStorage.setItem("formStep", JSON.stringify(1));
    setStep(1);
  }

  return (
    <div className="container">
      <Header step={step} totalSteps={totalSteps} />

      {step === 1 && <Hero />}

      {step === 1 && (
        <FirstForm
          nextStep={nextStep}
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {step === 2 && (
        <SecondForm
          prevStep={prevStep}
          nextStep={() => setStep(3)}
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
        />
      )}

      {step === 3 && (
        <ConferenceTicket
          formData={formData}
          bookAnotherTicket={bookAnotherTicket}
        />
      )}
    </div>
  );
}
