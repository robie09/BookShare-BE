const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  categoryList,
  categoryCreate,
  categoryOfBook,
  fetchCategory,
} = require("../controllers/categoryController");

router.param("categoryId", async (req, res, next, categoryId) => {
  const foundCategory = await fetchCategory(categoryId, next);
  if (foundCategory) {
    req.category = foundCategory;
    next();
  } else {
    next({
      status: 404,
      message: "category not found",
    });
  }
});

router.post("/", upload.single("image"), categoryCreate);

module.exports = router;
