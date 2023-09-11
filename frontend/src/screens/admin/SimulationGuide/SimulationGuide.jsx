import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Step1 from './steps/Step1/Step1';
import Step2 from './steps/Step2/Step2';
import Step3 from './steps/Step3/Step3';
import Step4 from './steps/Step4/Step4';
import Step5 from './steps/Step5/Step5';
import Step6 from './steps/Step6/Step6';
import Step7 from './steps/Step7/Step7';
import { FaArrowLeft, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';

const SimulationGuide = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [installationId, setInstallationId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.fromStep !== undefined) {
      setStepIndex(location.state.fromStep);
    }
  }, [location]);

  const handleNext = (installation) => {
    console.log("Received installation:", installation);

    if (installation) {
      setInstallationId(installation);
    }
    if (stepIndex < 6) {
      setStepIndex(stepIndex + 1);
    } else {
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const stepsComponents = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];
  const CurrentStepComponent = stepsComponents[stepIndex];

  return (
    <div className="d-flex flex-column" style={{ height: '90vh' }}>
      <div className="flex-grow-1">
      <CurrentStepComponent onNext={handleNext} installation={installationId} />
      </div>
      <div className="d-flex justify-content-center pb-4 pt-4">
        <button
          className={`btn btn-primary ${stepIndex === 0 ? 'disabled' : ''}`}
          onClick={handlePrev}
          style={{ marginRight: '20px' }}
        >
          <FaArrowLeft /> retour à l'étape précédente
        </button>
      
        {stepIndex === 6 && (
          <button
            className="btn btn-success"
            onClick={handleNext}
            style={{ marginRight: '20px' }}
          >
            <FaCheck />
          </button>
        )}
        <button className="btn btn-danger" onClick={() => navigate('/')}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default SimulationGuide;
