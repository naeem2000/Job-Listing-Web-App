import React, { useState, useEffect } from "react";
import Header from "./components/Header/header";
import SearchBar from "./components/searchBar/searchBar";
import JobCard from "./components/Job/jobCard";

import { ThemeProvider, Grid, CircularProgress, Box } from "@material-ui/core";
import theme from "./theme/theme";
import NewJobModal from "./components/Job/newJobModal";
import { firestore, app } from "./firebase";

export default () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [newJobModal, setNewJobModal] = useState(false);

  const fetchJobs = async () => {
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const postJob = async (jobDetails) => {
    await firestore.collection("jobs").add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp(),
    });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModal={() => setNewJobModal(true)} />
      <NewJobModal
        closeModal={() => setNewJobModal(false)}
        newJobModal={newJobModal}
        postJob={postJob}
      />
      <Grid container justify="center">
        <Grid item xs={10}>
          <SearchBar />

          {loading ? (
            <Box display="flex" justifyContent="center">
              {" "}
              <CircularProgress />{" "}
            </Box>
          ) : (
            jobs.map((job) => <JobCard key={job.id} {...job} />)
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
