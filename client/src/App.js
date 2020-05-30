import React from 'react';
import { Container, Row, Col, Navbar, Alert } from 'react-bootstrap';

import './App.css';
import OrdersList from './components/OrdersList';
import CreateOrder from './components/CreateOrder';
import ProductsList from './components/ProductsList';
import CustomersList from './components/CustomersList';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" variant="light" style={{'marginBottom': '40px'}}>
        <Navbar.Brand>Orders on Rails</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="http://www.github.com/spencerhutch" target='_blank' rel="noopener noreferrer">Spencer Hutchinson</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>


      <Container fluid>
        <Row>
          <Col lg="9">
            <Alert variant={ 'secondary' }>
              Click on an order to Cancel/Submit or update products.
            </Alert>
            <Row>
              <Col><h2>Orders</h2></Col>
              <Col><CreateOrder /></Col>
            </Row>
            <OrdersList />
          </Col>
          <Col>
          <Container fluid>
            <Row>
              <Col>
                <CustomersList/>
              </Col>
            </Row>
            <Row>
              <Col>
                <ProductsList/>
              </Col>
            </Row>
          </Container>
          </Col>
        </Row>
      </Container>

      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />
    </div>
  );
}

export default App;
