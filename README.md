# Rails Fullstack App

An e-commerce website built with Ruby on Rails. Customers browse products by category, add them to a cart and place orders. Admins manage categories, products, stock and orders from an admin panel.

Rails runs both the backend and the UI. Pages are rendered on the server, and a little JavaScript (Stimulus) adds interactivity such as the cart. There is no separate frontend app.

## Features

**Store**
- Browse categories and products with images
- Product pages with size selection
- Cart for signed-in customers (add, remove, clear)
- Checkout that creates an order and reduces stock
- Order history

**Admin panel** (`/admin`)
- Dashboard with charts
- Create and edit categories, products (with multiple images) and stock per size
- View and manage orders

**Accounts**
- Separate sign-up and login for customers and admins (Devise)

## Tech stack

| Area | Technology |
|---|---|
| Framework | Ruby on Rails 7.2 (Ruby 3.2) |
| Database | SQLite in development; PostgreSQL in production (Docker) |
| Views | ERB templates |
| Styling | Tailwind CSS, Font Awesome |
| JavaScript | Hotwire (Turbo and Stimulus) via import maps, so no Node build step |
| Charts | Chart.js |
| Authentication | Devise |
| Images | Active Storage + ImageMagick (`mini_magick`) for thumbnails |
| Web server | Puma |

## Requirements

- **Ruby 3.2** (on Windows: [RubyInstaller](https://rubyinstaller.org/downloads/) "Ruby+Devkit 3.2.x (x64)")
- **ImageMagick 7**, needed to generate product and category thumbnails
- **Git**

On Windows you can install both with winget:

```powershell
winget install RubyInstallerTeam.RubyWithDevKit.3.2
winget install ImageMagick.ImageMagick
ridk install 3        # installs the compiler toolchain some gems need
```

Open a new terminal afterwards so `ruby` and `magick` are on your PATH.

> **macOS / Linux:** `Gemfile.lock` currently only lists the Windows platform. Run `bundle lock --add-platform x86_64-linux` (or `arm64-darwin` on Apple Silicon Macs) before `bundle install`.

## Getting started

```bash
git clone <repository-url>
cd rails-fullstack-app

gem install bundler
bundle install

ruby bin/rails db:prepare       # create the SQLite database and run migrations
ruby bin/rails db:seed          # load sample data (optional)
ruby bin/rails tailwindcss:build
```

### Run the app

```bash
ruby bin/rails server
```

Then open http://localhost:3000.

If port 3000 is already in use, pick another one: `ruby bin/rails server -p 3001`.

When you are editing styles, also run this in a second terminal so the CSS rebuilds as you edit:

```bash
ruby bin/rails tailwindcss:watch
```

### Sample data

`db/seeds.rb` creates 4 categories, 12 products with placeholder images, stock in sizes S to XL, and two accounts:

| Role | Login page | Email | Password |
|---|---|---|---|
| Admin | `/admins/sign_in` | `admin@example.com` | `password123` |
| Customer | `/users/sign_in` | `user@example.com` | `password123` |

These accounts are for local development only.

To create your own admin account instead, go to `/admins/sign_up`.

## Useful commands

| Command | What it does |
|---|---|
| `ruby bin/rails server` | Start the app |
| `ruby bin/rails tailwindcss:watch` | Rebuild CSS on changes |
| `ruby bin/rails db:seed` | Add sample data (skips records that already exist) |
| `ruby bin/rails db:reset` | **Delete all data** and reload the sample data |
| `ruby bin/rails console` | Open a Ruby console with the app loaded |
| `ruby bin/rails routes` | List all URLs |

## Project structure

```
app/
  controllers/          request handling (store pages, cart, checkout, orders)
    admin/              admin panel controllers
  models/               Category, Product, Stock, Cart, Order, OrderProduct, User, Admin
  views/                ERB templates
    admin/              admin panel pages
    layouts/            page layouts, navbar and footer
  javascript/
    controllers/        Stimulus controllers (cart, products, admin dashboard)
  assets/tailwind/      Tailwind CSS source
config/routes.rb        all URLs
db/
  migrate/              database migrations
  seeds.rb              sample data
```

## Notes

- **Windows development settings:** `config/environments/development.rb` keeps the Sprockets asset cache in memory, and `config/puma.rb` disables Puma's restart plugin on Windows. Both work around Windows-specific crashes.
- **Payments:** the `stripe` gem is installed, but the Stripe integration in `CheckoutsController` is commented out. Checkout currently creates the order without taking payment.
- **Docker:** `Dockerfile` and `docker-compose.yml` are for a production deployment with PostgreSQL. They are not needed for local development, and they need a valid `RAILS_MASTER_KEY` (from `config/master.key`) to run.
