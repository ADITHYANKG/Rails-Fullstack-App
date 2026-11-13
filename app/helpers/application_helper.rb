module ApplicationHelper
	def admin_controller?
		controller_path.start_with?('admins/')
    end		
end
