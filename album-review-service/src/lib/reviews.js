import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

export const allReviews = async () => {
	let reviews = [];

	try {
		const result = await dynamoDB
			.scan({
				TableName: TABLE_NAME,
			})
			.promise();

		reviews = result.Items;
	} catch (err) {
		console.error(err);
		// TODO: Better error handling.
	}

	return reviews;
};

export const getReviewById = async (id) => {
	let review;

	try {
		const result = await dynamoDB
			.get({
				TableName: TABLE_NAME,
				Key: { id },
			})
			.promise();

		review = result.Item;
	} catch (err) {
		console.error(err);
		// TODO: Better error handling.
	}

	return review;
};

export const createReview = async ({
	album,
	albumUrl,
	band,
	genre,
	stars,
	comments,
}) => {
	const now = new Date();

	const review = {
		id: uuid(),
		album,
		albumUrl,
		band,
		genre,
		stars,
		comments,
		user: 'Tyler',
		createdAt: now.toISOString(),
		updatedAt: now.toISOString(),
	};

	try {
		await dynamoDB
			.put({
				TableName: TABLE_NAME,
				Item: review,
			})
			.promise();
	} catch (err) {
		console.log(err);
		// TODO: Better error handling.
	}

	return review;
};

export const updateReview = async ({
	id,
	album,
	albumUrl,
	band,
	genre,
	stars,
	comments,
}) => {
	const now = new Date();

	let updatedReview;
	const review = await getReviewById(id);

	// We have a valid review. Update it.
	if (review) {
		const params = {
			TableName: TABLE_NAME,
			Key: { id },
			UpdateExpression:
				'set album = :album, albumUrl = :albumUrl, band = :band, genre = :genre, stars = :stars, comments = :comments, updatedAt = :updatedAt',
			ExpressionAttributeValues: {
				':album': album,
				':albumUrl': albumUrl,
				':band': band,
				':genre': genre,
				':stars': stars,
				':comments': comments,
				':updatedAt': now.toISOString(),
			},
			ReturnValues: 'ALL_NEW',
		};

		try {
			const result = await dynamoDB.update(params).promise();

			updatedReview = result.Attributes;
		} catch (err) {
			console.error(err);
			throw err;
			// TODO: Better error handling.
		}
	}

	return updatedReview;
};

export const deleteReviewById = async (id) => {
	const review = await getReviewById(id);

	// Can't delete a review if the ID is not found...
	if (!review) {
		return false;
	}

	try {
		await dynamoDB
			.delete({
				TableName: TABLE_NAME,
				Key: { id },
			})
			.promise();
	} catch (err) {
		console.error(err);
		// TODO: Better error handling.
		return false;
	}

	return true;
};
