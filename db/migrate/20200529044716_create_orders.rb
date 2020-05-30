class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.references :customer, null: false, foreign_key: true
      t.string :state
      t.integer :subtotal
      t.float :tax
      t.float :total

      t.timestamps
    end
  end
end
