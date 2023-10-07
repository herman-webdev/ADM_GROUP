import { Transaction, } from 'sequelize';
import { Wallet, } from '../database/models';

interface ICreateOptions {
	transaction?: Transaction;
}

export class WalletRepository {
	static async createWallet(
		userId: string, 
		walletHash: string, 
		options: ICreateOptions = {}): Promise<Wallet | null> {
		const { transaction, } = options;
		const wallet = await Wallet.create({
			userId,
			walletHash,
			status: 'active',
		}, {transaction,});
    
		return wallet;
	}
}