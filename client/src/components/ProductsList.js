import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productsJSON = await window.fetch('/api/v1/products')
      setProducts(await productsJSON.json());
    }
    fetchProducts();
  }, []);

  const buildRows = (item) => (
    <tr key={ item.id }>
      <td>{ item.name }</td>
      <td>{ item.cost }</td>
    </tr>
  );

  const tableRows = products.map(buildRows);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
        {/* <tfoot>
          <tr>
            <td colSpan='2'>
              <Button>Add Product</Button>
            </td>
          </tr>
        </tfoot> */}
      </Table>
    </Container>
  );
};

export default ProductsList;