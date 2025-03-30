// import { Controller } from "@hotwired/stimulus";

// // Connects to data-controller="cart"
// export default class extends Controller {
//   static targets = ["checkoutForm"];

//   initialize() {
//     console.log("Cart controller initialized");
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     if (!cart.length) return;

//     let total = 0;
//     for (let i = 0; i < cart.length; i++) {
//       const item = cart[i];
//       total += item.price * item.quantity;

//       const div = document.createElement("div");
//       div.classList.add("mt-2","cart-item");
//       div.innerText = `Item: ${item.name} - $${item.price / 100.0} - Size: ${item.size} - Quantity: ${item.quantity}`;
      
//       const deleteButton = document.createElement("button");
//       deleteButton.innerText = "Remove";
//       deleteButton.value = item.id;
//       deleteButton.classList.add("bg-gray-500", "rounded", "text-white", "px-2", "py-1", "ml-2");
//       deleteButton.addEventListener("click", this.removeFromCart.bind(this));
//       div.appendChild(deleteButton);
//       this.element.prepend(div);
//     }



//     const totalEl = document.createElement("div");

//     totalEl.innerText = `Total: $${total / 100}`;
    
//     let totalContainer = document.getElementById("total");
//     totalContainer.appendChild(totalEl);
//   }

//   // Clear the cart
//   clear() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//      if (cart.length) {
//     localStorage.removeItem("cart");
//     window.location.reload();
//   }
//   }

//   // Remove individual items from the cart
//   removeFromCart(event) {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const id = event.target.value;
//     const index = cart.findIndex((item) => item.id == id);
//     if (index !== -1) {
//       cart.splice(index, 1);
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//     window.location.reload();
//   }

//   // Show the checkout form
//   checkout(event) {

//     const cart = JSON.parse(localStorage.getItem("cart")) || []
//       if(cart.length){
//          console.log("Checkout button clicked!");
//     event.preventDefault();
//     this.checkoutFormTarget.classList.remove("hidden");

//       }

    
//   }

//   // Submit the order
// async placeOrder(event) {
//   event.preventDefault();
//   console.log("Placing order...");
 
//   const email = document.getElementById("email").value;
//   const address = document.getElementById("address").value;
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   if (cart.length === 0) {
//     alert("Your cart is empty!");
//     return;
//   }
//     document.getElementById("checkout-form").classList.add("hidden");
// window.location.reload()
   
//   // ✅ Get CSRF token from Rails meta tags
//    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

//   try {
//     const response = await fetch("/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRF-Token": csrfToken,
//       },
//       body: JSON.stringify({ email, address, cart }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Error response:", errorText);
//       alert(`Error: ${errorText}`);
//       return;
//     }

//     // ✅ Clear local storage
//     localStorage.removeItem("cart");
    
//     // ✅ Immediately update UI by removing cart items
//            const cartItems = document.getElementsByClassName("cart-item");
//     Array.from(cartItems).forEach((item) => item.remove());
//     // ✅ Reset total amount displayed
     
//     alert("✅ Order placed successfully!");

//   } catch (error) {
//     console.error("Order submission failed:", error);
//     alert("❌ An error occurred. Please try again.");
//   }
// }



//   }


// import { Controller } from "@hotwired/stimulus";
// // Connects to data-controller="cart"
// export default class extends Controller {
//   static targets = ["checkoutForm","cartTop"];

//   initialize() {
//     console.log("Cart controller initialized");

//     this.fetchCart(); // ✅ Fetch cart data from the server
     


//   }




//   // ✅ Fetch Cart Data from the Server
//   async fetchCart() {
//     try {
//       const response = await fetch("/cart_data", { method: "GET" });
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Cart Data from API:", data);
//         this.renderCart(data.items || []);
//       } else {
//         console.error("Failed to fetch cart:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   }

//   // ✅ Render the Cart UI
// renderCart(cart) {
//   const cartContainer = document.getElementById("cart-items");
//   const totalContainer = document.getElementById("total");

//   cartContainer.innerHTML = ""; // Clear previous cart items

//   let total = 0;

//   cart.forEach((item) => {
//     total += item.price * item.quantity;

//     const div = document.createElement("div");
//     div.classList.add("mt-2", "cart-item");
//     div.innerText = `Item: ${item.name} - $${(item.price / 100).toFixed(2)} - Size: ${item.size} - Quantity: ${item.quantity}`;

//     const deleteButton = document.createElement("button");
//     deleteButton.innerText = "Remove";
  
//     deleteButton.dataset.id = item.id;          // ✅ Add item ID
// deleteButton.dataset.size = item.size; 
//     deleteButton.classList.add("bg-gray-500", "rounded", "text-white", "px-2", "py-1", "ml-2");
//     deleteButton.addEventListener("click", this.removeFromCart.bind(this));
//     div.appendChild(deleteButton);

//     cartContainer.appendChild(div);
//   });

//   // ✅ Only update the total amount without removing buttons
//   const totalEl = document.getElementById("cart-total-amount");

//   if (totalEl) {
//     totalEl.innerText = `Total: $${(total / 100).toFixed(2)}`;
//   } else {
//     const newTotalEl = document.createElement("div");
//     newTotalEl.id = "cart-total-amount"; // Unique ID to update next time
//     newTotalEl.innerText = `Total: $${(total / 100).toFixed(2)}`;
//     totalContainer.insertBefore(newTotalEl, totalContainer.firstChild);
//   }
// }


//   // ✅ Clear the Cart
//   async clear() {
//     try {
//       const response = await fetch("/cart/clear_cart", {
//         method: "DELETE",
//         headers: {
//           "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
//         },
//       });

//       if (response.ok) {
//         this.renderCart([]); // Clear UI
//       }
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   }

