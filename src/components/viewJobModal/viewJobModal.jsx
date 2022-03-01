import React from "react";

import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  info: {
    "& > *": {
      margin: "4px",
    },
  },
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    backgroundColor: "#000000b7",
    color: "#fff",
  },
}));

export default (props) => {
  const classes = useStyles();

  return (
    <div className="jobInfo">
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {props.job.title} @ {props.job.companyName}
          <IconButton onClick={props.closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.info} display="flex">
          <Typography variant="caption">Posted On: </Typography>
          <Typography variant="body2">
            {props.job.postedOn &&
              format(props.job.postedOn, "dd/MMM/yyy HH:MM")}
          </Typography>
        </Box>
        <Box className={classes.info} display="flex">
          <Typography variant="caption">Job type: </Typography>
          <Typography variant="body2">{props.job.type}</Typography>
        </Box>
        <Box className={classes.info} display="flex">
          <Typography variant="caption">Job location: </Typography>
          <Typography variant="body2">{props.job.location}</Typography>
        </Box>
        <Box className={classes.info} display="flex">
          <Typography variant="caption">Job description: </Typography>
          <Typography variant="body2">{props.job.description}</Typography>
        </Box>
        <Box className={classes.info} display="flex">
          <Typography variant="caption">Company Name </Typography>
          <Typography variant="body2">{props.job.companyName}</Typography>
        </Box>
        <Box className={classes.info} display="flex">
          <Typography variant="caption">Company website: </Typography>
          <Typography variant="body2" component="a" href={props.job.companyUrl} target="_blank">{props.job.companyUrl}</Typography>
        </Box>
        <Box ml={0.5}>
          <Typography variant="caption">Category: </Typography>
          <Grid container alignitems="center">
                <Grid item className={classes.skillChip}>
            {props.category}
                </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
          <Button className="button" component="a" href={props.job.link} target="_blank" variant="outlined">
                Apply
          </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};