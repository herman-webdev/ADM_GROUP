import Joi from 'joi';
import { emailSchema, guidSchema, stringSchema, } from './common';


export const userSchema = Joi.object({
	id: guidSchema.required(),
	firstName: stringSchema,
	lastName: stringSchema,
	email: emailSchema,
}).label('User');

export const changeDataSchema = Joi.object({
	firstName: stringSchema.required(),
	lastName: stringSchema.required(),
}).label('Data Change')
