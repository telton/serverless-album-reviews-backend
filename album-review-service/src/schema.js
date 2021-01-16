import { buildSchema } from 'graphql';

export const schema = buildSchema(`
	type Review {
		id: String!
		album: String!
		albumUrl: String!
		band: String!
		genre: String!
		stars: Int!
		comments: String!
		user: String!
		createdAt: String!
		updatedAt: String!
	}

	type Query {
		getAllAlbumReviews: [Review]!
		getAlbumReview(id: String!): Review
	}

	type Mutation {
		createAlbumReview(album: String!, albumUrl: String! band: String!, genre: String!, stars: Int!, comments: String!): Review

		updateAlbumReview(id: String!, album: String!, albumUrl: String!, band: String!, genre: String!, stars: Int!, comments: String!): Review

		deleteAlbumReview(id: String!): Boolean!
	}
`);
