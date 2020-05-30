## To Run
- clone repo
- install dependancies
- `bin/rake state`

#### To Do
- Rename AddItemModal -> ItemModal, add title prop
- (BE) Validate State transitions on Backend
-


## Functionality To Do list :heavy_check_mark:

- [X] Show a list of orders
  - [X] API
  - [X] GUI
- [X] Ability to create a new order and select a customer
  - [X] API
  - [X] GUI
- [X] Ability to search for a product and add it to the order
  - [X] API
  - [X] GUI
- [X] Ability to remove a product from an order
  - [X] API
  - [X] GUI
- [X] Ability to submit the order (order states are: draft, submitted and canceled)
  - [X] API
  - [X] GUI
- [X] Ability to cancel the order
  - [X] API
  - [X] GUI

## Stretch

- [X] A simple calculation of total and taxes for the order
- [ ] Those should be covered by automated tests -- [rspec](https://rspec.info/)/minitest




### Models


| Products      | Customers       | Orders        |
| -----         | ----            | -----         |
| - product_id  | - customer_id   | - order_id    |
| - name        | - name          | - customer_id |
| - cost        |                 | - product_ids (through) |
|               |                 | - state       |
|               |                 | - total       |





### Local Notes
- If postgreSQL is missing, make sure to run `brew services start postgresql`



## References:
- https://blog.heroku.com/a-rock-solid-modern-web-stack

#### Rails:
- https://medium.com/@oliver.seq/creating-a-rest-api-with-rails-2a07f548e5dc

#### React:


#### Data:
- https://en.wikipedia.org/wiki/List_of_Game_of_Thrones_characters


#### Components:
- [React Select](https://react-select.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Bootstrap Table](https://react-bootstrap-table.github.io/)