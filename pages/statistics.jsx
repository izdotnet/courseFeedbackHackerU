import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Box,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { getCollectionData } from "../utils/firebase";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, instructor, length, rating) {
  return { name, instructor, length, rating };
}

const StatPage = () => {
  const [info, setInfo] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [filteredInfo, setFilteredInfo] = React.useState(info);
  const [loaded, setLoaded] = React.useState(false);
  const [disabledRating, setDisabledRating] = React.useState(false);
  const [disabledLength, setDisabledLength] = React.useState(false);

  const handleRatingChange = (event) => {
    const rating = event.target.value;
    if (rating === "all") {
      setFilteredInfo(info);
      setDisabledLength(false);
      return;
    }
    const filtered = info.filter((item) => item.data().rating >= rating);
    setFilteredInfo(filtered);
    setDisabledLength(true);
  };

  const handleLengthChange = (event) => {
    const length = event.target.value;
    if (length === "all") {
      setFilteredInfo(info);
      setDisabledRating(false);
      return;
    }
    const filtered = info.filter((item) => item.data().length > length);
    setFilteredInfo(filtered);
    setDisabledRating(true);
  };

  React.useEffect(() => {
    getCollectionData("courses")
      .then((result) => {
        setInfo(result);
        setFilteredInfo(result);
      })
      .then(() => setLoaded(true));
  }, []);

  React.useEffect(() => {
    if (loaded) {
      const array = filteredInfo.map((row) => {
        return createData(
          row.data().title,
          row.data().instructor,
          row.data().length,
          row.data().rating
        );
      });

      setRows(array);
    }
  }, [loaded, filteredInfo]);

  if (!rows) return <div>Loading ...</div>;

  return (
    <Box sx={{ width: "100%", minWidth: "330px" }}>
      <InputLabel
        sx={{
          minWidth: "330px",
          display: "block",
          width: "100%",
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          minWidth: "330px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "500", color: "#f2f2f2" }}
        >
          Filters
        </Typography>
      </InputLabel>
      <Box
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <InputLabel
            id="rating"
            sx={{
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
              minWidth: "155px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "500", color: "#f2f2f2" }}
            >
              Rating (1-5) Stars
            </Typography>
          </InputLabel>
          <Select
            disabled={disabledRating}
            defaultValue={"all"}
            labelId="rating"
            id="rating"
            label="Rating"
            onChange={handleRatingChange}
            sx={{ width: "100%", textAlign: "center" }}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={1}>>One</MenuItem>
            <MenuItem value={2}>>Two</MenuItem>
            <MenuItem value={3}>>Three</MenuItem>
            <MenuItem value={4}>>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
          </Select>
        </Box>

        <Box sx={{ width: "50%" }}>
          <InputLabel
            id="length"
            sx={{
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
              minWidth: "155px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "500", color: "#f2f2f2" }}
            >
              Course Length
            </Typography>
          </InputLabel>
          <Select
            disabled={disabledLength}
            defaultValue={"all"}
            labelId="length"
            id="length"
            label="Length"
            onChange={handleLengthChange}
            sx={{ width: "100%", textAlign: "center" }}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={5}>>5 Hours</MenuItem>
            <MenuItem value={10}>>10 Hours</MenuItem>
            <MenuItem value={15}>>15 Hours</MenuItem>
            <MenuItem value={20}>>20 Hours</MenuItem>
          </Select>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ minWidth: "330px" }}>
        <Table sx={{ minWidth: "330px" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell align="right">Insturctor</StyledTableCell>
              <StyledTableCell align="right">Length&nbsp;(HR)</StyledTableCell>
              <StyledTableCell align="right">Rating&nbsp;(0-5)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.instructor}
                </StyledTableCell>
                <StyledTableCell align="right">{row.length}</StyledTableCell>
                <StyledTableCell align="right">{row.rating}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StatPage;
