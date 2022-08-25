import React from "react";
import { useState, useLocation } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { getAllDevelopers } from "../../api/developers";
import "../../style.css";
export default function Devs() {
  const [value, setValue] = useState("React");
  const [tags, setTags] = useState([]);
  const [developers, setDevelopers] = useState(null);
 let developerDropDownItems
//   const handleSelect = (e) => {
//     console.log(e);
//     setTags((current) => [...current, e]);
//     console.log(tags);
    
//   };

  getAllDevelopers()
    .then(res => {
        setDevelopers(res.data.developers)
        console.log(developers)
        developerDropDownItems = developers.map((item) => (
            <Dropdown.Item eventKey={item._id}>{item._id}</Dropdown.Item>
          ));
    })
    .catch(err => {
        console.log(err)
    })
    //console.log(developers)



  return (<>{developerDropDownItems}</>);
}
