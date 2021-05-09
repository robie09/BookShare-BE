const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
	categoryList,
	categoryCreate,
	fetchCategory,
} = require("../controllers/categoryControllers");

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

router.get("/", categoryList);

module.exports = router;
