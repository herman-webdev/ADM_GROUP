import * as Hapi from '@hapi/hapi';
import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { Test, getServerInjectOptions } from './utils';
import { ICredentials, ISignUpCredentials } from '../src/server/interfaces';
import { getUUID } from '../src/server/utils';

describe('Users', () => {
    let server: Hapi.Server;
	let res: any;

	let password: string = 'Password123!!';

	let access: string;

    const uuid = 'f7361d04-bed8-4b3f-ab59-2d0f71be0599'

	let email: string = `${getUUID()}@example.com`;

	const signUp: ISignUpCredentials = {
		email,
		password,
	};

	const specialistCred: ICredentials = {
		login: email,
		password,
	};

    beforeAll(async () => {
        server = await Test.start();
        res = await server.inject(
			getServerInjectOptions('/api/auth/registration', 'POST', null, signUp),
		);

        res = await server.inject(
			getServerInjectOptions('/api/auth/login', 'POST', null, specialistCred),
		);

		access = res.result.result.access;
    });

    afterAll(async () => {
        await server.stop();
    });

    it('Get By Id', async () => {
        res = await server.inject(
            getServerInjectOptions(`/api/user/${uuid}`, 'GET', access)
        );

        expect(res.statusCode).toEqual(200);
    });
});
