import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Col } from "antd";
import FileBase from "react-file-base64";
import axios from "axios";

const EditorTemplates = () => {
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState("");
  const templateHandler = async () => {
    if (fileType === "pdf") {
      const postObj = { encPDF: file };
    }
    if (fileType === "ppt") {
      const postObj = { encPPT: file };
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "4vh" }}>Upload Templates</h1>
      <Form onSubmit={templateHandler}>
        <Form.Group as={Col} md={24}>
          <Form.Check
            type="radio"
            required={true}
            label="PDF"
            onClick={() => {
              setFileType("pdf");
            }}
            name="formHorizontalRadios"
          />
          <Form.Check
            type="radio"
            required={true}
            label="PPT"
            onClick={() => {
              setFileType("ppt");
            }}
            name="formHorizontalRadios"
          />
          <Form.Label>Template:&nbsp;</Form.Label>
          <div style={{ marginBottom: "4vh" }}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setFile(base64);
              }}
            />
          </div>
          <Button variant="warning" type="submit">
            Upload
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditorTemplates;
