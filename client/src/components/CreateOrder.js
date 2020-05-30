import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import AddItemModal from './AddItemModal';
import FindProductsSelect from './FindProductsSelect';

function CreateOrder() {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function fetchCustomers() {
      const customersJSON = await window.fetch('/api/v1/customers')
      setCustomers(await customersJSON.json());
    }
    fetchCustomers();
  }, []);

  const buildCustomersOptions = () => {
    return customers.map((cus) => (
      {value: cus.id, label: cus.name}
    ));
  }

  const handleSave = async () => {
    const requestBody = {
        customer_id: selectedCustomer.value,
        products: selectedProducts.map((i) => i.value)
    };
    await fetch('/api/v1/orders', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    setShow(false)

    // HACK for now to not think about rerendering the OrdersList
    window.location.reload();
  }

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        New Order
      </Button>

      <AddItemModal
        show={ show }
        handleClose={ handleClose }
        handleSave={ handleSave }
      >

        <Form>
          <Form.Group controlId="formCustomer">
            <Form.Label>Customer</Form.Label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={ true }
              isSearchable={ true }
              name="customer"
              options={buildCustomersOptions()}
              onChange={(option) => setSelectedCustomer(option)}
            />
          </Form.Group>

            <FindProductsSelect
              onChange={ (options) => setSelectedProducts(options) }
            />
        </Form>
      </AddItemModal>

    </>
  )
}

export default CreateOrder;