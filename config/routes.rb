Rails.application.routes.draw do
  get "orders/index"
  
  devise_for :users, controllers: {
  registrations: 'users/registrations',
  sessions: 'users/sessions'

}
  namespace :admin do
    resources :orders
    resources :products do 
       resources :stocks
    end
  end
 # config/routes.rb
# config/routes.rb

devise_for :admins, controllers: {
  sessions: 'admins/sessions',
  registrations: 'admins/registrations'
}

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  root "home#index"
 
  


  get "admin" => "admin#index"
  resources :categories ,only: [:show]
  resources :products ,only: [:show]
  
  
namespace :admin do
  resources :categories
end
get 'cart', to: 'carts#show'
get 'cart_data', to: 'carts#cart_data'
post 'cart/add_to_cart', to: 'carts#add_to_cart'
delete 'cart/remove_from_cart', to: 'carts#remove_from_cart'
delete 'cart/clear_cart', to: 'carts#clear_cart'
post 'orders', to: 'orders#create'


post "checkout" =>"checkouts#create"
 
  # Defines the root path route ("/")
  # root "posts#index"
  resources :orders,only: [:index, :create]
end
