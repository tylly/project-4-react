import React from "react";
import { useState, useLocation } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import '../../style.css'
export default function Tags() {
    const [value, setValue] = useState("React");
    const [tags, setTags] = useState([])
    
    const handleSelect = (e) => {
      console.log(e);
      setTags(current => [...current, e]);
      console.log(tags)
    };

  let Tags = [
    "angular",
    "apple",
    "adobe",
    "apache",
    "axios",
    "bash",
    "c",
    "c-",
    "c#",
    "c++",
    "canvas",
    "curl",
    "c shell",
    "dart",
    "database",
    "django",
    "express",
    "firebase",
    "git",
    "github",
    "go",
    "go!",
    "google",
    "java",
    "javascript",
    "leetcode",
    "lodash",
    "mern",
    "mongodb",
    "mongoose",
    "nesl",
    "net.data",
    "node",
    "opal",
    "python",
    "python3",
    "pipenv",
    "react",
    "scratch",
    "script.net",
    "sql",
    "swift",
    "typescript",
    "visual studio",
    "vue",

  ];

  let tagDropDownItems = Tags.map((item) => (
    <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
  ));

  return (
    <>
    
        {tagDropDownItems}   
     
    </>
  );
}
