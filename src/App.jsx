import React, { useState, useEffect } from "react";
import { firestore, app } from "./firebase";

import Header from "./components/Header/header";
import Map from "./components/map/map";
import SearchBar from "./components/searchBar/searchBar";
import JobCard from "./components/Job/jobCard";
import ViewJobModal from "./components/viewJobModal/viewJobModal";

import {
  ThemeProvider,
  Grid,
  CircularProgress,
  Box,
  Button,
} from "@material-ui/core";
import theme from "./theme/theme";
import NewJobModal from "./components/newJobModal/newJobModal";
import { Close as CloseIcon } from "@material-ui/icons";

function App() {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [customSearch, setCustomSearch] = useState(false);

  const [newJobModal, setNewJobModal] = useState(false);

  const [viewJob, setViewJob] = useState({});

  const [mapModal, setMapModal] = useState(false)

  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
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

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .where("location", "==", jobSearch.location)
      .where("type", "==", jobSearch.type)
      .where("category", "==", jobSearch.category)
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
      <Header openNewJobModal={() => setNewJobModal(true)} openMapModal={() => setMapModal(true)} />
      <Map closeModal={() => setMapModal(false)} mapModal={mapModal}/>
      <NewJobModal
        closeModal={() => setNewJobModal(false)}
        newJobModal={newJobModal}
        postJob={postJob}
      />
      <ViewJobModal job={viewJob} closeModal={() => setViewJob({})} />
      <Box mb={3}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <SearchBar fetchJobsCustom={fetchJobsCustom} />

            {loading ? (
              <Box display="flex" justifyContent="center">
                {" "}
                <CircularProgress />{" "}
              </Box>
            ) : (
              <>
                {customSearch && (
                  <Box display="flex" justifyContent="flex-end" my={2}>
                    <Button onClick={fetchJobs}>
                      <CloseIcon size={20} />
                      Custom Search
                    </Button>
                  </Box>
                )}
                {jobs.map((job) => (
                  <JobCard open={() => setViewJob(job)} key={job.id} {...job} />
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
export default App;
