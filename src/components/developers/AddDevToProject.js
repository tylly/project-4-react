import { useState, useEffect } from "react";
import { getOneDevByName } from "../../api/developers"
import { addProjectToDev } from "../../api/developers";
import messages from "../shared/AutoDismissAlert/messages";
import {
    Form,
    Button,
    DropdownButton,
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Devs from "../shared/Devs";
import { addDevToProject } from "../../api/projects";

function AddDevToProject({user, msgAlert, triggerRefresh, onModalClose, project}) {         
    const [devs, setDevs] = useState([])
    const [dev, setDev] = useState([])
    const [devName, setDevName] = useState([]);
    const [devId, setDevId] = useState([]);
    
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

    const handleAddDevToProject = () => {
        
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        // If this is acting out comment out from here====>>>>
        console.log("IN THE HANDLE SUBMIT BEFORE FORMDATA");
          
        let newDev = {
            projects: dev,
        };
        console.log('devid============>>>', devId)
        addProjectToDev(user, project._id, devId)
            .then(() => {
              msgAlert({
                heading: 'Success',
                message: 'Success adding',
                variant: 'success'
              })
              addDevToProject(user, project._id, devId)
                .then(() => {
                  onModalClose()
                  triggerRefresh()
                  msgAlert({
                    heading: 'Success',
                    message: messages.successAddingDevToProject,
                    variant: 'success'
                  })
                })
                .catch(err => {
                  console.log(err)
                  msgAlert({
                    heading: 'Error',
                    messahe: 'Error adding developer to project'
                  })
                })
            })
            .catch((err) => {
            console.log(err);
            msgAlert({
                heading: "Error",
                message: 'error adding project to developer',
                variant: "danger",
            });
            });

    }   

    const formStyle = {
        // color: "black",
        // textAlign: "center",
        // position: "absolute",
        // zIndex: "2",
        // width: "45%",
        // marginLeft: "30%",
      };

    return (
      <>
        <div className="row" id="projectForm" style={formStyle}>
          <div className="col-sm col-md col-lg col-xl mx-auto mt-5">
            <h4 style={{ color: "white" }} id="projectFormHeading">
              Add a developer to the project
            </h4>
            <Form className="cards" onSubmit={handleSubmit}>
              <div id="tagField">
                <Form.Control
                  placeholder="Developers"
                  name="developers"
                  id={project._id}
                  value={dev._id}
                  className="mt-2"
                  style={{ textAlign: "center", display: "none" }}
                ></Form.Control>
                <Form.Control
                  placeholder="Slime"
                  type={"text"}
                  value={devName}
                  style={{ textAlign: "center", marginTop: "5px" }}
                ></Form.Control>
                {/* <input id='projInput' placeholder="Slime" type={"text"} value={devName}></input> */}
                <Dropdown>
                  <DropdownButton
                    style={{ marginTop: "8px" }}
                    onSelect={handleSelectDevs}
                  >
                    <Devs />
                  </DropdownButton>
                </Dropdown>
              </div>

              <Button type="submit" className="mt-3" size="sm" color="pink">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </>
    );

}
export default AddDevToProject