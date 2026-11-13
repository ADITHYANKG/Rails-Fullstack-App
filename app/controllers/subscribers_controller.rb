# Handles the "Stay Updated" newsletter form on the home page.
class SubscribersController < ApplicationController
  def create
    subscriber = Subscriber.new(email: params[:email].to_s)

    if subscriber.save
      flash[:newsletter] = { "type" => "success", "message" => "Thanks for subscribing!" }
    elsif subscriber.errors.of_kind?(:email, :taken)
      flash[:newsletter] = { "type" => "info", "message" => "You're already subscribed. Thanks for staying with us!" }
    else
      flash[:newsletter] = { "type" => "error", "message" => "Please enter a valid email address." }
      flash[:newsletter_email] = params[:email].to_s.first(254)
    end

    redirect_to root_path(anchor: "newsletter"), status: :see_other
  rescue ActiveRecord::RecordNotUnique
    # Two requests with the same email at the same moment: the database index catches it.
    flash[:newsletter] = { "type" => "info", "message" => "You're already subscribed. Thanks for staying with us!" }
    redirect_to root_path(anchor: "newsletter"), status: :see_other
  end
end
