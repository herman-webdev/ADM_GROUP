import { ServerRoute, } from '@hapi/hapi';
import { outputOkSchema, } from '../schemas/common';
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
		  response: {
				schema: outputOkSchema(user.userIdSchema),
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
		  response: {
				schema: outputOkSchema(user.changeDataSchema),
		  },
		},
	  }
]