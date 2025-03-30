# class CheckoutsController < ApplicationController
#   def create
#     stripe_secret_key = Rails.application.credentials.dig(:stripe, :secret_key)
#     Stripe.api_key = stripe_secret_key

#     cart = params[:cart]
#     line_items = cart.map do |item|
#       product = Product.find_by(id: item["id"])

#       if product.nil?
#         render json: { error: "Product with ID #{item['id']} not found." }, status: 404
#         return
#       end

#       product_stock = product.stocks.find { |ps| ps.size == item["size"].strip }

#       if product_stock.nil?
#         render json: { error: "Stock not found for #{product.name} in size #{item['size']}." }, status: 400
#         return
#       end

#       if product_stock.amount < item["quantity"].to_i
#         render json: { error: "Not enough stock for #{product.name} in size #{item['size']}. Only #{product_stock.amount} left." }, status: 400
#         return
#       end

#       {
#         quantity: item["quantity"].to_i,
#         price_data: {
#           product_data: {
#             name: item["name"],
#             metadata: {
#               product_id: product.id,
#               size: item["size"],
#               product_stock_id: product_stock.id
#             }
#           },
#           currency: "usd",
#           unit_amount: item["price"].to_i
#         }
#       }
#     end

#     session = Stripe::Checkout::Session.create(
#       mode: "payment",
#       line_items: line_items,
#       success_url: "http://localhost:3000/success",
#       cancel_url: "http://localhost:3000/cancel",
#       shipping_address_collection: {
#         allowed_countries: ['US', 'CA']
#       }
#     )

#     render json: { url: session.url }
#   end
# end

class CheckoutsController < ApplicationController
  def create
    cart = params[:cart]

    if cart.blank?
      render json: { error: "Cart is empty" }, status: 400
      return
    end

    order = Order.create!(
      email: params[:email],
      address: params[:address],
      fulfilled: false,
      total: cart.sum { |item| item["price"].to_i * item["quantity"].to_i }
    )

    cart.each do |item|
      product = Product.find_by(id: item["id"])
      next unless product

      product_stock = product.stocks.find { |ps| ps.size.strip == item["size"].strip }

      if product_stock.nil? || product_stock.amount < item["quantity"].to_i
        render json: { error: "Not enough stock for #{product.name}" }, status: 400
        return
      end

      # Reduce stock quantity
      product_stock.update!(amount: product_stock.amount - item["quantity"].to_i)

      # Save order items
      order.order_products.create!(
        product: product,
        quantity: item["quantity"].to_i,
        price: item["price"].to_i
      )
    end

    render json: { message: "Order placed successfully!", order_id: order.id }, status: 201
  end
end
