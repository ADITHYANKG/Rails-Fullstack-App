class CartsController < ApplicationController
  before_action :authenticate_user!

  # ✅ Show the cart UI
  def show
    # Render the cart HTML view (show.html.erb)
    render 'show'
  end

  # ✅ API Endpoint to Fetch Cart Data (JSON)
  # def cart_data
  #   cart = current_user.cart || current_user.create_cart!(items: [])
  #   render json: { items: cart.items || [] }
  # end
  def cart_data
  cart = current_user.cart || current_user.create_cart!(items: [])

  # ✅ Enhance each item with an image URL
  items_with_images = cart.items.map do |item|
    item.merge("image_url" => fetch_image_url(item["id"])) # Add image_url dynamically
  end

  render json: { items: items_with_images }
end

  # Add item to cart
  def add_to_cart
    cart = current_user.cart || current_user.create_cart!(items: [])
    item = params[:item]

    existing_item = cart.items.find { |i| i["id"] == item["id"] && i["size"] == item["size"] }
    if existing_item
      existing_item["quantity"] += 1
    else
      cart.items << item
    end

    cart.save!
    render json: { items: cart.items }
  end

#   # Remove item from cart
#  def remove_from_cart
#   cart = current_user.cart
#   cart.items.reject! { |item| item["id"].to_s == params[:id] && item["size"] == params[:size] }  # ✅ Check both ID and Size
#   cart.save!
#   render json: { items: cart.items }
# end
def remove_from_cart
  cart = current_user.cart
  cart.items.reject! { |item| item["id"].to_s == params[:id] && item["size"] == params[:size] }
  cart.save!

  # ✅ Add `image_url` before sending the updated cart
  items_with_images = cart.items.map do |item|
    item.merge("image_url" => fetch_image_url(item["id"]))
  end

  render json: { items: items_with_images }
end



  # Clear cart
  def clear_cart
    cart = current_user.cart
    cart.update!(items: [])
    render json: { items: [] }
  end
include Rails.application.routes.url_helpers # Required for Active Storage URLs

private

# ✅ Function to fetch the first image URL from Active Storage
def fetch_image_url(item_id)
  product = Product.find_by(id: item_id)

  if product&.images&.attached?
    rails_blob_url(product.images.first, only_path: true)
  else
    "https://via.placeholder.com/150" # Default placeholder image
  end
end

end
