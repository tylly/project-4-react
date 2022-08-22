// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from "./components/shared/AutoDismissAlert/AutoDismissAlert";
import Header from "./components/shared/Header";
import RequireAuth from "./components/shared/RequireAuth";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import ChangePassword from "./components/auth/ChangePassword";
//import { ShowAllDevelopers, ShowDeveloper} from './components/developers'
//import { CreateProject, EditProjectsModal, ProjectsIndex, ShowAuthProject, ShowProject, ShowAllProjects } from './components/projects'
//  import ProjectsIndex from './components/projects/EditProjectsModal'
import ProjectIndex from "./components/projects/ShowAllProjects";
import ShowProject from "./components/projects/ShowProject";
import ShowAllDevelopers from "./components/developers/ShowAllDevelopers";
import ShowDeveloper from "./components/developers/ShowDeveloper";
import CreateProjects from "./components/projects/CreateProjects";
import ProjectForm from "./components/shared/ProjectForm";
//import { CreateProject, EditProjectsModal, ProjectsIndex, ShowAuthProject, ShowProject, ShowAllProjects } from './components/projects'
//import CreateProject from './components/projects/CreateProjects'
//import EditProjectsModal from './component/projects/EditProjectsModal'
//import ProjectsIndex from './component/projects/ProjectsIndex'

const App = () => {
  const [user, setUser] = useState(null);
  const [msgAlerts, setMsgAlerts] = useState([]);
  const MyContext = React.createContext;
  console.log("user in app", user);
  console.log("message alerts", msgAlerts);
  const clearUser = () => {
    console.log("clear user ran");
    setUser(null);
  };

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return prevState.filter((msg) => msg.id !== id);
    });
  };

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    setMsgAlerts(() => {
      return [{ heading, message, variant, id }];
    });
  };

  return (
    <Fragment>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home msgAlert={msgAlert} user={user} />} />

        {/* // USER ROUTES */}

        <Route
          path="/sign-up"
          element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path="/sign-in"
          element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path="/sign-out"
          element={
            <RequireAuth user={user}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/change-password"
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />

        {/* // PROJECT ROUTES */}

        {/* // Project index */}
        <Route
          path="/projects"
          element={<ProjectIndex msgAlert={msgAlert} user={user} />}
        />

        {/* // Project Create */}
        <Route
          path="/projects/create-project"
          element={
            <RequireAuth user={user}>
              <ProjectForm 
              msgAlert={msgAlert} 
              user={user}
              heading={"where to?"} />
            </RequireAuth>
          }
        />

        {/* // Project show specific */}
        <Route
          path="/projects/:id"
          element={<ShowProject msgAlert={msgAlert} user={user} />}
        />
        {/* // END PROJECT ROUTES */}

        {/* // DEVELOPER ROUTES	 */}

        {/* // Developer index */}
        <Route
          path="/developers/"
          element={<ShowAllDevelopers msgAlert={msgAlert} user={user} />}
        />

        {/* // Developer create */}
        {/* <Route
						path='/developers/create-dev'
						element={ <CreateDeveloper msgAlert={msgAlert} user={user}/> }
					/> */}
        {/* // Developer show specific	 */}
        <Route
			path='/developers/:id'
			element={ 
				<ShowDeveloper 
					msgAlert={msgAlert} 
					user={user}
				/> 
			}
		/>
        {/* // END DEVELOPER ROUTES */}
      </Routes>
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
    </Fragment>
  );
};

export default App;
