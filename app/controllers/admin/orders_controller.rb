# class Admin::OrdersController < AdminController
#   before_action :set_admin_order, only: %i[ show edit update destroy ]

#   # GET /admin/orders or /admin/orders.json
#   def index
#     @not_fulfilled_orders=Order.where(fulfilled:false).order(created_at: :asc)
#     @fulfilled_orders=Order.where(fulfilled:true).order(created_at: :asc)
#   end

#   # GET /admin/orders/1 or /admin/orders/1.json
#   def show
#   end

#   # GET /admin/orders/new
#   def new
#     @admin_order =Order.new
#   end

#   # GET /admin/orders/1/edit
#   def edit
#   end

#   # POST /admin/orders or /admin/orders.json
#   def create
#     @admin_order = Order.new(admin_order_params)

#     respond_to do |format|
#       if @admin_order.save
#         format.html { redirect_to admin_orders_path, notice: "Order was successfully created." }
#         format.json { render :show, status: :created, location: @admin_order }
#       else
#         format.html { render :new, status: :unprocessable_entity }
#         format.json { render json: @admin_order.errors, status: :unprocessable_entity }
#       end
#     end
#   end

#   # PATCH/PUT /admin/orders/1 or /admin/orders/1.json
#   def update
#     respond_to do |format|
#       if @admin_order.update(admin_order_params)
#         format.html { redirect_to admin_order_path, notice: "Order was successfully updated." }
#         format.json { render :show, status: :ok, location: @admin_order }
#       else
#         format.html { render :edit, status: :unprocessable_entity }
#         format.json { render json: @admin_order.errors, status: :unprocessable_entity }
#       end
#     end
#   end

#   # DELETE /admin/orders/1 or /admin/orders/1.json
#   def destroy
#     @admin_order.destroy!

#     respond_to do |format|
#       format.html { redirect_to admin_orders_path, status: :see_other, notice: "Order was successfully destroyed." }
#       format.json { head :no_content }
#     end
#   end

#   private
#     # Use callbacks to share common setup or constraints between actions.
#     def set_admin_order
#       @admin_order = Order.find(params[:id])
#     end

#     # Only allow a list of trusted parameters through.
#     def admin_order_params
#       params.require(:order).permit(:email, :fulfilled, :total, :address)
#     end
# end
# class Admin::OrdersController < AdminController
#   skip_before_action :verify_authenticity_token, only: [:create]

#   def index
#     @not_fulfilled_orders = Order.where(fulfilled: false).order(created_at: :asc)
#     @fulfilled_orders = Order.where(fulfilled: true).order(created_at: :asc)

#     # ✅ Ensure @not_fulfilled_orders is never nil
#     @not_fulfilled_orders ||= []
#     @fulfilled_orders ||= []
#   end
#   def create
#     cart = params[:cart] || []

#     if cart.blank?
#       render json: { error: "Cart is empty" }, status: 400
#       return
#     end

#     order = Order.new(
#       email: params[:email],
#       address: params[:address],
#       fulfilled: false,
#       total: cart.sum { |item| item["price"].to_i * item["quantity"].to_i }
#     )

#     if order.save
#       cart.each do |item|
#         product = Product.find_by(id: item["id"])
#         next unless product

#         product_stock = product.stocks.find { |ps| ps.size.strip == item["size"].strip }
#         if product_stock.nil? || product_stock.amount < item["quantity"].to_i
#           render json: { error: "Not enough stock for #{product.name}" }, status: 400
#           return
#         end

#         # ✅ Reduce stock quantity
#         product_stock.update!(amount: product_stock.amount - item["quantity"].to_i)

#         # ✅ Fix: Remove `price` from order_products.create!
#         order.order_products.create!(
#           product: product,
#           size: item["size"],  # ✅ Ensure size is saved
#           quantity: item["quantity"].to_i
#         )
#       end

#       render json: { message: "Order placed successfully!", order_id: order.id }, status: 201
#     else
#       render json: { error: order.errors.full_messages.join(", ") }, status: 422
#     end
#   end
# end
class Admin::OrdersController < AdminController
  skip_before_action :verify_authenticity_token, only: [:create]
  before_action :set_admin_order, only: %i[show edit update destroy]

  # ✅ Admin Panel: View All Orders
  def index
    @not_fulfilled_orders = Order.where(fulfilled: false).order(created_at: :asc)
    @fulfilled_orders = Order.where(fulfilled: true).order(created_at: :asc)

    # ✅ Ensure @not_fulfilled_orders is never nil
    @not_fulfilled_orders ||= []
    @fulfilled_orders ||= []
  end

  # ✅ Admin Panel: View a Single Order
  def show
  end

  # ✅ Admin Panel: New Order Form
  def new
    @admin_order = Order.new
  end

  # ✅ Admin Panel: Edit an Existing Order
  def edit
  end

  # ✅ User-Side: Create a New Order (Appends to Admin Order Table)
  def create
    cart = params[:cart] || []

    if cart.blank?
      render json: { error: "Cart is empty" }, status: 400
      return
    end

    order = Order.new(
      email: params[:email],
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

        # ✅ Link order with products
        order.order_products.create!(
          product: product,
          size: item["size"],  # ✅ Ensure size is saved
          quantity: item["quantity"].to_i
        )
      end

      render json: { message: "Order placed successfully!", order_id: order.id }, status: 201
    else
      render json: { error: order.errors.full_messages.join(", ") }, status: 422
    end
  end

  # ✅ Admin Panel: Update an Order (Allows Editing)
  def update
    respond_to do |format|
      if @admin_order.update(admin_order_params)
        format.html { redirect_to admin_order_path(@admin_order), notice: "Order was successfully updated." }
        format.json { render :show, status: :ok, location: @admin_order }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @admin_order.errors, status: :unprocessable_entity }
      end
    end
  end

  # ✅ Admin Panel: Delete an Order
  def destroy
    @admin_order.destroy!

    respond_to do |format|
      format.html { redirect_to admin_orders_path, status: :see_other, notice: "Order was successfully deleted." }
      format.json { head :no_content }
    end
  end

  private

  # ✅ Helper Method: Find an Order for Show/Edit/Update/Delete
  def set_admin_order
    @admin_order = Order.find(params[:id])
  end

  # ✅ Strong Parameters: Allow Admin to Manage Orders
  def admin_order_params
    params.require(:order).permit(:email, :fulfilled, :total, :address)
  end
end
