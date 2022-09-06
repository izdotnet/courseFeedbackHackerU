import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import Link from "next/link";
import Router from "next/router";

export default function MediaCard({ data, id }) {
  return (
    <Card
      sx={{
        backgroundColor: "#939393",
        color: "#1d1d1d",
        margin: "20px",
        borderRadius: "10px",
        width: {
          xs: 1.0,
          sm: 500,
          md: 350,
          lg: 325,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={data.img}
        alt="Course image"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
        >
          {data.title}
        </Typography>

        <Divider sx={{ marginBottom: "15px" }}>
          <Chip
            label="Info"
            sx={{
              marginBottom: "5px",
              marginTop: "10px",
              fontWeight: 500,
              letterSpacing: ".1rem",
              fontSize: "0.7rem",
            }}
          />
        </Divider>

        <Typography gutterBottom variant="subtitle1" component="p">
          Instructor: {data.instructor}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="p">
          Length: {data.length} Hours
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="p"></Typography>

        <Divider sx={{ marginBottom: "18px", marginTop: "10px" }}>
          <Chip
            label="Description"
            sx={{
              marginBottom: "5px",
              marginTop: "10px",
              fontWeight: 500,
              letterSpacing: ".1rem",
              fontSize: "0.7rem",
            }}
          />
        </Divider>

        <Typography variant="body2" color="text.secondary">
          {data.description.substring(0, 30) + " ..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            Router.push(`/${id}`);
          }}
          color="primary"
          size="small"
          variant="contained"
          sx={{
            width: "70%",
            margin: "auto",
            marginBottom: "10px",
            fontWeight: "500",
            borderRadius: "10px",
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
