import { Typography, Paper, Box, Container } from "@mui/material";

export default function PageFooter() {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 160px)",
        width: "100%",
        bottom: 0,
        backgroundColor: "#ffb703",
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}
        >
          <div>
            <Typography
              variant="subtitle1"
              align="center"
              component="p"
              sx={{
                mr: 2,
                fontWeight: 600,
                letterSpacing: ".2rem",
              }}
            >
              Course Feedback
            </Typography>
          </div>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            align="center"
            component="p"
            sx={{
              mr: 2,
              fontWeight: 400,
              letterSpacing: ".2rem",
            }}
          >
            Copyright ©2022
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
