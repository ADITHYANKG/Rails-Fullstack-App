// app/javascript/controllers/sample_controller.js
import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="sample"
export default class extends Controller {
  connect() {
    console.log("Sample Controller Connected!");
  }
disconnect() {
  console.log("Sample Controller Disconnected!");
}
  greet() {
    alert("Hello from Stimulus!");
  }
}
