class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  protected
   def after_sign_in_path_for(resource)
    if resource.is_a?(Admin)
      admin_path   # Redirect to admin dashboard
    else
      root_path    # Redirect to user home page
    end
  end

def after_sign_up_path_for(resource)
    if resource.is_a?(Admin)
       new_admin_session_path   # Redirect Admin after Registration
    else
      root_path              # Redirect User after Registration
    end
  end
end
