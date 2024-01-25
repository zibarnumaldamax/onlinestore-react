import React from 'react';
import { Accordion,AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'

const MobilAccordion = ({ title, children}) => {
  return (
    <div>
      <Accordion sx={{ boxShadow:"none" }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-label="Expand"
          aria-controls="-content"
          id="-header"
        >
          <Typography variant="body1"  sx={{ fontWeight: '600',fontSize:'20px',fontFamily:"Montserrat" }}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ fontWeight: '500',fontSize:'18px',fontFamily:"Montserrat" }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MobilAccordion;