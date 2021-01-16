import {
	allReviews,
	getReviewById,
	createReview,
	updateReview,
	deleteReviewById,
} from './lib/reviews';

export const resolvers = {
	// Queries
	getAllAlbumReviews: async () => await allReviews(),
	getAlbumReview: async ({ id }) => await getReviewById(id),

	// Mutations
	createAlbumReview: async (reviewData) => await createReview(reviewData),
	updateAlbumReview: async (reviewData) => await updateReview(reviewData),
	deleteAlbumReview: async ({ id }) => await deleteReviewById(id),
};
