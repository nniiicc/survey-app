import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import axios from 'axios';

const Survey = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    setRepos(response.data);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
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
          </tr>
        </thead>
        <tbody>
          {repos.map((repo, index) => (
            <tr key={repo.id}>
              <td>{index + 1}</td>
              <td>{repo.name}</td>
              <td><a href={repo.html_url} target="_blank" rel="noreferrer">{repo.html_url}</a></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Survey;