//   // ✅ Remove an Item from the Cart
// async removeFromCart(event) {
//   const id = event.target.dataset.id;       // ✅ Get the item ID
//   const size = event.target.dataset.size;   // ✅ Get the item Size

//   try {
//     const response = await fetch(`/cart/remove_from_cart?id=${id}&size=${size}`, {  // ✅ Pass both ID and Size
//       method: "DELETE",
//       headers: {
//         "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
//       },
//     });

//     if (response.ok) {
//       const updatedCart = await response.json();
//       this.renderCart(updatedCart.items || []);
//     }
//   } catch (error) {
//     console.error("Error removing from cart:", error);
//   }
// }


//   // ✅ Show the Checkout Form
//  async checkout(event) {
//      event.preventDefault();
//      const cartResponse = await fetch("/cart_data")
//      const cartdata =await cartResponse.json();
//      if(cartdata.items.length>0){
       
//     this.checkoutFormTarget.classList.remove("hidden");
//     this.cartTopTarget.classList.add("hidden");
//   }else{
    
//     console.log("checkout triggered")

//     alert("Your cart is empty")
   
//   }

//   // ✅ Place the Order
//   }
// async placeOrder(event) {
//   event.preventDefault();
//   console.log("Placing order...");


//   const email = document.getElementById("email").value;
//   const address = document.getElementById("address").value;

//   try {
//     const cartResponse = await fetch("/cart_data");
//     const cartData = await cartResponse.json();
//     console.log("🛒 Cart Data Before Order:", cartData);

//     if (!cartData.items || cartData.items.length === 0) {
//       alert("❌ Cart is empty. Add items before placing an order.");
//       return;
//     }

//     const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

//     const response = await fetch("/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRF-Token": csrfToken,
//       },
//       body: JSON.stringify({ email, address, cart: cartData.items }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("❌ Error response:", errorText);
//       alert(`Error: ${errorText}`);
//       return;
//     }

//     // ✅ Hide the checkout form
//     this.checkoutFormTarget.classList.add("hidden");
//     this.cartTopTarget.classList.remove("hidden");
//     // ✅ Clear the cart after successful order
//     await this.clear();

//     // ✅ Display success message
//     alert("✅ Order placed successfully!");
//   } catch (error) {
//     console.error("❌ Order submission failed:", error);
//     alert("❌ An error occurred. Please try again.");
//   }
// }

// }

// import { Controller } from "@hotwired/stimulus";

// // Connects to data-controller="cart"
// export default class extends Controller {
//   static targets = ["checkoutForm", "cartTop"];

//   initialize() {
//   console.log("Cart controller initialized");
//   this.fetchCartForCount();

//   // ✅ Fetch cart data when the cart page is loaded
//   if (document.getElementById("cart-items")) {
//     this.fetchCart();
//   }

//   // ✅ Listen for cart updates
//   window.addEventListener("cart:updated", (event) => {
//     this.updateCartCount(event.detail.cart);
//     this.renderCart(event.detail.cart); // ✅ Re-render the cart on updates
//   });
// }


