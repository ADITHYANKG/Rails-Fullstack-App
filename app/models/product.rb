class Product < ApplicationRecord
  belongs_to :category
  # validates :name, presence: true
  has_many :stocks, dependent: :destroy
  has_many_attached :images do |attachable|
    attachable.variant :thumb, resize_to_limit: [70, 70]
    attachable.variant :medium,resize_to_limit: [250,250]
  end
   has_many :order_products, dependent: :destroy
end  