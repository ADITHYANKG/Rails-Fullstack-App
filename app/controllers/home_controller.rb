class HomeController < ApplicationController
   def index
  @main_categories=Category.take(10)
   end
end
