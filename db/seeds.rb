# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
customers = Customer.create([{
  name: 'Jon Snow'
}, {
  name: 'Aria Stark'
}, {
  name: 'Ned Stark'
}, {
  name: 'Catelyn Stark'
}, {
  name: 'Robb Stark'
}])

products = Product.create([{
  name: 'Apple',
  cost: 50
}, {
  name: 'Bananna',
  cost: 50
}, {
  name: 'Biscut',
  cost: 150
}, {
  name: 'Coffee',
  cost: 120
}, {
  name: 'Donut',
  cost: 120
}, {
  name: 'Tea',
  cost: 100
}, {
  name: 'Muffin',
  cost: 175
}, {
  name: 'Mead',
  cost: 275
}, {
  name: 'Wine',
  cost: 225
}, {
  name: 'Scone',
  cost: 175
}, {
  name: 'Roll',
  cost: 175
}])