import React, { useState } from "react";
import "./Map.css";
import { Dialog, IconButton, DialogTitle, Box } from "@material-ui/core";
import { Close as CloseIcon } from '@material-ui/icons';

export default (props) => {
  return (
    <Dialog open={props.mapModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            Nearby Workplaces
            <IconButton>
              <CloseIcon  onClick={props.closeModal}/>
            </IconButton>
        </Box>
      </DialogTitle>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1392.0670418933025!2d18.42477539244547!3d-33.91766278977248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc676055f3ce6b%3A0xc3fda2104679e043!2s31%20Lower%20Long%20St%2C%20Cape%20Town%20City%20Centre%2C%20Cape%20Town%2C%208000!5e0!3m2!1sen!2sza!4v1645794415457!5m2!1sen!2sza"></iframe>
    </Dialog>
  );
};