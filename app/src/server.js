// import express
const express = require("express");
//import controller
const productRoutes = require("./Route/Routes"); 
const bodyParser = require('body-parser');
//import sequelize
const sequelize = require("./models/db");
// import path 
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route for api
app.use("/products", productRoutes);


// route for login 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/login.html"));
});

app.use(express.static("src/public"));  

// Route pour l'accueil
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// GET all data products
app.get("/products", (req, res) => {
    const query = "SELECT * FROM Bakery_Products";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error catch products :", err);
            res.status(500).json({ error: "Error Server" });
        } else {
            res.status(200).json(results);
        }
    });
});

// GET one product by ID
app.get("/products", (req, res) => {
    const productId = req.params.id; // GET ID from parameter
    const query = "SELECT * FROM Bakery_Products WHERE id = ?"; // Request SQL with ID

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error("Error fetching product by ID:", err);
            res.status(500).json({ error: "Error Server" });
        } else if (results.length === 0) {
            res.status(404).json({ error: "Product not found" }); // return error 
        } else {
            res.status(200).json(results[0]); // return product
        }
    });
});


// start server
app.listen(PORT, () => {
    console.log(` Start server on http://localhost:${PORT}`);
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Unable to connect to the database:", error));


module.exports = app; 