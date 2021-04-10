const { Request, Book, MyBook, BookRequest } = require("../db/models");

exports.PENDING = 0;
exports.ACCEPTED = 1;
exports.REJECTED = 2;

exports.fetchRequest = async (receivedUserId, requstUserId, next) => {
	try {
		let re = await Request.findOne({
			where: {
				requstUserId,
				receivedUserId,
			},
		});

		return re;
	} catch (error) {
		next(error);
	}
};

exports.viewRequest = async (req, res, next) => {
	try {
		const user = req.user;
		const userId = user.id;
		let request = await Request.findAll({
			include: {
				model: MyBook,
				through: { attributes: [] },
				include: { model: Book, as: "books" },
			},
			where: {
				receivedUserId: userId,
			},
		});

		res.json(request);
	} catch (error) {
		next(error);
	}
};

exports.sendRequest = async (req, res, next) => {
	try {
		req.body.requstUserId = req.user.id;
		req.body.receivedUserId = req.body.receivedUserId;
		req.body.status = this.PENDING;

		const newRequest = await Request.create(req.body);
		newRequest.addMyBook(req.body.bookId);
		newRequest.addMyBook(req.body.books);

		res.json(newRequest);
	} catch (error) {
		next(error);
	}
};

exports.acceptRequest = async (req, res, next) => {
	try {
		const receivedUserId = req.user.id;
		const requstUserId = req.params.user2Id;
		const request = await this.fetchRequest(receivedUserId, requstUserId, next);
		if (request) {
			await request.update(
				{
					status: this.ACCEPTED,
				},
				{
					where: {
						requstUserId,
						receivedUserId,
					},
				}
			);

			res.status(204).end();
		}
	} catch (error) {
		next(error);
	}
};

exports.rejectRequest = async (req, res, next) => {
	try {
		const receivedUserId = req.user.id;
		const requstUserId = req.params.user2Id;
		const request = await this.fetchRequest(receivedUserId, requstUserId, next);
		if (request) {
			await request.update(
				{
					status: this.REJECTED,
				},
				{
					where: {
						requstUserId,
						receivedUserId,
					},
				}
			);

			res.status(204).end();
		}
	} catch (error) {
		next(error);
	}
};
