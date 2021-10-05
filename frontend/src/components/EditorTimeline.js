import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Col, Row, Table } from "antd";
import axios from "axios";

const EditorTimeline = () => {
  const [timelineSection, setTimelineSection] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const fetchTimelineData = async () => {
      await axios
        .get("http://localhost:6500/grid/api/guest/getTimeline")
        .then((res) => {
          setTimelineData(res.data.allNews);
        })
        .catch((err) => {
          alert("Error! " + err);
        });
    };
    fetchTimelineData();
  }, []);

  const addTimelineHandler = async () => {};
  const updateTimelineHandler = async () => {};
  const removeTimelineHandler = async (id) => {
    alert(id);
  };

  const timelineColumns = [
    {
      title: "Notice Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: " ",
      dataIndex: "",
      key: "actions",
      render: (item) => (
        <Button
          variant="danger"
          onClick={() => {
            removeTimelineHandler(item._id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  return (
    <div>
      <h1>Timeline</h1>
      <div style={{ marginTop: "4vh" }}>
        <Row>
          <ListGroup horizontal defaultActiveKey="#link1">
            <ListGroup.Item
              href="#link1"
              onClick={() => {
                setTimelineSection(1);
              }}
            >
              Add New
            </ListGroup.Item>
            <ListGroup.Item
              href="#link2"
              onClick={() => {
                setTimelineSection(2);
              }}
            >
              Update/Delete
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <Row style={{ marginTop: "4vh" }}>
          {timelineSection === 1 && (
            <div>
              <Form onSubmit={addTimelineHandler}>
                <Form.Row>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Timeline Event Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Event Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <Button variant="warning" type="submit">
                  Add
                </Button>
              </Form>
            </div>
          )}
          {timelineSection === 2 && (
            <div>
              <Table
                style={{ width: "50vw" }}
                size="medium"
                columns={timelineColumns}
                dataSource={timelineData}
              />
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default EditorTimeline;
