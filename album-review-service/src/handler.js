import { graphql } from 'graphql';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import { schema } from './schema';
import { resolvers } from './resolvers';

const graphQLHandler = async (event, context, callback) => {
	try {
		const result = await graphql(
			schema,
			event.queryStringParameters.query,
			resolvers
		);
		return {
			body: JSON.stringify(result.data, null, 2),
			headers: {
				/* Required for CORS support to work */
				'Access-Control-Allow-Origin': '*',
				/* Required for cookies, authorization headers with HTTPS */
				'Access-Control-Allow-Credentials': true,
			},
			statusCode: 200,
		};
	} catch (err) {
		return {
			body: JSON.stringify({ error: err }),
			headers: {
				/* Required for CORS support to work */
				'Access-Control-Allow-Origin': '*',
				/* Required for cookies, authorization headers with HTTPS */
				'Access-Control-Allow-Credentials': true,
			},
		};
	}
};

export const query = middy(graphQLHandler).use(
	cors({
		origin: '*',
		origins: ['*'],
		credentials: true,
	})
);
