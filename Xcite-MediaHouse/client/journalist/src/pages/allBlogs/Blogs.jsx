import React from "react";
import "./Blogs.scss";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import { Button, Modal, Stepper, Step, StepLabel } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import GetInputContainer from "./GetInputContainer";
import ReviewContainer from "./ReviewContainer";
import { toast } from "react-toastify";

const theme = createTheme({
  palette: {
    primary: blue,
  },
});
const styleviewBlog = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  overflow: "hidden",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  height: 85vh;
  width: 60vw;
  transform: translate(30%, 10%);
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Center = styled.div`
  height: 50%;
  flex: 20;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Bottom = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  padding: 1rem;
`;

const steps = ["Create", "Review", "Publish"];

const SuccessPublish = styled.h2`
  font-weight: 300;
`;
const Blogs = () => {
  const [showModal, setShowModal] = useState(false);
  const [curStep, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [blogtitle, setBlogTitle] = useState("");
  const [blogdesc, setBlogdesc] = useState("");
  const [models, setModels] = useState(false);
  const [tempimgSrc, setTempImgSrc] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState("Others");
  const [tagData, setTagData] = useState(["Others", "news", "war"]);
  const [imgData, setImgData] = useState({
    filename: "",
    url: "",
  });
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const jounIds = userInfo.id;
  useEffect(() => {
    console.log(title);
    console.log(description);
    console.log(body);
    console.log(type);
    console.log(tagData);
    console.log(imgData.url);
  });
  const types = ["Others", "Sports", "War"];

  const pushTag = (tag) => {
    setTagData((prev) => [...prev, tag]);
  };

  const handleImgData = (data) => {
    setImgData(data);
  };

  const handleDelete = (data) => {
    setTagData((prevData) => prevData.filter((element) => element !== data));
  };

  const handleOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const changeHandler = (event) => {
    switch (event.target.id) {
      case "title":
        setTitle(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      case "body":
        setBody(event.target.value);
        break;
      case undefined: // undefined denotes type
        setType(event.target.value);
        break;
      default:
        console.log("nothing is getting set");
    }
  };

  const handleClose = () => {
    // reset the blog data and set the step state to 0
    setModels(false);
    handleModalClose();
    setStep(0);
    setTitle("");
    setDescription("");
    setBody("");
    setType("Others");
    setTagData([]);
    setImgData({ filename: "", url: "" });
  };

  const [Blogdata, SetBlogdata] = useState([]);
  const dispatch = useDispatch();

  // Get Token From REdux
  const token = useSelector((state) => state.userAuth.success);
  const createBlog = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/blog/createBlog",
      data: {
        jounId: jounIds,
        image: imgData.url,
        title: title,
        description: description,
        body: body,
        type: type,
        tags: tagData,
      },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((res) => {
      console.log("created");
      toast("blog created successfully");
      handleClose();
    });
  };

  const latestBlogs = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:8080/api/v1/blog/allBlogs",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((res) => {
      const myrepo = res.data.data;
      SetBlogdata(myrepo);
    });
  };
  const getImg = (imgSrc, title, description) => {
    setTempImgSrc(imgSrc);
    setBlogTitle(title);
    setBlogdesc(description);
    setModels(true);
  };
  useEffect(() => latestBlogs(), []);

  return (
    <div className="blogs">
      <Sidebar />
      <div className="BlogContainer">
        <Navbar />
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            onClick={handleOpen}
            color="primary"
            style={{
              position: "fixed",
              right: 50,
              bottom: 20,
              zIndex: "20",
              width: "80px",
              height: "80px",
              borderRadius: "50px",
            }}
          >
            <AddIcon />
          </Button>
          <Modal open={showModal} onClose={handleModalClose}>
            <Container>
              <Top>
                <Stepper activeStep={curStep}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Top>
              <Center>
                {curStep === 0 && (
                  <GetInputContainer
                    props={{
                      title,
                      description,
                      body,
                      changeHandler,
                      type,
                      types,
                      tagData,
                      handleDelete,
                      pushTag,
                      imgData,
                      handleImgData,
                    }}
                  />
                )}
                {curStep === 1 && (
                  <GetInputContainer
                    props={{
                      title,
                      description,
                      body,
                      changeHandler,
                      type,
                      types,
                      disabled: true,
                      tagData,
                      imgData,
                    }}
                  />
                )}
                {curStep === 2 && (
                  <ReviewContainer
                    props={{
                      imgData,
                      title,
                      description,
                      body,
                      type,
                      tagData,
                    }}
                  />
                )}
                {curStep === 3 && (
                  <SuccessPublish>The blog has been published!</SuccessPublish>
                )}
              </Center>
              <Bottom>
                {curStep !== 0 && curStep !== 3 && (
                  <Button onClick={handlePrev}>Back</Button>
                )}
                {curStep !== 3 && (
                  <Button variant="contained" onClick={handleNext}>
                    {curStep === 2 ? "Publish" : "Next"}
                  </Button>
                )}
                {curStep === 3 && (
                  <Button variant="contained" onClick={createBlog}>
                    Close
                  </Button>
                )}
              </Bottom>
            </Container>
          </Modal>
        </ThemeProvider>
        <div className="top">
          <ImageList
            sx={{
              width: "90%",
              height: 1200,
              marginLeft: "20px",
            }}
          >
            <ImageListItem key="Subheader" cols={5}>
              <ListSubheader
                component="div"
                style={{
                  fontSize: "25px",

                  fontWeight: "bold",
                }}
                className="title"
              >
                Recent Blogs
              </ListSubheader>
            </ImageListItem>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={models}
                onClose={() => handleClose()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={models}>
                  <Box sx={styleviewBlog}>
                    <img src={tempimgSrc} style={{}} />
                    <CloseIcon
                      style={{
                        color: "red",
                        position: "absolute",
                        top: "1%",
                        right: "1%",
                      }}
                      onClick={() => setModels(false)}
                    />
                    <Typography
                      id="transition-modal-description"
                      sx={{ mt: 2 }}
                    >
                      <b> {blogtitle}</b>
                    </Typography>
                    <Typography
                      id="transition-modal-description"
                      sx={{ mt: 2 }}
                    >
                      {blogdesc}
                    </Typography>
                  </Box>
                </Fade>
              </Modal>
            </div>
            {Blogdata.map((item) => (
              <ImageListItem
                key={item.blogInfo._id}
                onClick={() =>
                  getImg(
                    item.blogInfo.image,
                    item.blogInfo.title,
                    item.blogInfo.description
                  )
                }
              >
                <img
                  src={`${item.blogInfo.image}?w=2148&fit=crop&auto=format`}
                  srcSet={`${item.blogInfo.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.blogInfo.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.blogInfo.title}
                  subtitle={item.author}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.title}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
