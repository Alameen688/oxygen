import express from 'express';
let router = express.Router();

router.get('/', (req, res, next) => {
	return res
		.status(200)
		.json({
			status: 200,
			data: [
				{
					title: "On a codeine diet"
				},
				{
					title: "A day I'll never forget"
				}
			]
		});
});

module.exports = router;