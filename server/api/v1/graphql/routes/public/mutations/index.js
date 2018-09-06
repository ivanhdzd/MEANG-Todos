import { signUpDef, signUp } from './sign-up';

const defs = [
	signUpDef
];

export const MutationDef = defs.length > 0 ? `
	type Mutation {
		${ defs.join('\n\t\t') }
	}
` : '';

export const Mutation = defs.length > 0 ? {
	signUp
} : null;