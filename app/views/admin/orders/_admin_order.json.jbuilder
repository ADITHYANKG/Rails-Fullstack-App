json.extract! admin_order, :id, :email, :fulfilled, :total, :address, :created_at, :updated_at
json.url admin_order_url(admin_order, format: :json)
