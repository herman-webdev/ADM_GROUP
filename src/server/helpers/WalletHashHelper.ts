import crypto from 'crypto'

export class WalletHashHelper {
	static randomByteSymbols() {
		const randomBuffer = crypto.randomBytes(40);
		const randomHex = randomBuffer.toString('hex');

		return randomHex;
	}

	static generateHash(walletAddress: string): string {
		const hash = crypto
		  .createHash('sha256')
		  .update(walletAddress)
		  .digest('hex');
		return hash;
	  }
}