//   // ✅ Fetch Cart Data Just for the Count (on all pages)
//   async fetchCartForCount() {
//     try {
//       const response = await fetch("/cart_data", { method: "GET" });
//       if (response.ok) {
//         const data = await response.json();
//         this.updateCartCount(data.items || []);
//       } else {
//         console.error("Failed to fetch cart:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   }

//   // ✅ Update Cart Count Badge
// updateCartCount(cart) {
//   const cartCountEl = document.getElementById("cart-count");
//   const totalEl = document.getElementById("cart-total-amount");
//   const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
//   const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   // ✅ Update Cart Count
//   if (cartCountEl) {
//     if (totalQuantity > 0) {
//       cartCountEl.textContent = totalQuantity;
//       cartCountEl.classList.remove("hidden");
//     } else {
//       cartCountEl.classList.add("hidden");
//     }
//   }

//   // ✅ Update Total Amount
//   if (totalEl) {
//     totalEl.textContent = `Total: $${(totalAmount / 100).toFixed(2)}`;
//   }
// }


//   // ✅ Fetch Cart Data When Loading the Cart Page
//   async fetchCart() {
//     try {
//       const response = await fetch("/cart_data", { method: "GET" });
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Cart Data from API:", data);
//         this.renderCart(data.items || []);
//         this.updateCartCount(data.items || []); // ✅ Update cart count after rendering the cart
//       } else {
//         console.error("Failed to fetch cart:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   }

//   // ✅ Render the Cart UI
//   renderCart(cart) {
//   console.log("Rendering Cart with Items:", cart); // ✅ Debugging line

//   const cartContainer = document.getElementById("cart-items");
//   const totalContainer = document.getElementById("total");

//   if (!cartContainer) {
//     console.error("❌ Missing element with ID 'cart-items'");
//     return;
//   }

//   cartContainer.innerHTML = ""; // Clear previous cart items

//   if (cart.length === 0) {
//     cartContainer.innerHTML = "<p>Your cart is empty.</p>";
//     return;
//   }

//   let total = 0;
 
//   cart.forEach((item) => {
//     total += item.price * item.quantity;
    
//     const div = document.createElement("div");
//     div.classList.add("mt-2", "cart-item");
//     div.innerHTML = `
//       <strong>${item.name}</strong> - $${(item.price / 100).toFixed(2)} 
//       <br>Size: ${item.size} - Quantity: ${item.quantity}
//     `;
     
//     const deleteButton = document.createElement("button");
//     deleteButton.innerText = "Remove";
//     deleteButton.dataset.id = item.id;
//     deleteButton.dataset.size = item.size;
//     deleteButton.classList.add("bg-gray-500", "rounded", "text-white", "px-2", "py-1", "ml-2");
//     deleteButton.addEventListener("click", this.removeFromCart.bind(this));
//     div.appendChild(deleteButton);
//     cartContainer.appendChild(div);

//   });

//   const totalEl = document.getElementById("cart-total-amount");

//   if (totalEl) {
//     totalEl.innerText = `Total: $${(total / 100).toFixed(2)}`;
//   } else {
//     const newTotalEl = document.createElement("div");
//     newTotalEl.id = "cart-total-amount";
//     newTotalEl.innerText = `Total: $${(total / 100).toFixed(2)}`;
//     totalContainer.appendChild(newTotalEl);
//   }

//   this.updateCartCount(cart); // ✅ Update cart count after rendering
// }


//   // ✅ Clear the Cart
//   async clear() {
//     try {
//       const response = await fetch("/cart/clear_cart", {
//         method: "DELETE",
//         headers: {
//           "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
//         },
//       });

//       if (response.ok) {
//         this.renderCart([]); // Clear UI
//         this.updateCartCount([]); // ✅ Reset cart count to 0
//       }
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   }
//   async checkout(event) {
//     event.preventDefault();
//     const cartResponse = await fetch("/cart_data");
//     const cartdata = await cartResponse.json();
//     if (cartdata.items.length > 0) {
//       this.checkoutFormTarget.classList.remove("hidden");
//       this.cartTopTarget.classList.add("hidden");
//     } else {
//       alert("Your cart is empty");
//     }
//   }
//   // ✅ Remove an Item from the Cart
//   async removeFromCart(event) {
//     const id = event.target.dataset.id;
//     const size = event.target.dataset.size;

//     try {
//       const response = await fetch(`/cart/remove_from_cart?id=${id}&size=${size}`, {
//         method: "DELETE",
//         headers: {
//           "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
//         },
//       });

