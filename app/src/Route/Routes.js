const express = require("express");
const router = express.Router();
const eventController = require("../control/controllers");

// route GET and POST (data)
router.get("/", eventController.getAll);
router.post("/", eventController.post);

// route for search id 
router.get("/:id", eventController.getId);

// route for delete products
router.delete("/delete-product", async (req, res) => {
    try {
      await eventController.deleteProduct(req, res);
    } catch (error) {
      // send error 
      console.error("Error in delete :", error);
      res.status(500).json({ error: "Error server" });
    }
  });

//route for update product
router.put("/update-product", async (req, res) => {
  try {
    await eventController.updateProduct(req, res);
  } catch (error) {
    // send error 
    console.error("Error in update :", error);
    res.status(500).json({ error: "Error server" });
  }
});

//route for login user 
router.post("/login", eventController.loginUser);

//route for feedbacks
router.post("/feedback",eventController.sendFeedback);

//route for create an account
router.post('/register', eventController.registerUser);

//route for reset password
router.post('/reset_password', eventController.newPassword);

module.exports = router;