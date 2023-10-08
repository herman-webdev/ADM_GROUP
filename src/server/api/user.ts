import * as Hapi from '@hapi/hapi';
import { UserRepository, } from '../repositories';
import { IUserId, } from 'server/interfaces';
import { Errors, ErrorsMessages, Exception, handlerError, } from '../utils';
import { IOutputOk, } from '../interfaces';
import { Boom, } from '@hapi/boom';
import { User, } from 'server/database/models';

export async function getUserById(r: Hapi.Request): Promise<IOutputOk<User> | Boom> {
	try{
		const { id, } = r.params as IUserId;
        
		const user = await UserRepository.findById(id)
		console.log(user?.id)
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