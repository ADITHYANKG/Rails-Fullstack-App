class CreateAdminOrders < ActiveRecord::Migration[7.2]
  def change
    create_table :orders do |t|
      t.string :email
      t.boolean :fulfilled
      t.integer :total
      t.string :address

      t.timestamps
    end
  end
end
