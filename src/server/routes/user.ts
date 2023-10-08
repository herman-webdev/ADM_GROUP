import { ServerRoute, } from '@hapi/hapi';
import { outputOkSchema, } from '../schemas/common';
import { AuthStrategy, } from '../enums';
import * as auth from '../schemas/auth';
import * as api from '../api'

export default <ServerRoute[]>[
	{
		method: 'GET',
		path: '/user/{id}',
		handler: api.getUserById,
		options: {
		  auth: AuthStrategy.JwtAccess,
		  id: 'auth.user',
		  description: 'Get by id',
		  tags: ['api', 'user'],
		  response: {
				schema: outputOkSchema(auth.userIdSchema),
		  },
		},
	  },
	  {
		method: 'PUT',
		path: '/user/update',
		handler: api.dataChange,
		options: {
		  auth: AuthStrategy.JwtAccess,
		  id: 'auth.dataChange',
		  description: 'Data changing',
		  tags: ['api', 'user'],
		  response: {
				schema: outputOkSchema(auth.changeDataSchema),
		  },
		},
	  }
]