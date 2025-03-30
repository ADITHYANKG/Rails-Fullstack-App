class OrdersController < ApplicationController
  before_action :authenticate_user!

  # ✅ Users can view their own orders only
  def index
    @orders = Order.where(email: current_user.email).order(created_at: :desc)
  end

  # ✅ Users place orders (Fix: now handled in /orders instead of admin panel)
  def create
    cart = params[:cart] || []

    if cart.blank?
      render json: { error: "Cart is empty" }, status: 400
      return
    end

    order = Order.new(
      email: current_user.email, # ✅ Always use current_user.email
      address: params[:address],
      fulfilled: false,
      total: cart.sum { |item| item["price"].to_i * item["quantity"].to_i }
    )

    if order.save
      cart.each do |item|
        product = Product.find_by(id: item["id"])
        next unless product

        product_stock = product.stocks.find { |ps| ps.size.strip == item["size"].strip }
        if product_stock.nil? || product_stock.amount < item["quantity"].to_i
          render json: { error: "Not enough stock for #{product.name}" }, status: 400
          return
        end

        # ✅ Reduce stock quantity
        product_stock.update!(amount: product_stock.amount - item["quantity"].to_i)

        # ✅ Save order products
        order.order_products.create!(
          product: product,
          size: item["size"],
          quantity: item["quantity"].to_i
        )
      end


      render json: { message: "Order placed successfully!", order_id: order.id }, status: 201

    else
      render json: { error: order.errors.full_messages.join(", ") }, status: 422
    end
  
  end
end
