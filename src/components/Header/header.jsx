import React from "react";
import "./Header.scss";

import { Box, Grid, Typography, Button } from "@material-ui/core";

export default (props) => (
  <div className="header">
    <Box py={10} bgcolor="secondary.main" color="white">
      <Grid container justify="center">
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Typography className="h1" variant="h4">
              Local Jobs
            </Typography>
            <Button
              className="button"
              onClick={props.openNewJobModal}
              variant="contained"
              color="primary"
              disableElevation
            >
              Post a job
            </Button>
            <Button
              onClick={props.openMapModal}
              className="button"
              variant="contained"
              color="primary"
              disableElevation
            >
              Nearby Workplaces
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </div>
);
