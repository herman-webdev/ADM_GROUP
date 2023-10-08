import Joi from 'joi';
import { emailSchema, passwordSchema, idSchema, stringSchema, } from './common';

export const userIdSchema = Joi.object({
	id: idSchema.required(),
	email: emailSchema,
	password: passwordSchema.required(),
}).label('User');

export const userSchema = Joi.object({
	id: idSchema.required(),
	firstName: stringSchema,
	lastName: stringSchema,
	email: emailSchema,
}).label('User');

export const userSearchSchema = Joi.object({
	email: emailSchema.allow('').optional(),
}).label('User Search');

export const changeDataSchema = Joi.object({
	id: idSchema.required(),
	firstName: stringSchema,
	lastName: stringSchema,
}).label('Data Change')
