class Cart < ApplicationRecord
  belongs_to :user
  after_initialize :set_defaults

  def set_defaults
    self.items ||= []
  end
end
