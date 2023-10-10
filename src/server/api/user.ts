/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Hapi from '@hapi/hapi';
import { UserRepository, } from '../repositories';
import { IUserId, } from 'server/interfaces';
import { Errors, ErrorsMessages, Exception, handlerError, } from '../utils';
import { IOutputOk, IUpdateData, IOutputPagination, } from '../interfaces';
import { Boom, } from '@hapi/boom';
import { User, } from 'server/database/models';


export async function getAllUsers(r: Hapi.Request): Promise<IOutputPagination<User | User[]> | Boom> {
	try {
		const { email, } = r.params;
		const { page = '1', pageSize = '30', } = r.query;
	
		const pageInt = parseInt(page as string, 10);
		const pageSizeInt = parseInt(pageSize as string, 10);

		if (email) {
			const user = await UserRepository.findByEmail(email as string, {});
			if (!user) {
				throw new Exception(Errors.UserNotFound, ErrorsMessages[Errors.UserNotFound], {
					email: email,
				});
			}
			
			return {
				ok: true,
				result: {
					count: 1,
					rows: user,
				},
			};
		} else {
			const offset = (pageInt - 1) * pageSizeInt;

			const { rows, } = await UserRepository.findAllWithPagination({
				offset,
				limit: pageSizeInt,
			  });
			const count = rows.length;

			return {
				ok: true,
				result: {
				  count,
				  rows,
				},
			};
		}
	} catch (err) {
		return handlerError('Failed to get or search a user', err);
	}
}

export async function getLastMonthInfo(r: Hapi.Request): Promise<IOutputPagination<User | User[]> | Boom> {
	try {
		const { page = '1', pageSize = '30', } = r.query;

		const pageInt = parseInt(page as string, 10);
		const pageSizeInt = parseInt(pageSize as string, 10);
		const offset = (pageInt - 1) * pageSizeInt;

		const {rows,} = await UserRepository.findLastMonth({ 
			offset, 
			limit: pageSizeInt, 
		});
		const count = rows.length;

		return {
			ok: true,
			result: {
				count,
				rows,
			},
		  };
	} catch(err) {
		return handlerError('Failed to get users', err);
	}
}

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


