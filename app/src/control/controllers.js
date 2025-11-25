const { Products, User, Feedback } = require("../models/models_data"); 

// function for add product POST
exports.post = async (req, res, next) => {
    try {
        const { product_name, category, price, ingredients, quantity, productionDate, expirationDate } = req.body;

        // create new product database
        const newProduct = await Products.create({
            product_name,
            category,
            price,
            ingredients,
            quantity,
            productionDate,
            expirationDate,
        });

        // Response with message and product
        res.status(201).json({
            message: "Product added successfully!",
            product: newProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add the product.",
            error: error.message,
        });
    }
};

// function get all products
exports.getAll = async (req, res, next) => {
    try {
        // GET all products database
        const products = await Products.findAll();

        // Response with all products
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve all products.",
            error: error.message,
        });
    }
};

//function id only one products 
exports.getId = async (req, res, next) => {
    try {
        // select id
        const productId = req.params.id; // Get id from research 
        const product = await Products.findByPk(productId);

        // Response with products
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve products.",
            error: error.message,
        });
    }
};

//DELETE one products
exports.deleteProduct = async (req, res) => {  
  // for send data from url and body 
    const deleteType = req.body.deleteType || req.query.deleteType;
    let deleteQuery = req.body.deleteQuery || req.query.deleteQuery;
  
    console.log("Reçu pour suppression:", req.body, typeof deleteQuery); // Debug
  
    try {
      // check field is not empty
      if (!deleteType || !deleteQuery) {
        return res.status(400).json({ error: "Field empty" });
      }
  
      // link frontend and backend name
      const fieldMap = {
        id: "id",
        name: "product_name", 
      };
  
      // check field is valid 
      if (!fieldMap[deleteType]) {
        return res.status(400).json({ error: "Field delete incorrect" });
      }
  
      const dbField = fieldMap[deleteType];
  
      // Convert type js
      if (dbField === "id") {
        deleteQuery = parseInt(deleteQuery, 10);
        if (isNaN(deleteQuery)) {
          return res.status(400).json({ error: "ID must be a integer" });
        }
      } else {
        deleteQuery = String(deleteQuery).trim();
      }
  
      const condition = {};
      condition[dbField] = deleteQuery;
      console.log("Deletion condition:", condition);
  
      // delete product
      const result = await Products.destroy({ where: condition });
      console.log("Result of deletion:", result);
  
      if (result === 0) {
        return res.status(404).json({ message: "Product not find " });
      }
  
      return res.status(200).json({ message: "Product delete with sucess" });
  
    } catch (error) {
      console.error("Error delete:", error);
      return res.status(500).json({ error: "Error server" });
    }
  };
  
// UPDATE product
exports.updateProduct = async (req, res) => {
  const updateType = req.body.updateType || req.query.updateType;
  let updateQuery = req.body.updateQuery || req.query.updateQuery;
  let quantity = req.body.quantity;

  console.log("Get for update:", req.body, typeof updateQuery);

  try {
    if (!updateType || !updateQuery || quantity === undefined) {
      return res.status(400).json({ error: "Field are missing" });
    }

    const fieldMap = {
      id: "id",
      name: "product_name",
    };

    if (!fieldMap[updateType]) {
      return res.status(400).json({ error: "Field for update incorrect" });
    }

    const dbField = fieldMap[updateType];

    if (dbField === "id") {
      updateQuery = parseInt(updateQuery, 10);
      if (isNaN(updateQuery)) {
        return res.status(400).json({ error: "ID must be integer" });
      }
    } else {
      updateQuery = String(updateQuery).trim();
    }

    quantity = parseInt(quantity, 10);
    if (isNaN(quantity)) {
      return res.status(400).json({ error: "Quantity must be a number" });
    }

    const condition = {};
    condition[dbField] = updateQuery;

    const [updatedCount] = await Products.update(
      { quantity },
      { where: condition }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Product not find or already update" });
    }

    return res.status(200).json({ message: "Quantity update with sucess" });

  } catch (error) {
    console.error("Error in update:", error);
    return res.status(500).json({ error: "Error server" });
  }
};

// Check value user for connection
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Field are missing" });
    }

    const user = await User.findOne({ where: { username, password } });

    if (!user) {
      return res.status(401).json({ error: "Data incorrect" });
    }

    res.status(200).json({ message: "Sucess connect", username: user.username });

  } catch (error) {
    console.error("Error connexion:", error);
    res.status(500).json({ error: "Error server" });
  }
};

//catch feedbacks
exports.sendFeedback = async (req, res) => {
  const { name, message, ratings } = req.body;

  if (!name || !message || !ratings) {
    return res.status(400).json({ error: "Field are missing." });
  }

  try {
    const feedback = await Feedback.create({
      name,
      message,
      rate_add: ratings.add,
      rate_update: ratings.update,
      rate_inventory: ratings.inventory,
      rate_delete: ratings.delete,
    });
    res.status(201).json({ message: "Feedback sent successfully !", feedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Error server." });
  }
};

// POST new user
exports.registerUser = async (req, res) => {
  const { username, password, confirmPassword, email, firstname, lastname, country } = req.body;

  // Validation basique
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    const user = await User.create({
      username,
      password,
      email,
      firstname,
      lastname,
      country
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// POST new password
exports.newPassword = async (req, res) => {
  try {
    const { username, newPassword, confirmPassword } = req.body;

    // check if fields are not empty
    if (!username || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // check password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // save password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};