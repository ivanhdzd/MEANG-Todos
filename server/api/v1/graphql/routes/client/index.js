import { ApolloServer, gql } from 'apollo-server-express';

import { TypeDef } from './types';
import { QueryDef, Query  } from './queries';
import { MutationDef, Mutation } from './mutations';
import { SubscriptionDef, Subscription } from './subscriptions';
import { authenticate } from '../../../functions/authentication';

/**
 * Set GraphQL Client API inside an express and a http servers.
 * @param {Express} app Express server instance.
 * @param {HttpServer} server instance.
 * @param {string} path GraphQL route.
 * @returns {Object} GraphQL queries/mutations and subscriptions paths
 */
export function setGraphQLClientAPI(app, server, path) {
	/** Create GraphQL type definitions. */
	const typeDefs = gql`${ [
		TypeDef,
		QueryDef,
		MutationDef,
		SubscriptionDef
	].join('\n') }`;

	/** GraphQL object resolvers. */
	const resolvers = {
		...Query && { Query },
		...Mutation && { Mutation },
		...Subscription && { Subscription }
	};

	/**
	 * GraphQL context function.
	 * Get request data (if it's available).
	 * Here goes code to validate users (if it's required) by authorization header.
	 * If needs to cancel access, launch an error:
	 * throw new Error('Access denied.');
	 * @param data contains two objects inside: { req, connection }
	 * @returns {Object} JSON object.
	 */
	async function context({ req, connection }) {
		if (!req && connection) return null;
		if (!req.headers) throw new Error('Request headers is undefined.');
		const user = await authenticate(req.headers.authorization);
		return { user };
	}

	/**
	 * GraphQL subscription object.
	 * Get subscription connection params.
	 * Here goes code to validate users (if it's required) by authorization connection param.
	 * If needs to cancel access, launch an error:
	 * throw new Error('Access denied.');
	 * @returns {Object} JSON object.
	 */
	const subscriptions = { onConnect: async (connectionParams, webSocket) => {
		const user = await authenticate(connectionParams.authorization);
		return { user };
	}, path };

	/**
	 * Format error handler function.
	 * @param err data to show in console/terminal.
	 * @returns {Error} new error.
	 */
	function formatError(err) {
		console.error('ERROR: [graphql/client]:', err);
		return err.message || err;
	}

	/** Create new ApolloServer */
	const apolloServer = new ApolloServer({ typeDefs, resolvers, context, subscriptions, formatError });
	/** Apply middleware to express app */
	apolloServer.applyMiddleware({ app, path });
	/** Install GraphQL subscription handlers */
	apolloServer.installSubscriptionHandlers(server);
	/** Returns GraphQL queries/mutations and subscriptions paths */
	return {
		graphqlClientPath: apolloServer.graphqlPath,
		graphqlClientSubsPath: apolloServer.subscriptionsPath
	};
}