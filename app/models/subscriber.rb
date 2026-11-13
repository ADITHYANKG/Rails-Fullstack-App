class Subscriber < ApplicationRecord
  # Store emails trimmed and lowercased so " Me@Mail.com " and "me@mail.com"
  # count as the same subscriber.
  normalizes :email, with: ->(email) { email.strip.downcase }

  validates :email,
            presence: true,
            length: { maximum: 254 },
            format: { with: URI::MailTo::EMAIL_REGEXP, message: "is not a valid email address" },
            uniqueness: true
end
