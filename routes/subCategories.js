const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
	subCategoryList,
	subCategorysCreate,
	fetchSubCategory,
	subCategoryDetail,
	categoryCreate,
} = require("../controllers/SubCategoryControllers");

router.param("subCategoryId", async (req, res, next, subCategoryId) => {
	const foundSubCategory = await fetchSubCategory(subCategoryId, next);
	if (foundSubCategory) {
		req.subCategory = foundSubCategory;
		next();
	} else {
		next({
			status: 404,
			message: "subCategory not found",
		});
	}
});

router.get("/", subCategoryList);

router.post("/", upload.single("image"), subCategorysCreate);

router.get("/:subCategoryId", subCategoryDetail);

router.post(
	"/:subCategoryId/categoryCreate",
	upload.single("image"),
	categoryCreate
);

module.exports = router;
