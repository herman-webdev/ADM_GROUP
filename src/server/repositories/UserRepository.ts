import { Op, Transaction, } from 'sequelize';
import { User, } from '../database/models';
import { UserStatus, } from '../enums';
import { IUpdateData, } from '../interfaces';

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

interface IUpdateOptions {
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
		options: IUpdateOptions = {}
	): Promise<User | null> {
		const { transaction, } = options;

		return await User.create({
			...values,
			status: UserStatus.Active,
		}, {
			transaction,
		});
	}

	static async update(
		payload: IUpdateData,
		options: ICreateOptions = {},
		id: string
	  ): Promise<[number, User[]] | null> {
		const { transaction, } = options;
		
		return await User.update(payload, {
		  where: { id: id, },
		  transaction,
		}); 
	  }
	  
}
