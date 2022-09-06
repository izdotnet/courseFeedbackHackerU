import { useState, useEffect } from "react";
import { getCollectionData } from "../utils/firebase";
import MediaCard from "../components/Card";
import Search from "../components/Search";
import { Box, Container, Typography, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

// const fakeData = [
//   {
//     data: {
//       title: "React Course",
//       description:
//         "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
//       img: "https://patterns.dev/img/reactjs/react-logo@3x.svg",
//       instructor: "Ido Paz",
//       length: "20",
//       rating: "10",
//     },
//     id: 1,
//   },
//   {
//     data: {
//       title: "JavaScript Course",
//       description:
//         "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
//       img: "https://patterns.dev/img/reactjs/react-logo@3x.svg",
//       instructor: "Ido Paz",
//       length: "20",
//       rating: "10",
//     },
//     id: 2,
//   },
//   {
//     data: {
//       title: "HTML5 Course",
//       description:
//         "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
//       img: "https://patterns.dev/img/reactjs/react-logo@3x.svg",
//       instructor: "Ido Paz",
//       length: "20",
//       rating: "10",
//     },
//     id: 3,
//   },
//   {
//     data: {
//       title: "CSS3 Course",
//       description:
//         "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
//       img: "https://patterns.dev/img/reactjs/react-logo@3x.svg",
//       instructor: "Ido Paz",
//       length: "20",
//       rating: "10",
//     },
//     id: 4,
//   },
//   {
//     data: {
//       title: "C# Course",
//       description:
//         "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
//       img: "https://patterns.dev/img/reactjs/react-logo@3x.svg",
//       instructor: "Ido Paz",
//       length: "20",
//       rating: "10",
//     },
//     id: 5,
//   },
// ];

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = getCollectionData("courses").then((result) =>
      setData(result)
    );

    return () => unsubscribe;
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.data().title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  return (
    <Container>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        gutterBottom
        margin="50px 0"
        component="h2"
        sx={{
          mr: 2,
          fontWeight: 600,
          letterSpacing: ".4rem",
        }}
      >
        All Courses
      </Typography>

      <Search setSearchTerm={setSearchTerm} />

      <Box>
        <Grid2 container spacing={4} direction="row" justifyContent="center">
          {filteredData.map((element) => (
            <MediaCard data={element.data()} id={element.id} key={element.id} />
          ))}
        </Grid2>
      </Box>
    </Container>
  );
}
