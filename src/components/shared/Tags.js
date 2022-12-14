import React from "react";
import { useState, useLocation } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import '../../style.css'
export default function Tags() {
    const [value, setValue] = useState("React");
    const [tags, setTags] = useState([])
    


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
    "css",
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
    "html",
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
    <Dropdown.Item key={item} eventKey={item}>{item}</Dropdown.Item>
  ));

  return (
    <>
    
        {tagDropDownItems}   
     
    </>
  );
}
