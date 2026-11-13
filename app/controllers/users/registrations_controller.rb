class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]

  protected

  # ✅ Redirect to login page after sign-up
  def after_sign_up_path_for(resource)
    Rails.logger.debug "✅ Redirecting after sign-up to: #{new_user_session_path}"
    flash[:notice] = "Account created successfully! Please sign in."
    new_user_session_path # Correctly redirects to the login page
  end

  # ✅ Ensure `name` is allowed in sign-up form
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :password, :password_confirmation])
  end
end
