import { signInDef, signIn } from './sign-in';

const defs = [
	signInDef
];

export const QueryDef = defs.length > 0 ? `
	type Query {
		${ defs.join('\n\t\t') }
	}
` : '';

export const Query = defs.length > 0 ? {
	signIn
} : null;