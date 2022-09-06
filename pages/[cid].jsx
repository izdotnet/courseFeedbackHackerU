import * as React from "react";
import Router, { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import {
  Button,
  TextField,
  Divider,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  CardContent,
} from "@mui/material";
import {
  getDocById,
  updateDocById,
  getCollectionData,
  deleteDocFromDb,
} from "../utils/firebase";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import HoverRating from "../components/Rating";

// const fakeData = {
//   title: "React Course",
//   description: "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
//   img: "https://patterns.dev/img/reactjs/react-logo@3x.svg",
//   instructor: "Ido Paz",
//   length: "20",
//   rating: "10",
//   comments: ["First Comment!", "Second Comment!"],
//   id: 1,
// };

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(360deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.longest,
  }),
}));

const coursePage = ({ data }) => {
  const array = [];
  const route = useRouter();
  const [updatedData, setUpdatedData] = React.useState(data);
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const textRef = React.useRef();

  const cid = route.query.cid;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDocById("courses", cid, { comments: comments }).then(() =>
      setSubmitted(true)
    );
    textRef.current[0].value = "";
  };

  const handleTextChange = (e) => {
    setComments(e.target.value);
  };

  const handleDeleteComment = () => {
    updateDocById("courses", cid, { comments: " " });
    setDeleted(true);
  };

  const handleDeleteCourse = () => {
    console.log("delete");
    deleteDocFromDb("courses", cid);
    Router.push("/");
  };

  React.useEffect(() => {
    const unsubscribe = getDocById("courses", cid).then((doc) =>
      setUpdatedData(doc)
    );
    return () => unsubscribe;
  }, [submitted]);

  return (
    <Card
      sx={{
        backgroundColor: "#939393",
        color: "#1d1d1d",
        margin: "auto",
        marginTop: "25px",
        width: 0.8,
        padding: "15px",
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <DeleteIcon
          onClick={handleDeleteCourse}
          fontSize="large"
          sx={{
            cursor: "pointer",
            position: "absolute",
            right: "0",
            color: "#343434",
            marginRight: "20px",
            marginTop: "10px",
          }}
        />
      </Box>
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: "45px", height: "45px", backgroundColor: "#fcba02" }}
            aria-label="recipe"
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                color: "#343434",
                letterSpacing: "1px",
              }}
            >
              {updatedData.title[0]}
            </Typography>
          </Avatar>
        }
        title={updatedData.title}
        subheader={updatedData.instructor}
      />
      <CardMedia
        component="img"
        height="194"
        image={updatedData.img}
        alt="Course Photo"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {updatedData.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <HoverRating rating={updatedData.rating} />

        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <CommentIcon fontSize="large" />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider sx={{ marginBottom: "15px" }}>My Comments</Divider>

          <Box>
            {updatedData.comments.length > 2 ? (
              <>
                {/* {!deleted && } */}
                {!deleted && (
                  <Box
                    sx={{
                      border: "0.2px solid #6a6a6a",
                      borderRadius: "6px",
                      boxShadow: "12px 5px 30px 1px rgba(0,0,0,0.17)",
                      width: "auto",
                      overflow: "auto",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ display: "inline", margin: "16px 7px" }}
                    >
                      {updatedData.comments}
                    </Typography>
                    <HighlightOffOutlinedIcon
                      onClick={handleDeleteComment}
                      sx={{
                        cursor: "pointer",
                        marginLeft: "3px",
                        color: "#fcba02",
                        fontSize: "medium",
                      }}
                    />
                  </Box>
                )}
              </>
            ) : (
              <Typography>No comments yet</Typography>
            )}
          </Box>
        </CardContent>
        <CardContent>
          <form ref={textRef}>
            <TextField
              fullWidth
              label="comment"
              id="comment"
              onChange={handleTextChange}
            />
            <Button
              onClick={handleSubmit}
              type="submit"
              color="primary"
              size="small"
              variant="contained"
              sx={{
                width: "100%",
                margin: "auto",
                marginBottom: "10px",
                fontWeight: "500",
              }}
            >
              {updatedData.comments.length > 2 && !deleted
                ? "Edit Comment"
                : "Submit Comment"}
            </Button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default coursePage;

export async function getStaticProps({ params }) {
  const cid = params.cid;
  const data = await getDocById("courses", cid);
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths({ params }) {
  const data = await getCollectionData("courses");
  const ids = data.map((element) => element.id);
  const pathsWithParams = ids.map((id) => ({ params: { cid: id } }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
}
