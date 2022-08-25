import React from "react";
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { getAllDevelopers } from "../../api/developers";
import "../../style.css";
export default function Devs() {

  const [developersItems, setDevelopersItems] = useState([]);

useEffect(() => {
  getAllDevelopers()
    .then((res) => {
      setDevelopersItems(res.data.developers);
      console.log(developersItems);
    })
    .catch((err) => {
      console.log(err);
    });
}, [])
  const developerDropDownItems = developersItems.map((item) => (
    <Dropdown.Item 
      eventKey={[item._id, item.name]}
      key={item._id}
    
    >{item.name}</Dropdown.Item>
  ));

  return <>{developerDropDownItems}</>;
}
