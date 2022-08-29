import { useState, useRef, useEffect } from "react";
import { Form, Button, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
// import axios from "axios";
import "../../style.css";
import { createUrl } from "../../api/aws";
import { createProject } from "../../api/projects";
import {
  addProjectToDev,
} from "../../api/developers";
import {
  createProjectSuccess,
  createProjectFailure,
  errorUploadingImage,
  errorFindingDev,
} from "../shared/AutoDismissAlert/messages";
import Tags from "../shared/Tags";
import Devs from "./Devs";
import "../../style.css";
import Autocomplete from "../shared/Tags";

const ProjectForm = ({ heading, user, msgAlert }) => {
  //   const [image, setImage] = useState({ preview: "", raw: "" });
  const [value, setValue] = useState("React");
  const [tags, setTags] = useState([]);
  const [devs, setDevs] = useState([]);
  const [devName, setDevName] = useState([]);
  const [devId, setDevId] = useState([]);

  const handleSelect = (e) => {
    console.log(e);
    setTags((current) => [e, ...current]);
    console.log(tags);
    // setValue(e);
    // console.log(e)
  };
  const handleSelectDevs = (e) => {
    console.log("E from drop down menu", e);
    //let devId = e.split(",")[0]
    setDevs((current) => [e, ...current]);

    // console.log(e)
  };

  useEffect(() => {
    setDevId(
      devs.map((i) => {
        return i.split(",")[0];
      })
    );
  }, [devs]);

  useEffect(() => {
    setDevName(
      devs.map((i) => {
        return i.split(",")[1];
      })
    );
  }, [devs]);
  //let dev = null // add to state?
  const formStyle = {
    color: "black",
    textAlign: "center",
    position: "absolute",
    zIndex: "2",
    width: "45%",
    marginLeft: "30%",
  };

  const [file, setFile] = useState();
  const [loading, setLoading] = useState(null);
  const [dev, setDev] = useState(null);
  const navigate = useNavigate();

  const myUrl = useRef("");
  const [project, setProject] = useState({
    name: "",
    description: "",
    tags: [],
    deployment: "",
    img: "",
    front_end_repo: "",
    back_end_repo: "",
    developers: [],
  });

  console.log("WHAT AM I EVEN DOING HERE?!", project);

  function handleChangeFile(event) {
    console.log("IM AM IN THE FILE UPLOAD FUNCTION");
    setFile(event.target.files[0]);
  }

  function handleChange(e) {
    // CS data structure - tree - for the autocomplete

    setProject((prevProject) => {
      //let updatedValue = null
      let updatedValue = e.target.value;
      updatedValue =
        updatedValue.charAt(0).toUpperCase() + updatedValue.slice(1);
      const updatedName = e.target.name;

      //console.log('this is the input type', e.target.type)
      // if (updatedName === "developers") {
      //   getOneDevByName(updatedValue)
      //     .then((res) => {
      //       console.log("RES.DATA from getOneDevByName", res.data.developer);
      //       setDev(res.data.developer._id);
      //       console.log("THIS IS updatedValue IN GETONEDEV======>>>\n", dev);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       msgAlert({
      //         heading: "Error",
      //         message: errorFindingDev,
      //         variant: "danger",
      //       });
      //     });
      // } else if (updatedName === tags){

      // }

      const updatedProject = {
        [updatedName]: updatedValue,
      };
      return {
        ...prevProject,
        ...updatedProject,
        //developers: dev
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // If this is acting out comment out from here====>>>>
    console.log("IN THE HANDLE SUBMIT BEFORE FORMDATA");
    const data = new FormData();
    data.append("upload", file);
    setLoading(true);
    createUrl(data)
      .then((res) => {
        console.log("FIRST THEN IN CREATE URL=====================", project);
        myUrl.current = res.data.upload.url;
        const image = myUrl.current;
        console.log("THIS IS DEV===========>>>\n", image);

        const newProject = {
          ...project,
          img: image,
          developers: devId, // dev is undefined
          tags: tags,
        };

        console.log("ARE WE THERE YET", newProject);
        let newDev = {
          projects: dev,
        };
        createProject(user, newProject)
          .then((res) => {
            console.log(
              "FIRST THEN IN CREATE PROJECT================",
              project,
              "RES FROM CREATE\n",
              res
            );
            console.log("DEV ID GOING IN\n", devId);
            addProjectToDev(user, res.data.project._id, devId)
              .then((developer) => {
                console.log("DEVELOPER", developer);
              })
              .catch((err) => {
                console.log(err);
                msgAlert({
                  heading: "Error",
                  message: errorFindingDev,
                  variant: "danger",
                });
              });
            navigate(`/projects/${res.data.project._id}`);
          })
          .then(() =>
            msgAlert({
              heading: "oh yea!",
              message: createProjectSuccess,
              variant: "success",
            })
          )
          .catch(() =>
            msgAlert({
              heading: "oh no!",
              message: createProjectFailure,
              variant: "danger",
            })
          );
      })
      .then(() => setLoading(true))
      .catch((err) => {
        console.log(err);
        msgAlert({
          heading: "Error",
          message: errorUploadingImage,
          variant: "danger",
        });
      });
  }
  console.log(project);

  return (
    <div className="row" id="projectForm" style={formStyle}>
      <div className="col-sm col-md col-lg col-xl mx-auto mt-5">
        <h3 style={{ color: "white" }} id="projectFormHeading">
          {heading}
        </h3>
        <Form className="cards" onSubmit={handleSubmit}>
          <br />
          <Form.Control
            placeholder="Project name"
            name="name"
            id={project._id}
            value={project.name}
            onChange={handleChange}
            className="mt-2"
            style={{ textAlign: "center" }}
          />
          <div id="tagField" style={{ marginBottom: "3px" }}>
            <Form.Control
              placeholder="Tags"
              name="tags"
              id={project._id}
              value={tags}
              className="mt-2"
              style={{ textAlign: "center" }}
            ></Form.Control>
            <Dropdown>
              <DropdownButton
                style={{ marginTop: "8px" }}
                onSelect={handleSelect}
              >
                <Tags />
              </DropdownButton>
            </Dropdown>
          </div>
          <div id="tagField">
            <Form.Control
              placeholder="Developers"
              name="developers"
              id={project._id}
              value={devId}
              className="mt-2"
              style={{ textAlign: "center", display: "none" }}
            ></Form.Control>
            <Form.Control
              placeholder="Developers"
              type={"text"}
              value={devName}
              style={{ textAlign: "center", marginTop: "5px" }}
            ></Form.Control>
            <Dropdown>
              <DropdownButton
                style={{ marginTop: "8px" }}
                onSelect={handleSelectDevs}
              >
                <Devs />
              </DropdownButton>
            </Dropdown>
          </div>
          <Form.Control
            placeholder="Description"
            name="description"
            id={project._id}
            value={project.description}
            onChange={handleChange}
            className="mt-2"
            style={{ textAlign: "center" }}
          />
          <Form.Control
            placeholder="Front End Repo"
            name="front_end_repo"
            id={project._id}
            value={project.front_end_repo}
            onChange={handleChange}
            className="mt-2"
            style={{ textAlign: "center" }}
          />
          <Form.Control
            placeholder="Back End Repo"
            name="back_end_repo"
            id={project._id}
            value={project.back_end_repo}
            onChange={handleChange}
            className="mt-2"
            style={{ textAlign: "center" }}
          />
          {/* <Form.Control
            placeholder="Developers"
            name="developers"
            id={project._id}
            value={project.developers}
            //onChange={handleChange}
            className="mt-2"
            style={{ textAlign: "center" }}
          /> */}

          <Form.Group controlId="formFileLg" className="mt-2">
            {/* <Form.Label>Image</Form.Label> */}
            <Form.Control
              type="file"
              size="md"
              style={{ textAlign: "center" }}
              onChange={handleChangeFile}
            />
          </Form.Group>
          {/* <Button onClick={handleUpload}>Upload</Button> */}
          <Button type="submit" className="mt-3" size="sm" color="pink">
            Submit
          </Button>
          {/* <Autocomplete theme={{color: "black"}}/> */}
        </Form>
      </div>
    </div>
  );
};

export default ProjectForm;