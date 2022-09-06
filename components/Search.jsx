import { Button, Box, TextField } from "@mui/material";

const Search = ({ setSearchTerm }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <TextField
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        name="search"
        label="Search Courses"
        InputProps={{ inputProps: {} }}
        id="rating"
        sx={{
          backgroundColor: "#78787835",
          width: "40%",
          marginBottom: "5%",
          minWidth: "330px",
          border: "0.2px solid #6a6a6a",
          borderRadius: "5px",
          boxShadow: "12px 13px 30px 1px rgba(0,0,0,0.17)",
        }}
      />
      {/* <Button
        type="submit"
        variant="contained"
        sx={{ height: "54px", marginLeft: "10px" }}
      >
        Search
      </Button> */}
    </Box>
  );
};

export default Search;
