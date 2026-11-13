class Category < ApplicationRecord
  validates :name, presence: true
   has_many :products, dependent: :destroy 
  has_one_attached :image do |attachable|
    attachable.variant :thumb, resize_to_limit: [70, 70]
  end

  after_save :regenerate_image_variants

  private

  # Regenerate image variants only if the image was updated or newly attached
  def regenerate_image_variants
    if saved_change_to_attribute?(:id) || image.attachment_changes.present?
      begin
        Rails.logger.info "[Category ID: #{id}] Image is attached or updated, processing variants..."
        image.variant(:thumb).processed
      rescue ActiveStorage::FileNotFoundError => e
        Rails.logger.error "[Category ID: #{id}] ActiveStorage::FileNotFoundError: #{e.message}"
      rescue StandardError => e
        Rails.logger.error "[Category ID: #{id}] Error processing image variants: #{e.message}"
      end
    else
      Rails.logger.info "[Category ID: #{id}] No new image changes, skipping variant processing."
    end
  end
end
