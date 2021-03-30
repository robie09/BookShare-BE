const { Request, BookRequest, Book, User } = require('../db/models');

exports.PENDING = 0;
exports.ACCEPTED = 1;
exports.REJECTED = 2;

exports.fetchRequest = async (userId, next) => {
	try {
		let re = await Request.findAll({
			where: {
				user1Id: userId,
			},
		});

		return re;
	} catch (error) {
		next(error);
	}
};

exports.viewRequest = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const request = await this.fetchRequest(userId, next);
		res.json(request);
	} catch (error) {
		next(error);
	}
};

exports.sendRequest = async (req, res, next) => {
	try {
		req.body.user1Id = req.user.id;
		req.body.user2Id = req.params.user2Id;
		req.body.status = this.PENDING;
		req.body.bookId = req.body.bookId;

		const newRequest = await Request.create(req.body);
		newRequest.addBook(req.body.books);
		res.json(newRequest);
	} catch (error) {
		next(error);
	}
};

exports.acceptRequest = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const request = await this.fetchRequest(userId, next);
		if (request) {
			await request[0].update(
				{
					status: this.ACCEPTED,
				},
				{
					where: {
						user1Id: req.user.id,
						user2Id: req.params.user2Id,
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
		const userId = req.user.id;

		const request = await this.fetchRequest(userId, next);
		if (request) {
			await request[0].update(
				{
					status: this.REJECTED,
				},
				{
					where: {
						user1Id: req.user.id,
						user2Id: req.params.user2Id,
					},
				}
			);
			res.status(204).end();
		}
	} catch (error) {
		next(error);
	}
};
