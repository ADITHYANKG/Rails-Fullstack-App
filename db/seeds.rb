# Sample data for local development.
# Run with:  ruby bin/rails db:seed
# Safe to run more than once: existing records (matched by name/email) are skipped.

require "fileutils"

# Generates a simple placeholder image with ImageMagick and returns its path.
# Returns nil if ImageMagick isn't available, so seeding still works without images.
IMAGE_DIR = Rails.root.join("tmp", "seed_images")
FileUtils.mkdir_p(IMAGE_DIR)

def placeholder_image(label, color)
  path = IMAGE_DIR.join("#{label.parameterize}.png").to_s
  return path if File.exist?(path)

  ok = system(
    "magick", "-size", "600x600", "gradient:#{color}-#333333",
    "-gravity", "center", "-fill", "white", "-pointsize", "44",
    "-annotate", "0", label.gsub(" ", "\n"), path,
    out: File::NULL, err: File::NULL
  )
  ok && File.exist?(path) ? path : nil
end

def attach_image(attachment, label, color)
  path = placeholder_image(label, color)
  return unless path

  attachment.attach(io: File.open(path), filename: File.basename(path), content_type: "image/png")
end

# --- Logins -----------------------------------------------------------------

admin = Admin.find_or_create_by!(email: "admin@example.com") do |a|
  a.password = "password123"
end
puts "Admin login:    #{admin.email} / password123"

user = User.find_or_create_by!(email: "user@example.com") do |u|
  u.name = "Demo User"
  u.password = "password123"
end
puts "Customer login: #{user.email} / password123"

# --- Catalog ----------------------------------------------------------------

CATALOG = {
  "T-Shirts" => {
    color: "#2563eb",
    description: "Soft cotton tees for everyday wear.",
    products: [
      [ "Classic White Tee", 499, "100% cotton crew-neck t-shirt." ],
      [ "Graphic Print Tee", 699, "Relaxed fit tee with a bold front print." ],
      [ "Striped Polo", 899, "Breathable pique polo with contrast stripes." ]
    ]
  },
  "Jeans" => {
    color: "#1e3a8a",
    description: "Denim in every fit.",
    products: [
      [ "Slim Fit Jeans", 1499, "Stretch denim with a modern slim fit." ],
      [ "Straight Leg Jeans", 1399, "Classic straight cut, mid-rise." ],
      [ "Ripped Skinny Jeans", 1699, "Distressed skinny jeans with a washed finish." ]
    ]
  },
  "Shoes" => {
    color: "#b91c1c",
    description: "Sneakers, runners and casual shoes.",
    products: [
      [ "Running Sneakers", 2499, "Lightweight running shoes with cushioned soles." ],
      [ "Canvas Shoes", 1199, "Low-top canvas shoes for casual wear." ],
      [ "Leather Loafers", 2999, "Slip-on loafers in genuine leather." ]
    ]
  },
  "Jackets" => {
    color: "#15803d",
    description: "Layers for every season.",
    products: [
      [ "Denim Jacket", 2199, "Classic button-up denim jacket." ],
      [ "Hooded Windbreaker", 1799, "Water-resistant windbreaker with hood." ],
      [ "Puffer Jacket", 3499, "Insulated puffer jacket for cold days." ]
    ]
  }
}

SIZES = { "S" => 10, "M" => 15, "L" => 15, "XL" => 8 }

CATALOG.each do |category_name, data|
  category = Category.find_or_create_by!(name: category_name) do |c|
    c.description = data[:description]
  end
  attach_image(category.image, category_name, data[:color]) unless category.image.attached?

  data[:products].each do |name, price, description|
    product = Product.find_or_create_by!(name: name, category: category) do |p|
      p.price = price
      p.description = description
      p.active = true
    end
    attach_image(product.images, name, data[:color]) unless product.images.attached?

    SIZES.each do |size, amount|
      product.stocks.find_or_create_by!(size: size) { |s| s.amount = amount }
    end
  end
end

puts "Categories: #{Category.count}, Products: #{Product.count}, Stock rows: #{Stock.count}"
