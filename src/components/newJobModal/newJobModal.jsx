import React, { useState } from "react";

import {
  Box,
  Grid,
  FilledInput,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@material-ui/core";

import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
  included: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const initState = {
  title: "",
  type: "Full-time",
  companyName: "",
  companyUrl: "",
  location: "Remote",
  link: "",
  description: "",
  category: "",
}

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState(initState);

  const handleChange = (e) => {
    e.persist();
    setJobDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (typeof jobDetails[field] === "string" && !jobDetails[field]) return;
    }
    if (!jobDetails.category.length) return;
    setLoading(true);
    await props.postJob(jobDetails);
    closeModal();
  };

  const closeModal = () => {
    setJobDetails(initState)
    setLoading(false);
    props.closeModal();
  }

  const classes = useStyles();

  console.log(jobDetails);

  return (
    <div className="jobModal">
    <Dialog open={props.newJobModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post Job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="title"
              value={jobDetails.title}
              autoComplete="off"
              placeholder="Job Title *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="type"
              value={jobDetails.type}
              fullWidth
              disableUnderline
              variant="filled"
            >
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyName"
              value={jobDetails.companyName}
              placeholder="Company Name *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyUrl"
              value={jobDetails.companyUrl}
              placeholder="Company URL *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="location"
              value={jobDetails.location}
              disableUnderline
              variant="filled"
              fullWidth
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="On-site">On-site</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="link"
              value={jobDetails.link}
              placeholder="Job link *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={handleChange}
              name="description"
              value={jobDetails.description}
              placeholder="Job Description *"
              disableUnderline
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography>Category*</Typography>
          <Box display="flex" flexWrap={"wrap"}>
              <Select
          onChange={handleChange}
          name="category"
          value={jobDetails.category}
          className="searchBar"
          disableUnderline
          variant="filled"
          defaultValue="Administration"
          fullWidth
        >
          <MenuItem className="item" value="Administration">
            Administration
          </MenuItem>
          <MenuItem className="item" value="Assistant">
            Assistant
          </MenuItem>
          <MenuItem value="Cleaner">Cleaner</MenuItem>
          <MenuItem value="Construction">Construction</MenuItem>
          <MenuItem value="Driver">Driver</MenuItem>
          <MenuItem value="Gardening">Gardening</MenuItem>
          <MenuItem value="Learnership">Learnership</MenuItem>
          <MenuItem value="Information Technology">Information Technology</MenuItem>
          <MenuItem value="Internship">Internship</MenuItem>
          <MenuItem value="Labourer">Labourer</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
          <MenuItem value="Safety">Safety</MenuItem>
        </Select>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">* Required fields</Typography>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Post Job"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
    </div>
  );
};
