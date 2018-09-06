import { ApolloServer, gql } from 'apollo-server-express';

import { TypeDef } from './types';
import { QueryDef, Query  } from './queries';
import { MutationDef, Mutation } from './mutations';

/**
 * Set GraphQL Client API inside an express and a http servers.
 * @param {Express} app Express server instance.
 * @param {string} path GraphQL route.
 * @returns {Object} GraphQL queries/mutations path.
 */
export function setGraphQLPublicAPI(app, path) {
	/** Create GraphQL type definitions. */
	const typeDefs = gql`${ [
		TypeDef,
		QueryDef,
		MutationDef
	].join('\n') }`;

	/** GraphQL object resolvers. */
	const resolvers = {
		...Query && { Query },
		...Mutation && { Mutation }
	};

	/**
	 * Format error handler function.
	 * @param err data to show in console/terminal.
	 * @returns {Error} new error.
	 */
	function formatError(err) {
		console.error('ERROR: [graphql/public]:', err);
		return err.message || err;
	}

	/** Create new ApolloServer */
	const server = new ApolloServer({ typeDefs, resolvers, formatError });
	/** Apply middleware to express app */
	server.applyMiddleware({ app, path });
	/** Returns GraphQL queries/mutations path */
	return { graphqlPublicPath: server.graphqlPath };
}