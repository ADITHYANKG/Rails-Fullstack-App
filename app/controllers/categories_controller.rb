class CategoriesController < ApplicationController
	before_action :find_category
     def show
     	@category = Category.find(params[:id])
     	@products= @category.products
     end

	

	private
	def find_category
		@category = Category.find(params[:id]) if params[:id]
	end
end
