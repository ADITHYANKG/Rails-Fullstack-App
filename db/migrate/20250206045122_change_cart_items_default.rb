class ChangeCartItemsDefault < ActiveRecord::Migration[7.2]
  def change
    change_column_default :carts, :items, from: nil, to: []
  end
end
