/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Hapi from '@hapi/hapi';
import { UserRepository, } from '../repositories';
import { IUserId, } from 'server/interfaces';
import { Errors, ErrorsMessages, Exception, handlerError, } from '../utils';
import { IOutputOk, IUpdateData, } from '../interfaces';
import { Boom, } from '@hapi/boom';
import { User, } from 'server/database/models';

export async function getUserById(r: Hapi.Request): Promise<IOutputOk<User> | Boom> {
	try{
		const { id, } = r.params as IUserId;
        
		const user = await UserRepository.findById(id)
		if(!user) {
			throw new Exception(Errors.UserNotFound, ErrorsMessages[Errors.UserNotFound], {
				id: id,
			});
		} else {
			return {
				ok: true,
				result: user,
			}
		}
	} catch(err) {
		return handlerError('Failed to search a user', err);
	}
}


export async function dataChange(r: Hapi.Request): Promise<IOutputOk<[number, User[]]> | Boom> {
	try {
		const creds = r.auth.credentials?.user as IUserId;
		const payload = r.payload as IUpdateData; 

		const updatedUser = await UserRepository.update(payload, {}, creds.id);
		if (!updatedUser) {
			throw new Exception(Errors.UserNotFound, ErrorsMessages[Errors.UserNotFound], {
				id: creds.id,
			});
		} 
		return {
			ok: true,
			result: updatedUser,
		};

	} catch (err) {
		return handlerError('Failed to update user data', err);
	}
}


