class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]

  protected
  # ✅ Redirect after successful login
  def after_sign_in_path_for(resource)
    Rails.logger.debug "✅ Redirecting after sign-in to: #{root_path}"
    flash[:notice] = "Signed in successfully!"
    root_path
  end
  

  # ✅ Permit additional parameters if needed
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
  end
end
