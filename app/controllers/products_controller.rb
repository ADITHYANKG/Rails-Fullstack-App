class ProductsController < ApplicationController
  def show
    @product = Product.find(params[:id])

    # Convert product to JSON-friendly format for Stimulus
    @product_data = @product.as_json(only: [:id, :name, :price, :description])

    # Include stock sizes with available quantity
    @product_data["stocks"] = @product.stocks.as_json(only: [:size, :amount])
  end
end
