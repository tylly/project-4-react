import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import "../../style.css";

import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingScreen from "../shared/LoadingScreen";
import {
  getOneProject,
  updateProject,
  removeProject,
} from "../../api/projects";
import messages from "../shared/AutoDismissAlert/messages";
// import EditDestinationModal from "./EditDestinationModal";
// import NewActivityModal from "../activities/NewActivityModal";
// import SearchActivityModal from "../activities/SearchActivityModal";
// import ShowActivity from "../activities/ShowActivity";
import axios from "axios";

// We need to get the destination's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the activity cards
const cardContainerLayout = {
  display: "flex",
  justifyContent: "center",
};

const ShowProject = (props) => {
  const [project, setProject] = useState(null);
  //   const [activityModalShow, setActivityModalShow] = useState(false);
  //   const [editModalShow, setEditModalShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  //   const [searchActivityModalShow, setSearchActivityModalShow] = useState(false);
  console.log(props);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, msgAlert } = props;

  useEffect(() => {
    getOneProject(id)
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
        //navigate back to the home page if there's an error fetching
      });
  }, [updated]);

  const removeTheProject = () => {
    removeProject(user, project._id)
      // on success send a success message
      .then(() => {
        msgAlert({
          heading: "Success",
          message: messages.removeProjectSuccess,
          variant: "success",
        });
      })
      // then navigate to index
      .then(() => {
        navigate("/");
      })
      // on failure send a failure message
      .catch((err) => {
        msgAlert({
          heading: "Error removing project",
          message: messages.removeProjectFailure,
          variant: "danger",
        });
      });
  };

  if (!project) {
    return <LoadingScreen />;
  }




  return (
    <>
      <Container className="fluid" style={{ marginTop: "10%" }}>
        <Card
          //style={{ width: "30rem", zIndex: "2" }}
          className="mx-auto mt-4"
          id="card"
        >
          <Card.Body>
            <Card.Text>
              <h1 style={cardContainerLayout}>{project.name}</h1>
              
            </Card.Text>

          </Card.Body>
        </Card>
       
      </Container>

      {/* <EditDestinationModal
        user={user}
        destination={destination}
        show={editModalShow}
        updateDestination={updateDestination}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated((prev) => !prev)}
        handleClose={() => setEditModalShow(false)}
      />
      <NewActivityModal
        user={user}
        destination={destination}
        show={activityModalShow}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated((prev) => !prev)}
        handleClose={() => setActivityModalShow(false)}
      />
      <SearchActivityModal
        user={user}
        destination={destination}
        show={searchActivityModalShow}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated((prev) => !prev)}
        handleClose={() => setSearchActivityModalShow(false)}
      /> */}
    </>
  );
};

export default ShowProject;
