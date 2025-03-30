class User < ApplicationRecord
   has_one :cart, dependent: :destroy
   after_create :create_cart
    private
    def create_cart
      Cart.create(user: self, items: [])
    end    
 
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
