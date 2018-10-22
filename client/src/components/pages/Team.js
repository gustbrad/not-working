import React from "react";
import Row from "../Grid/Row";
import Col from "../Grid/Col";
import Button from "../Grid/Button"
import "./Team.css";

const Team = () => (
  <div className="content">
    <Row>
      <Col size="sm-12">
        <h1>Our Team</h1>
      </Col>
    </Row>
    <Row id="team-title">
      <Col size="sm-3">
        Team Member
      </Col>
      <Col size="sm-6">
        Biography
      </Col>
      <Col size="sm-1">
        Github
      </Col>
      <Col size="sm-1">
        Portfolio
      </Col>
      <Col size="sm-1">
      </Col>
    </Row>
    <Row>
      <Col size="sm-3">
        Bradley Gust
      </Col>
      <Col size="sm-6">
        Biography
      </Col>
      <Col size="sm-1">
        <a href="https://github.com/gustbrad">
          <Button label="Github" className="team-submit">
          </Button>
        </a>
      </Col>
      <Col size="sm-1">
        <a href="https://gustbrad.github.io/Bootstrap-Portfolio">
          <Button label="Portfolio" className="team-submit">
          </Button>
        </a>
      </Col>
      <Col size="sm-1">
      </Col>
    </Row>
    <Row>
      <Col size="sm-3">
        Jonathan Hake
      </Col>
      <Col size="sm-6">
        Biography
      </Col>
      <Col size="sm-1">
        <a href="https://github.com/JonHake18">
          <Button label="Github" className="team-submit">
          </Button>
        </a>
      </Col>
      <Col size="sm-1">
        <a href="https://jonhake18.github.io/Updated-Portfolio/">
          <Button label="Portfolio" className="team-submit">
          </Button>
        </a>
      </Col>
      <Col size="sm-1">
      </Col>
    </Row>
    <Row>
      <Col size="sm-3">
        Matthew Kelly
      </Col>
      <Col size="sm-6">
        Biography
      </Col>
      <Col size="sm-1">
        <a href="https://github.com/matt75kelly">
          <Button label="Github" className="team-submit">
          </Button>
        </a>
      </Col>
      <Col size="sm-1">
        <a href="https://matt75kelly.github.io/Responsive-Portfolio/">
          <Button label="Portfolio" className="team-submit">
          </Button>
        </a>
      </Col>
      <Col size="sm-1">
      </Col>
    </Row>
  </div>
);

export default Team;