import { BelongsTo, Column, DataType, ForeignKey, Model, Table, } from 'sequelize-typescript';
import { getUUID, } from '../../utils';
import { User,} from './User';
import { WalletStatus, } from '../../enums';

@Table
export class Wallet extends Model {
    @Column({
    	primaryKey: true,
    	type: DataType.UUID,
    	defaultValue: () => getUUID(),
    })
	override id!: string;

	@ForeignKey(() => User)
    @Column({
    	type: DataType.UUID,
    	allowNull: false,
    })
    	userId!: string;

    @Column({
    	type: DataType.STRING,
    	allowNull: false,
    	unique: true,
    })
    	walletHash!: string

    @Column({
    	type: DataType.DECIMAL,
    	defaultValue: 0.00,
    	allowNull: false,
    })
    	balance!: number

    @Column({
    	type: DataType.STRING,
    	allowNull: false,
    })
    	status!: WalletStatus

    @BelongsTo(() => User)
    	user!: User
}