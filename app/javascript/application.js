// // Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
//  import "@hotwired/turbo-rails";
// import "@rails/ujs"
// import { Application } from "@hotwired/stimulus"

// import DashboardController from "./controllers/dashboard_controller"
// import ProductsController from "./controllers/products_controller"
// import CartController from "./controllers/cart_controller"
// import SampleController from "./controllers/sample_controller";
// const application = Application.start()
// application.register("cart",CartController)
// application.register("dashboard", DashboardController)
// application.register("products", ProductsController)
// application.register("sample", SampleController);

import "@hotwired/turbo-rails";
import "@rails/ujs";
import { Application } from "@hotwired/stimulus";
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading";

// Import all controllers automatically
console.log("Starting Stimulus Application...");
import DashboardController from "./controllers/dashboard_controller";
import ProductsController from "./controllers/products_controller";
import CartController from "./controllers/cart_controller";
import SampleController from "./controllers/sample_controller";

const application = Application.start();
application.register("dashboard", DashboardController);
application.register("products", ProductsController);
application.register("cart", CartController);
application.register("sample", SampleController);

// Eager load any additional controllers
eagerLoadControllersFrom("controllers", application);

application.debug = false;
window.Stimulus = application;

export { application };

document.addEventListener("turbo:load", setupHamburgerMenu);
document.addEventListener("DOMContentLoaded", setupHamburgerMenu);

function setupHamburgerMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuToggle || !mobileMenu) return;

  // Remove old event listeners to prevent duplication
  menuToggle.removeEventListener("click", toggleMenu);
  menuToggle.addEventListener("click", toggleMenu);

  function toggleMenu() {
    if (mobileMenu.classList.contains("hidden")) {
      sessionStorage.setItem("menuOpen", "true"); // Remember menu state
    } else {
      sessionStorage.setItem("menuOpen", "false");
    }
    mobileMenu.classList.toggle("hidden");
  }

  // Close menu when clicking any menu item
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.removeEventListener("click", closeMenu);
    link.addEventListener("click", closeMenu);
  });

  function closeMenu() {
    mobileMenu.classList.add("hidden");
    sessionStorage.setItem("menuOpen", "false"); // Ensure menu is closed
  }

  // Restore menu state after navigation (ensures menu opens properly next time)
  if (sessionStorage.getItem("menuOpen") === "true") {
    mobileMenu.classList.remove("hidden");
  } else {
    mobileMenu.classList.add("hidden");
  }
}
