import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectRestaurant from '../components/SelectRestaurant';
import AddRestaurant from './AddRestaurant';

const steps = ['Select Restaurant', 'Update Restaurant'];

export default function EditRestaurant() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedRestaurentId, SetSelectedRestaurentId] = React.useState(null);


  const handleSelectedRestaurentId = (id) => {
    SetSelectedRestaurentId(id);
  }

  const goToStepZero = () => {
    SetSelectedRestaurentId(null);
    setActiveStep(0);
  }

  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    SetSelectedRestaurentId(null)
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  const handleReset = () => {
    SetSelectedRestaurentId(null)
    setActiveStep(0);
  };


  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
        marginTop: '10px'
      }}
    >
      <Box sx={{ width: '100%', mt: 7 }}>
        <Stepper activeStep={activeStep} sx={{ width: { xs: '100%', md: '50%'}, margin: 'auto' }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '40%', margin: 'auto', mb: 5 }}>
              <Typography sx={{ mt: 2, mb: 1, marigin: 'auto' }}>
                All Done 😎
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '40%', margin: 'auto', mb: 5 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset} variant="contained">Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* Select Restaurant componenets Called  */}
            {activeStep === 0 && (
              <SelectRestaurant selectIdProps={{ selectedRestaurentId, handleSelectedRestaurentId }} goToStepZero={goToStepZero} />
            )}

            {activeStep === 1 && <AddRestaurant selectedRestaurentId={selectedRestaurentId} goToStepZero={goToStepZero} />}
            {/* Display UpdateRestaurant component in step 1 */}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '40%', margin: 'auto', mb: 5 }} >
              <Button
                variant="contained"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              {
                selectedRestaurentId &&
                <Button onClick={handleNext} variant="contained">
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              }
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}

