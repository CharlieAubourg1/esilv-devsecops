if (document.body.classList.contains("index")) {
    // code for index.html page
  // GET and display products
  async function fetchProducts() {
      try {
          const response = await fetch("http://localhost:3000/products", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
              const products = await response.json();
              console.log("Product catch:", products);

              const tableBody = document.querySelector("#inventory tbody");
              tableBody.innerHTML = ""; // Clear old rows

              products.forEach((product) => {
                  const row = document.createElement("tr");
                  row.innerHTML = `
                      <td>${product.id || "-"}</td>
                      <td>${product.product_name || "-"}</td>
                      <td>${product.category || "-"}</td>
                      <td>${product.price || "-"}</td>
                      <td>${product.ingredients || "-"}</td>
                      <td>${product.quantity || "0"}</td>
                      <td>${product.productionDate || "-"}</td>
                      <td>${product.expirationDate || "-"}</td>
                  `;
                  tableBody.appendChild(row);
              });
          } else {
              console.error("Error getting products.");
          }
      } catch (error) {
          console.error("Error with request:", error);
      }
  }

  // Call function to fetch data
  fetchProducts();

  // Add new product
  document.getElementById("add-product-form").addEventListener("submit", async (event) => {
      event.preventDefault();

      const productData = {
          product_name: document.getElementById("product-name").value,
          category: document.getElementById("category").value,
          price: parseFloat(document.getElementById("price").value),
          ingredients: document.getElementById("ingredients").value,
          quantity: document.getElementById("quantity").value,
          productionDate: document.getElementById("production-date").value,
          expirationDate: document.getElementById("expiration-date").value || null,
      };

      try {
          const response = await fetch("http://localhost:3000/products", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(productData),
          });

          if (response.ok) {
              alert("Product added successfully!");
              fetchProducts(); // Reload data
              event.target.reset(); // Reset form
          } else {
              alert("Failed to add the product.");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred.");
      }
  });

  // DELETE a product
  document.getElementById("button_delete").addEventListener("click", async (event) => {
      event.preventDefault();
      const deleteType = document.getElementById("deleteType").value.trim();
      const deleteQuery = document.getElementById("deleteQuery").value.trim();

      try {
          const response = await fetch("/products/delete-product", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ deleteType, deleteQuery }),
          });

          if (!response.ok) {
              const err = await response.json();
              throw new Error(err.error || "Error in delete.");
          }

          const data = await response.json();
          alert(data.message || "Product deleted successfully!");
          fetchProducts(); // Update data
          document.getElementById("deleteForm").reset(); // Reset form
      } catch (error) {
          console.error("Error:", error.message);
          alert(error.message);
      }
  });

  // Update product
  document.getElementById("button_update").addEventListener("click", async (event) => {
      event.preventDefault();

      const updateType = document.getElementById("updateType").value.trim();
      const updateQuery = document.getElementById("updateQuery").value.trim();
      const quantity = document.getElementById("new_quantity").value.trim();

      try {
          const response = await fetch("/products/update-product", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ updateType, updateQuery, quantity }),
          });

          if (!response.ok) {
              const err = await response.json();
              throw new Error(err.error || "Error in update.");
          }

          const data = await response.json();
          alert(data.message || "Product updated successfully!");
          fetchProducts(); // Update data
          document.getElementById("update-stock-form").reset(); // Reset form
      } catch (error) {
          console.error("Error:", error.message);
          alert(error.message);
      }
  });
} else if (document.body.classList.contains("login")) {
    // code for login page
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
      
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
      
        try {
          const response = await fetch("/products/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
          });
      
          const data = await response.json();
      
          if (!response.ok) throw new Error(data.error);
      
          alert("Welcome " + data.username);
          document.getElementById("login-form").reset(); // Reset form
          window.location.href = "/index";
        } catch (err) {
          alert(err.message);
        }
      });
} else if (document.body.classList.contains("feedback")){
    // code for feedback page
    document.getElementById("feedback-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const message = document.getElementById("message").value.trim();
    
        const ratings = {
          add: parseInt(document.getElementById("rate-add").value),
          update: parseInt(document.getElementById("rate-update").value),
          inventory: parseInt(document.getElementById("rate-inventory").value),
          delete: parseInt(document.getElementById("rate-delete").value),
        };
    
        try {
          const response = await fetch("/products/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message, ratings }),
          });
    
          const result = await response.json();
          document.getElementById("response-msg").textContent = result.message || "Thank for your feedback !";
          document.getElementById("feedback-form").reset(); //reset form
          setTimeout(() => {
            document.getElementById("response-msg").textContent = "";
          }, 15000);
        } catch (err) {
          console.error("Erreur:", err);
          document.getElementById("response-msg").textContent = "Error in sending feedback";
        }
      });
} else if (document.body.classList.contains("create")){
    // code for create_account page 
    const countrySelect = document.getElementById("country");
    const regionNames = new Intl.DisplayNames(['fr'], { type: 'region' });
    // code for generate list country
    const countryCodes = [
      "AF","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY",
      "BE","BZ","BJ","BM","BT","BO","BA","BW","BR","BN","BG","BF","BI","CV","KH","CM","CA","CF","TD","CL",
      "CN","CO","KM","CG","CD","CR","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE",
      "SZ","ET","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS",
      "IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB",
      "LS","LR","LY","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","FM","MD","MC","MN",
      "ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","NO","OM","PK","PW","PA","PG","PY","PE",
      "PH","PL","PT","QA","RO","RU","RW","KN","LC","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK",
      "SI","SB","SO","ZA","SS","ES","LK","SD","SR","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TO","TT",
      "TN","TR","TM","TV","UG","UA","AE","GB","US","UY","UZ","VU","VA","VE","VN","YE","ZM","ZW"
    ];

    countryCodes.forEach(code => {
      const option = document.createElement("option");
      option.value = code.toLowerCase();
      option.textContent = regionNames.of(code);
      countrySelect.appendChild(option);
    });
    //code for create an account and check password
    document.querySelector("form").addEventListener("submit", async function (e) {
        e.preventDefault(); // cancel default reload
      
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
      
        if (password !== confirmPassword) {
          alert("Password are different !");
          return;
        }
      
        const data = {
          username: document.getElementById("username").value,
          password,
          confirmPassword,
          email: document.getElementById("email").value,
          firstname: document.getElementById("firstname").value,
          lastname: document.getElementById("lastname").value,
          country: document.getElementById("country").value,
        };
      
        try {
          const response = await fetch("products/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      
          const result = await response.json();
      
          if (response.ok) {
            alert("Sucess create your account !");
            this.reset();
            window.location.href="/login.html";
          } else {
            alert("Error : " + result.error);
          }
        } catch (error) {
          console.error("Error network :", error);
          alert("Error server or network. Try later");
        }
      });
}else if (document.body.classList.contains("forgot")){
      const form = document.getElementById('change-password-form');
    
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const username = document.getElementById('username').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
    
        try {
          const response = await fetch('/products/reset_password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, newPassword, confirmPassword }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            alert(data.message);
            window.location.href = 'login.html'; // if sucess open login page
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred.');
        }
      });
  }
    