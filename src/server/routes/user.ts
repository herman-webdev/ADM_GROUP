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
		  id: 'auth.info',
		  description: 'Access protected information',
		  tags: ['api', 'auth'],
		  response: {
				schema: outputOkSchema(auth.userIdSchema),
		  },
		},
	  }
]