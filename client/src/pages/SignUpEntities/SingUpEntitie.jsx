import { useState } from 'react';

import Form1 from '../../Components/SignUpEntity/Form1';
import Form2 from '../../Components/SignUpEntity/Form2';
import Form3 from '../../Components/SignUpEntity/Form3';
import { Progress, Box } from '@chakra-ui/react';

const SingUpEntitiePrueba = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const handleProgressAndStep = (obj) => {
    setStep(obj.step);
    setProgress(progress + obj.progress);
  };
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          colorScheme="green"
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <Form1 setProgressAndStep={handleProgressAndStep} />
        ) : step === 2 ? (
          <Form2 setProgressAndStep={handleProgressAndStep} />
        ) : (
          <Form3 setProgressAndStep={handleProgressAndStep} />
        )}
      </Box>
    </>
  );
};
export default SingUpEntitiePrueba;