//       if (response.ok) {
//         const updatedCart = await response.json();
//         this.renderCart(updatedCart.items || []);
//         this.updateCartCount(updatedCart.items || []); // ✅ Update cart count after removal
//       }
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//     }
//   }
//   async placeOrder(event) {
//     event.preventDefault();
//     console.log("Placing order...");

//     const email = document.getElementById("email").value;
//     const address = document.getElementById("address").value;

//     try {
//       const cartResponse = await fetch("/cart_data");
//       const cartData = await cartResponse.json();
//       console.log("🛒 Cart Data Before Order:", cartData);

//       if (!cartData.items || cartData.items.length === 0) {
//         alert("❌ Cart is empty. Add items before placing an order.");
//         return;
//       }

//       const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

//       const response = await fetch("/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRF-Token": csrfToken,
//         },
//         body: JSON.stringify({ email, address, cart: cartData.items }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("❌ Error response:", errorText);
//         alert(`Error: ${errorText}`);
//         return;
//       }
       
//       this.checkoutFormTarget.classList.add("hidden");
//       this.updateCartCount([])
//       this.cartTopTarget.classList.remove("hidden");
//       await this.clear(); // Clear cart after order
//       alert("✅ Order placed successfully!");
//     } catch (error) {
//       console.error("❌ Order submission failed:", error);
//       alert("❌ An error occurred. Please try again.");
//     }
//   }

// }
import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="cart"
export default class extends Controller {
  static targets = ["checkoutForm", "cartTop","checkBot","cartMid"];

  initialize() {
  console.log("Cart controller initialized");
  this.fetchCartForCount();

  // ✅ Fetch cart data when the cart page is loaded
  if (document.getElementById("cart-items")) {
    this.fetchCart();
  }

  // ✅ Listen for cart updates
  window.addEventListener("cart:updated", (event) => {
    this.updateCartCount(event.detail.cart);
    this.renderCart(event.detail.cart); // ✅ Re-render the cart on updates
  });
}


