import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  FormControlLabel,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { addData } from "../utils/firebase";
import Router from "next/router";

export default function addCourse() {
  const formRef = React.useRef();
  const [data, setData] = React.useState({});
  const [valid, setValid] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const toAdd = {
      title: data.get("courseName"),
      instructor: data.get("instructor"),
      length: Number(data.get("length")),
      rating: Number(data.get("rating")),
      img: data.get("img"),
      description: data.get("description"),
      comments: "",
    };
    addData("courses", toAdd);
    formRef.current.reset();
    Router.push("/");
  };

  const handleChange = (event) => {
    setData(new FormData(event.currentTarget));
    setSubmitted(true);
  };

  React.useEffect(() => {
    if (submitted) {
      if (
        data.get("courseName").length > 3 &&
        data.get("instructor").length > 3 &&
        data.get("img").length > 3 &&
        data.get("description").length > 5 &&
        data.get("length") &&
        data.get("rating") > 0 &&
        data.get("rating") < 6
      )
        setValid(true);
    }
  }, [data, valid]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: "#9393937f",
        borderRadius: "10px",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <AddBoxIcon />
        </Avatar>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          margin="20px 0"
          component="h2"
          sx={{
            fontWeight: 500,
            letterSpacing: ".1rem",
          }}
        >
          Add Course
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          onChange={handleChange}
          ref={formRef}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="courseName"
                required
                fullWidth
                id="courseName"
                label="Course Name"
                autoFocus
                sx={{ backgroundColor: "#97979735" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="instructor"
                label="Instructor"
                name="instructor"
                sx={{ backgroundColor: "#97979735" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="length"
                label="Length (Hours)"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 60 } }}
                id="length"
                sx={{ backgroundColor: "#97979735" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                noValidate
                required
                fullWidth
                name="rating"
                label="Rating (1-5)"
                InputProps={{ inputProps: { min: 1, max: 5 } }}
                type="number"
                id="rating"
                sx={{ backgroundColor: "#97979735" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="img"
                label="Image Link"
                name="img"
                sx={{ backgroundColor: "#97979735" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                sx={{ backgroundColor: "#97979735" }}
              />
            </Grid>
          </Grid>
          <Button
            disabled={!valid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
