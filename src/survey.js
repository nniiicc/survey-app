import React, { useState } from "react";
import { Button, Form, Table, Container, Row, Col} from "react-bootstrap";
import axios from 'axios';
import { CSVLink } from "react-csv";

const Survey = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [csvData, setCsvData] = useState([]);

  const fetchRepos = async () => {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    setRepos(response.data);
  };

  const handleCheckboxChange = (repo) => {
    if (selectedRepos.includes(repo)) {
      setSelectedRepos(selectedRepos.filter((r) => r !== repo));
    } else {
      setSelectedRepos([...selectedRepos, repo]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = selectedRepos.map((repo) => ({
      Name: name,
      Email: email,
      Repository: repo,
    }));
    setCsvData(data);
  };

  return (
    <Container>
    <Row className="justify-content-center">
    <Col xs={12} md={8} lg={6}>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Github Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Github username" value={username} onChange={e => setUsername(e.target.value)} />
        <Button variant="primary" onClick={fetchRepos}>Search for my repositories</Button>
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Repo Name</th>
            <th>Repo URL</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo, index) => (
            <tr key={repo.id}>
              <td>{index + 1}</td>
              <td>{repo.name}</td>
              <td><a href={repo.html_url} target="_blank" rel="noreferrer">{repo.html_url}</a></td>
              <td><Form.Check type="checkbox" onChange={() => handleCheckboxChange(repo.name)} /></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      {csvData.length > 0 && (
        <CSVLink
          data={csvData}
          filename={"survey-data.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          Download survey data
        </CSVLink>
      )}
    </Form>
    </Col>
    </Row>
    </Container>
  );
};

export default Survey;