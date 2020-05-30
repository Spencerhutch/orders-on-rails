import React from 'react';
import AsyncSelect from 'react-select/async';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';

function FindProductsSelect({...props}) {

  // Async Select didn't like Async/Await.
  const productLoadOptions = inputValue => {
    return window.fetch(`/api/v1/products?search=${inputValue}`)
      .then((results) => results.json())
      .then((val) => {
        return val.map((i) => ({value: i.id, label: i.name}));
      })
  }

  function renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Type to search for product
      </Tooltip>
    );
  }

  return (
    <Form.Group controlId="formProduct">
      <Form.Label>
        Products
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <InfoCircle id='info-svg'/>
        </OverlayTrigger>
      </Form.Label>
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        loadOptions={productLoadOptions}
        defaultValue={ props.default }
        onChange={ props.onChange }
      />
    </Form.Group>
  )
}

export default FindProductsSelect;