const express = require('express');
const upload = require('../middleware/multer');
const passport = require('passport');
const router = express.Router();
const {
	sendRequest,
	acceptRequest,
	rejectRequest,
	viewRequest,
} = require('../controllers/requestController');
router.post(
	'/sendRequest',
	passport.authenticate('jwt', { session: false }),
	sendRequest
);
router.put(
	'/acceptRequest/:user2Id',
	passport.authenticate('jwt', { session: false }),
	acceptRequest
);
router.put(
	'/rejectRequest/:user2Id',
	passport.authenticate('jwt', { session: false }),
	rejectRequest
);
router.get(
	'/viewRequest',
	passport.authenticate('jwt', { session: false }),
	viewRequest
);
module.exports = router;
