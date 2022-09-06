import { Typography, Box, Container, Divider, Chip } from "@mui/material";

const AboutPage = () => {
  return (
    <Container
      sx={{
        backgroundColor: "#ffffff21",
        borderRadius: "20px",
        paddingBottom: "50px",
        marginTop: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          color="primary"
          variant="h2"
          align="center"
          margin="auto"
          marginTop="50px"
          sx={{
            fontFamily: "monospace",
            fontWeight: 500,
            letterSpacing: ".4rem",
          }}
        >
          Course Feedback
        </Typography>
        <Typography
          color="primary"
          variant="h6"
          align="center"
          margin="auto"
          marginTop="50px"
          sx={{
            fontFamily: "monospace",
            fontWeight: 500,
            letterSpacing: ".4rem",
          }}
        >
          A project by: Izat Alawi
        </Typography>
        <Typography
          color="primary"
          variant="h6"
          align="center"
          margin="auto"
          marginTop="50px"
          sx={{
            fontFamily: "monospace",
            fontWeight: 400,
            letterSpacing: ".2rem",
          }}
        >
          <Divider sx={{ marginBottom: "15px", marginTop: "15px" }}>
            <Chip
              label="Technologies Used"
              sx={{
                marginBottom: "15px",
                marginTop: "15px",
                fontWeight: 500,
                letterSpacing: ".3rem",
                fontFamily: "monospace",
                fontSize: "0.8rem",
              }}
            />
          </Divider>
          React JS, Next JS, Firebase, Material UI, and Vercel
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
