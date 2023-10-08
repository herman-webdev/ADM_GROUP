import { Op, Transaction, } from 'sequelize';
import { User, } from '../database/models';
import { UserStatus, } from '../enums';

interface IFindByEmailOptions {
	transaction?: Transaction;
}

interface IFindByIdOptions {
	transaction?: Transaction;
}

interface IFindByLoginOptions {
	transaction?: Transaction;
	scope?: string;
}

interface ICreateOptions {
	transaction?: Transaction;
}

export class UserRepository {
	static async findByEmail(email: string, options: IFindByEmailOptions = {}): Promise<User | null> {
		const { transaction, } = options;

		return User.findOne({
			where: {
				email,
			},
			transaction,
		});
	}

	static async findById(id: string, options: IFindByIdOptions = {}): Promise<User | null> {
		const { transaction, } = options;

		return User.findOne({
			where: {
				id,
			},
			transaction,
		})
	}

	static async findByLogin(
		login: string,
		options: IFindByLoginOptions = {}
	): Promise<User | null> {
		const { transaction, scope = 'defaultScope', } = options;

		return User.scope(scope).findOne({
			where: {
				[Op.or]: [
					{
						email: login,
					},
					{
						phone: login,
					}
				],
			},
			transaction,
		});
	}

	static async create(
		values: Partial<User>,
		options: ICreateOptions = {}
	): Promise<User | null> {
		const { transaction, } = options;

		return User.create({
			...values,
			status: UserStatus.Active,
		}, {
			transaction,
		});
	}
}
