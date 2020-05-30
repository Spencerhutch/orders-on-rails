import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import AddItemModal from './AddItemModal';
import BootstrapTable from 'react-bootstrap-table-next';
import FindProductsSelect from './FindProductsSelect';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editRow, setEditRow] = useState([]);
  const [editRowIdx, setEditRowIdx] = useState([]);
  const [editMade, setEditMade] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Should Extract out into contants file
  const ORDER_STATES = {
    DRAFT: 'DRAFT',
    SUBMITTED: 'SUBMITTED',
    CANCELLED: 'CANCELLED'
  }

  useEffect(() => {
    async function fetchOrders() {
      const ordersJSON = await window.fetch('/api/v1/orders')
      setOrders(await ordersJSON.json());
    }
    fetchOrders();
  }, []);

  const updateOrderState = async (orderId, state) => {
    let url = '';
    if (state === ORDER_STATES.SUBMITTED) {
      url = `/api/v1/orders/${orderId}/submit`;
    }else if (state === ORDER_STATES.CANCELLED) {
      url = `/api/v1/orders/${orderId}/cancel`
    } else {
      console.warn('Unexpected State Given');
      return
    }

    await window.fetch(url, {
      method: 'put'
    })

    const ordersCopy = orders
    ordersCopy[editRowIdx] = {...editRow, state: state}
    setOrders(ordersCopy);
    setEditRow(prev => ({...prev, state: state}))
  }

  const columns = [{
    dataField: 'id',
    text: 'Id'
  }, {
    dataField: 'state',
    text: 'State',
  }, {
    dataField: 'customer.name',
    text: 'Customer'
  }, {
    dataField: 'products',
    text: 'Products',
    formatter: (rowContent, row) => {
      return rowContent.map((i) => <div key={ i.id }>{i.name}</div> )
    }
  }, {
    dataField: 'total',
    text: 'Total',
    formatter: (rowContent, row) => {
      return (
        <Container id='row-cost-calculation'>
          <Row>
            <Col>Subtotal</Col><Col>{ row.subtotal }</Col>
          </Row>
          <Row>
            <Col>Tax</Col><Col>{ row.tax }</Col>
          </Row>
          <Row>
            <Col>Total</Col><Col>{ row.total && row.total.toFixed(2) }</Col>
          </Row>
        </Container>
      )
    }
  }]

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setEditRow(row)
      setEditRowIdx(rowIndex)
      setShowEdit(true)
    }
  }

  const buildStateButtons = (order) => {
    switch (order.state) {
      case ORDER_STATES.DRAFT:
        return (
          <Container id='state-change-button-container'>
            <Row>
              <Col><Button onClick={ () => updateOrderState(order.id, ORDER_STATES.SUBMITTED) }>Submit Order</Button></Col>
              <Col><Button onClick={ () => updateOrderState(order.id, ORDER_STATES.CANCELLED) }>Cancel Order</Button></Col>
            </Row>
          </Container>
        );
      case ORDER_STATES.SUBMITTED:
        return (
          <Container id='state-change-button-container'>
            <Row>
              <Col>
                <Button onClick={ () => updateOrderState(order.id, ORDER_STATES.CANCELLED) }>Cancel Order</Button>
              </Col>
            </Row>
          </Container>
        );
      default:
        return (<></>);
    }
  }

  const handleModalSave = async () => {
    if (editMade) {
      const requestBody = {
        order: {
          products: selectedProducts.map((i) => i.value)
        }
      };
      const updatedOrderJSON = await fetch(`/api/v1/orders/${editRow.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const updatedOrder = await updatedOrderJSON.json()
      const ordersCopy = orders
      ordersCopy[editRowIdx] = updatedOrder
      setOrders(ordersCopy);
    }

    setShowEdit(false);
  }

  return (
    <>
      <Container>
        <BootstrapTable
          id='orders-list'
          striped
          keyField='id'
          data={ orders }
          columns={ columns }
          rowEvents={ rowEvents }
        />
      </Container>
      <AddItemModal
        show={ showEdit }
        handleClose={ () => { setShowEdit(false) }}
        handleSave={ handleModalSave }
      >

        { buildStateButtons(editRow) }

        <FindProductsSelect
          default={ editRow.products && editRow.products.map((item)=> ({label: item.name, value: item.id})) }
          onChange={ (options) => {setSelectedProducts(options); setEditMade(true)} }
        />

      </AddItemModal>
    </>
  )
}

export default OrdersList;