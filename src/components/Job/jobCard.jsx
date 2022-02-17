import React from "react";
import "./jobCard.scss";

import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { differenceInBusinessDays } from "date-fns";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    cursor: "pointer",
    transition: ".50s",
    boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.7)",

    "&:hover": {
      boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.2)",
      borderLeft: "10px solid #4D64E4",
    },
  },

  companyName: {
    fontSize: "13.5px",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.75),
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: 600,
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
    <div className="jobCard">
      <Box p={2} className={classes.wrapper}>
        <Grid container alignItems="center">
          <Grid item xs className="items">
            <Typography className="itemsTitle" variant="subtitle1">
              {props.title}
            </Typography>
            <Typography className={classes.companyName} variant="subtitle1">
              {props.companyName}
            </Typography>
          </Grid>
          <Grid item container xs className="items">
            {props.skills.map((skill) => (
              <Grid key={skill} className={classes.skillChip} item id="skill">
                {skill}
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="flex-end"
            xs
            className="items"
          >
            <Grid item className="items">
              <div className="bottomCard">
                <Typography variant="caption">
                  {differenceInBusinessDays(Date.now(), props.postedOn)} days
                  ago | {props.type} | {props.location}
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Box mt={2}>
                <div className="bottomCard">
                  <Button onClick={props.open} variant="outlined">
                    Check
                  </Button>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
