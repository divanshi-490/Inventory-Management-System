const API = "http://localhost:5000/api";

// REGISTER
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/auth/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message);
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message);

  if (data.message === "Login successful") {
    window.location = "/dashboard";
  }
}

// LOGOUT
function logout() {
  window.location = "/login";
}

// ADD PRODUCT (CLEANED)
async function addProduct() {

  const data = {
    name: document.getElementById("name").value,
    price: Number(document.getElementById("price").value),
    quantity: Number(document.getElementById("quantity").value),
    category: document.getElementById("category").value,
    unit: document.getElementById("unit").value || "kg"
  };

  await fetch(API + "/products", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  loadProducts();
}

// LOAD PRODUCTS (CLEANED)
async function loadProducts() {
  const res = await fetch(API + "/products");
  const data = await res.json();

  if (document.getElementById("list")) {
    list.innerHTML = "";
  }

  data.forEach(p => {

    if (document.getElementById("list")) {
      list.innerHTML += `
      <div class="card">
        <b>${p.name || "N/A"}</b> (${p.category || "-"})<br>
        ₹${p.price || 0} <br>
        ${p.quantity || 0} ${p.unit ? p.unit : "kg"}<br>

        <br>
        <button onclick='editProduct("${p._id}")'>Edit</button>
        <button onclick="del('${p._id}')">Delete</button>
      </div>`;
    }
  });

  if (document.getElementById("total")) {
    total.innerText = data.length;
  }
}

// DELETE
async function del(id) {
  await fetch(API + "/products/" + id, { method: "DELETE" });
  loadProducts();
}

// UPDATE (UNCHANGED)
async function editProduct(id) {

  const res = await fetch(API + "/products");
  const products = await res.json();
  const p = products.find(x => x._id === id);

  const nameVal = prompt("Name", p.name);
  if (!nameVal) return;

  const priceVal = Number(prompt("Price", p.price));
  const qtyVal = Number(prompt("Quantity", p.quantity));
  const categoryVal = prompt("Category", p.category);
  const unitVal = prompt("Unit", p.unit);

  await fetch(API + "/products/" + id, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: nameVal,
      price: priceVal,
      quantity: qtyVal,
      category: categoryVal,
      unit: unitVal
    })
  });

  loadProducts();
}

// AUTO LOAD
if (
  window.location.pathname.includes("dashboard") ||
  window.location.pathname.includes("products") ||
  window.location.pathname.includes("reports")
) {
  loadProducts();
}(script.js)
