
 // import { Controller } from "@hotwired/stimulus";
 //  // Connects to data-controller="products"
 //  export default class extends Controller {
 //    static values = { size: String, product: String };

 //    connect() {

 //          if (this.hasConnected) return;  // 🚀 Prevent multiple connections
 //    this.hasConnected = true;

 //    console.log("🚀 Products Controller Connected:", this.element);
 //      try {
 //        console.log("🛠️ Raw Product Data:", this.productValue);

 //        // Parse the JSON but store it in a new variable
 //        this.product = JSON.parse(this.productValue);

 //        console.log("✅ Product Data Loaded:", this.product);
 //        console.log("🔍 Product Data Keys:", Object.keys(this.product));
 //      } catch (error) {
 //        console.error("❌ JSON Parse Error in Product Data:", error);
 //      }
 //    }

 //    // Method to Handle Size Selection
 //    selectSize(event) {
 //      this.sizeValue = event.target.value;
 //      console.log("🎯 Size Selected:", this.sizeValue);

 //      const selectedSizeEl = document.getElementById("selected-size");
 //      if (selectedSizeEl) {
 //        selectedSizeEl.innerText = `Selected Size: ${this.sizeValue}`;
 //      }
 //    }

 //    // Method to Add Product to Cart
 //    addToCart() {
 //      if (!this.sizeValue) {
 //        alert("Please select a size!");
 //        return;
 //      }

 //      const productData = {
 //        id: this.product.id,
 //        name: this.product.name,
 //        price: this.product.price,
 //        size: this.sizeValue,
 //        quantity: 1,
 //      };

 //      console.log("🛒 Adding to Cart:", productData);
 //      this.sendToCart(productData);
 //    }

 //    // Method to Send Product Data to the Backend
 //    async sendToCart(product) {
 //      try {
 //        const response = await fetch("/cart/add_to_cart", {
 //          method: "POST",
 //          headers: {
 //            "Content-Type": "application/json",
 //            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
 //          },
 //          body: JSON.stringify({ item: product }),
 //        });

 //        if (!response.ok) {
 //          console.error("❌ Failed to add item:", response.status);
 //        } else {
 //          console.log("✅ Item added successfully!");
 //        }
 //      } catch (error) {
 //        console.error("❌ Error adding to cart:", error);
 //      }
 //    }
 //  }


 // import { Controller } from "@hotwired/stimulus";

 //  // Connects to data-controller="products"
 //  export default class extends Controller {
 //    static values = { size: String, product: String };

 //    connect() {
 //      try {
 //        console.log("🛠️ Raw Product Data:", this.productValue);

 //        // Parse the JSON but store it in a new variable
 //        this.product = JSON.parse(this.productValue);

 //        console.log("✅ Product Data Loaded:", this.product);
 //        console.log("🔍 Product Data Keys:", Object.keys(this.product));
 //      } catch (error) {
 //        console.error("❌ JSON Parse Error in Product Data:", error);
 //      }
 //    }

 //    // Method to Handle Size Selection
 //    selectSize(event) {
 //      this.sizeValue = event.target.value;
 //      console.log("🎯 Size Selected:", this.sizeValue);

 //      const selectedSizeEl = document.getElementById("selected-size");
 //      if (selectedSizeEl) {
 //        selectedSizeEl.innerText = `Selected Size: ${this.sizeValue}`;
 //      }
 //    }

 //    // Method to Add Product to Cart
 //    addToCart() {
 //      if (!this.sizeValue) {
 //        alert("Please select a size!");
 //        return;
 //      }

 //      const productData = {
 //        id: this.product.id,
 //        name: this.product.name,
 //        price: this.product.price,
 //        size: this.sizeValue,
 //        quantity: 1,
 //      };

 //      console.log("🛒 Adding to Cart:", productData);
 //      this.sendToCart(productData);
 //    }

 //    // Method to Send Product Data to the Backend
 //    async sendToCart(product) {
 //      try {
 //        const response = await fetch("/cart/add_to_cart", {
 //          method: "POST",
 //          headers: {
 //            "Content-Type": "application/json",
 //            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
 //          },
 //          body: JSON.stringify({ item: product }),
 //        });

 //        if (!response.ok) {
 //          console.error("❌ Failed to add item:", response.status);
 //        } else {
 //          console.log("✅ Item added successfully!");
 //        }
 //      } catch (error) {
 //        console.error("❌ Error adding to cart:", error);
 //      }
 //    }
 //  }   
import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="products"
export default class extends Controller {
  static values = { size: String, product: String };

  connect() {
    try {
      console.log("🛠️ Raw Product Data:", this.productValue);

      // Parse the JSON and store it in a new variable
      this.product = JSON.parse(this.productValue);

      console.log("✅ Product Data Loaded:", this.product);
      console.log("🔍 Product Data Keys:", Object.keys(this.product));
    } catch (error) {
      console.error("❌ JSON Parse Error in Product Data:", error);
    }
  }

  // Method to Handle Size Selection
  selectSize(event) {
    this.sizeValue = event.target.value;
    console.log("🎯 Size Selected:", this.sizeValue);

    const selectedSizeEl = document.getElementById("selected-size");
    if (selectedSizeEl) {
      selectedSizeEl.innerText = `Selected Size: ${this.sizeValue}`;
    }
  }

  // Method to Add Product to Cart
  addToCart() {
    if (!this.sizeValue) {
      alert("Please select a size!");
      return;
    }

    const productData = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      size: this.sizeValue,
      quantity: 1,
    };

    console.log("🛒 Adding to Cart:", productData);
    this.sendToCart(productData);
  }

  // Method to Send Product Data to the Backend
  async sendToCart(product) {
    try {
      const response = await fetch("/cart/add_to_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
        },
        body: JSON.stringify({ item: product }),
      });

      if (!response.ok) {
        console.error("❌ Failed to add item:", response.status);
      } else {
        console.log("✅ Item added successfully!");

        // ✅ Trigger the cart:updated event after adding to the cart
        const updatedCart = await response.json();
        const event = new CustomEvent("cart:updated", { detail: { cart: updatedCart.items } });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
    }
  }
}
