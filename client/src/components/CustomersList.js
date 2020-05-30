import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import AddItemModal from './AddItemModal';

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    async function fetchCustomers() {
      const customersJSON = await window.fetch('/api/v1/customers')
      setCustomers(await customersJSON.json());
    }
    fetchCustomers();
  }, []);

  const buildRows = (item) => (
    <tr key={ item.id }>
      <td>{ item.name }</td>
    </tr>
  );

  const tableRows = customers.map(buildRows);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }

        </tbody>

        {/* <tfoot>
          <tr>
            <td colSpan='1'>
              <Button onClick={ () => setShowAdd(true) }>Add Customer</Button>
            </td>
          </tr>
        </tfoot> */}
      </Table>
      <AddItemModal
        show={showAdd}
        handleClose={ () => setShowAdd(prev => !prev) }
      />
    </Container>
  );
};

export default CustomersList;