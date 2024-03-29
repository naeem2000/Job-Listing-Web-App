import React, { useState } from "react";

import "./searchBar.scss";

import {
  Box,
  Button,
  Select,
  MenuItem,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#fff",
    display: "flex",
    boxShadow: "0px 4px 7px rgba(0,0,0,0.3)",
    borderRadius: "5px",
    textAlign: "center",

    "& > *": {
      flex: 1,
      height: "45px",
      margin: "8px",
    },
  },
});

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [jobSearch, setJobSearch] = useState({
    category: "Administration",
    type: "Full-time",
    location: "Remote",
  });

  const handleChange = (e) => {
    e.persist();
    setJobSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const search = async () => {
    setLoading(true);
    await props.fetchJobsCustom(jobSearch);
    setLoading(false);
  };

  const classes = useStyles();

  return (
    <div className="search">
      <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
        <Select
          onChange={handleChange}
          name="category"
          value={jobSearch.category}
          className="searchBar"
          disableUnderline
          variant="filled"
          defaultValue="Full-time"
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
          <MenuItem value="Information Technology">
            Information Technology
          </MenuItem>
          <MenuItem value="Internship">Internship</MenuItem>
          <MenuItem value="Labourer">Labourer</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
          <MenuItem value="Safety">Safety</MenuItem>
        </Select>
        <Select
          onChange={handleChange}
          name="type"
          value={jobSearch.type}
          className="searchBar"
          disableUnderline
          variant="filled"
          defaultValue="Full-time"
        >
          <MenuItem className="item" value="Full-time">
            Full-time
          </MenuItem>
          <MenuItem className="item" value="Part-time">
            Part-time
          </MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
        </Select>
        <Select
          onChange={handleChange}
          name="location"
          value={jobSearch.location}
          className="searchBar"
          disableUnderline
          variant="filled"
          defaultValue="Remote"
        >
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="On-site">On-site</MenuItem>
        </Select>
        <Button
          disabled={loading}
          className="button"
          variant="contained"
          color="primary"
          disableElevation
          onClick={search}
        >
          {loading ? (
            <CircularProgress color="secondary" size={22} />
          ) : (
            "Search"
          )}
        </Button>
      </Box>
    </div>
  );
};
