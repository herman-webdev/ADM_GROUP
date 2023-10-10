import { ServerRoute, } from '@hapi/hapi';
import { emailSchema, idSchema, outputOkSchema, outputResultSchema, paginationPageSchema, paginationPageSizeSchema, } from '../schemas/common';
import { AuthStrategy, } from '../enums';
import * as user from '../schemas/user';
import * as api from '../api'

export default <ServerRoute[]>[
	{
		method: 'GET',
		path: '/user/{id}',
		handler: api.getUserById,
		options: {
			auth: AuthStrategy.JwtAccess,
			id: 'user.id',
			description: 'Get by id',
			tags: ['api', 'user'],
			validate: {
				query: {
					id: idSchema,
				},
			  },
			response: {
				schema: outputOkSchema(user.userSchema),
			},
		},
	  },
	  {
		method: 'GET',
		path: '/user/search/{email?}',
		handler: api.getAllUsers,
		options: {
			auth: AuthStrategy.JwtAccess,
			id: 'user.users.email',
			description: 'Get all or by email',
			tags: ['api', 'user'],
			validate: {
				params: {
			  		email: emailSchema,
				},
				query: {
					page: paginationPageSchema,
					pageSize: paginationPageSizeSchema,
				},
			},
			response: {
				schema: outputResultSchema(user.userSchema),
			},
		},
	  },	  
	  {
		method: 'GET',
		path: '/user/info/last-month',
		handler: api.getLastMonthInfo,
		options: {
			auth: AuthStrategy.JwtAccess,
			id: 'user.info.last-month',
			description: 'Get info for last month',
			tags: ['api', 'user'],
			validate: {
				query: {
					page: paginationPageSchema,
					pageSize: paginationPageSizeSchema,
				},
			},
			response: {
				schema: outputResultSchema(user.userSchema),
			},
		},
	  },
	  {
		method: 'PUT',
		path: '/user/update',
		handler: api.dataChange,
		options: {
			auth: AuthStrategy.JwtAccess,
			id: 'user.update',
			description: 'Data changing',
			tags: ['api', 'user'],
			validate: {
				payload: user.changeDataSchema,
			},
			response: {
				schema: outputOkSchema(user.userSchema),
			},
		},
	  }
]