  // ✅ Fetch Cart Data Just for the Count (on all pages)
  async fetchCartForCount() {
    try {
      const response = await fetch("/cart_data", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        this.updateCartCount(data.items || []);
      } else {
        console.error("Failed to fetch cart:", response.status);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }
  // ✅ Update Cart Count Badge
updateCartCount(cart) {
  const cartCountEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total-amount");
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ✅ Update Cart Count
  if (cartCountEl) {
    if (totalQuantity > 0) {
      cartCountEl.textContent = totalQuantity;
      cartCountEl.classList.remove("hidden");
    } else {
      cartCountEl.classList.add("hidden");
    }
  }

  // ✅ Update Total Amount
  if (totalEl) {
    totalEl.textContent = `Total: Rs.${(totalAmount).toFixed(2)}`;
  }
}


  // ✅ Fetch Cart Data When Loading the Cart Page
  async fetchCart() {
    try {
      const response = await fetch("/cart_data", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        console.log("Cart Data from API:", data);
        this.renderCart(data.items || []);
        this.updateCartCount(data.items || []); // ✅ Update cart count after rendering the cart
      } else {
        console.error("Failed to fetch cart:", response.status);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  // ✅ Render the Cart UI
// ✅ Render the Cart UI with Product Images
// ✅ Render the Cart UI with Product Images
renderCart(cart) {
    console.log("Rendering Cart with Items:", cart);

    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("total");
   cartContainer.innerHTML = ""
    if (!cartContainer) {
        console.error("❌ Missing element with ID 'cart-items'");
        return;
    }

    cartContainer.innerHTML = ""; // Clear previous cart items

    if (cart.length === 0) {
      this.checkBotTarget.classList.add("hidden")
      this.cartMidTarget.classList.add("hidden")
        cartContainer.innerHTML = `
  <p class='text-gray-600 text-center'>
    Your cart is empty. Add items to it now 
    <a href="/" class="text-blue-600 hover:underline font-semibold">Shop now.</a>
  </p>
`;

        return;
    }

    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;

        // ✅ Ensure image_url is available
        const imageUrl = item.image_url || "https://via.placeholder.com/150";

        // ✅ Create a new cart item div
        const div = document.createElement("div");
        div.classList.add("flex", "items-center", "border-b", "pb-4", "mt-2", "cart-item");

        // ✅ Product Image Element
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = item.name;
        img.classList.add("w-20", "h-20", "object-contain", "rounded-lg");

        // ✅ Product Details
        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("ml-4", "flex-1");
        detailsDiv.innerHTML = `
            <h3 class="font-semibold text-lg">${item.name}</h3>
            <p class="text-gray-600 text-sm">Rs. ${(item.price).toFixed(2)}</p>
            <p class="text-gray-600 text-sm">Size: ${item.size} - Quantity: ${item.quantity}</p>
        `;

        // ✅ Remove Button
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Remove";
        deleteButton.dataset.id = item.id;
        deleteButton.dataset.size = item.size;
        deleteButton.classList.add("bg-gray-500", "rounded", "text-white", "px-2", "py-1", "ml-auto");
        deleteButton.addEventListener("click", this.removeFromCart.bind(this));

        // ✅ Append Elements to Cart Item
        div.appendChild(img);
        div.appendChild(detailsDiv);
        div.appendChild(deleteButton);
        cartContainer.appendChild(div);
    });

    // ✅ Update Total Amount
    const totalEl = document.getElementById("cart-total-amount");
    if (totalEl) {
        totalEl.innerHTML = `<strong>Total: Rs. ${(total).toFixed(2)}</strong>`;
    } else {
        const newTotalEl = document.createElement("div");
        newTotalEl.id = "cart-total-amount";
        newTotalEl.innerHTML = `<strong>Total: Rs. ${(total).toFixed(2)}</strong>`;
        totalContainer.appendChild(newTotalEl);
    }

    this.updateCartCount(cart); // ✅ Update cart count after rendering
}




  // ✅ Clear the Cart
  async clear() {
    try {
      const response = await fetch("/cart/clear_cart", {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
        },
      });

      if (response.ok) {
        this.renderCart([]); // Clear UI
        this.updateCartCount([]); // ✅ Reset cart count to 0
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }
  async checkout(event) {
    event.preventDefault();
    const cartResponse = await fetch("/cart_data");
    const cartdata = await cartResponse.json();
    if (cartdata.items.length > 0) {
      const head = document.getElementById("headname");
        
        // ✅ Create a list of product names with individual <p> tags
        let productList = `<h3 class="text-lg font-semibold mb-2">Products in Your Cart:</h3>`;
        cartdata.items.forEach(item => {
            productList += `<p class="text-gray-800 text-base">${item.name} - ${item.size}-(${item.quantity})</p>`;
        });

        // ✅ Update the `headname` div with the product list
        head.innerHTML = productList;
      this.checkoutFormTarget.classList.remove("hidden");
      this.cartTopTarget.classList.add("hidden");
      this.checkBotTarget.classList.add("hidden")
    } else {
      alert("Your cart is empty");
    }
  }
  // ✅ Remove an Item from the Cart
  async removeFromCart(event) {
    const id = event.target.dataset.id;
    const size = event.target.dataset.size;

    try {
      const response = await fetch(`/cart/remove_from_cart?id=${id}&size=${size}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
        },
      });

      if (response.ok) {
        const updatedCart = await response.json();
         if (updatedCart.items.length > 0) {
                updatedCart.items.forEach(item => {
                    if (!item.image_url) {
                        item.image_url = `/default-image.jpg`; // Use default placeholder if needed
                    }
                });
            }
        this.renderCart(updatedCart.items || []);
        this.updateCartCount(updatedCart.items || []); // ✅ Update cart count after removal
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }
  async placeOrder(event) {

    event.preventDefault();
    console.log("Placing order...");

    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    try {
      const cartResponse = await fetch("/cart_data");
      const cartData = await cartResponse.json();
      console.log("🛒 Cart Data Before Order:", cartData);

      if (!cartData.items || cartData.items.length === 0) {
        alert("❌ Cart is empty. Add items before placing an order.");
        return;
      }

      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

      const response = await fetch("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ email, address, cart: cartData.items }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error response:", errorText);

        alert(`Error: ${errorText}`);
        return;
      }
       this.cartMidTarget.classList.add("hidden")

       
      this.checkoutFormTarget.classList.add("hidden");
      this.updateCartCount([])
      this.cartTopTarget.classList.remove("hidden");
      await this.clear(); // Clear cart after order
      alert("✅ Order placed successfully!");
    } catch (error) {
      console.error("❌ Order submission failed:", error);
      alert("❌ An error occurred. Please try again.");
    }
  }

}
