const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
	signup,
	signin,
	myprofile,
	fetchUser,
	updateProfile,
	viewProfile,
} = require('../controllers/userControllers');

const upload = require('../middleware/multer');

router.param('userId', async (req, res, next, userId) => {
	const foundUser = await fetchUser(userId, next);
	if (foundUser) {
		req.user = foundUser;
		next();
	} else {
		next({
			status: 404,
			message: 'User Not Found',
		});
	}
});

router.post('/signup', upload.single('image'), signup);

router.post(
	'/signin',
	passport.authenticate('local', { session: false }),
	signin
);

router.get(
	'/myprofile',
	passport.authenticate('jwt', { session: false }),
	myprofile
);

router.put(
	'/myprofile',
	passport.authenticate('jwt', { session: false }),
	upload.single('image'),
	updateProfile
);

router.get(
	'/viewProfile/:userId',
	passport.authenticate('jwt', { session: false }),
	viewProfile
);

module.exports = router;
