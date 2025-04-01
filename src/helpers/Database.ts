import Guild, { type Guild as GuildType } from '../models/Guild';
import User, { type User as UserType } from '../models/User';

export class Database {
	// Guild
	public async getGuildData(_id: string): Promise<GuildType> {
		return await Guild.findOne({ _id }) || await new Guild({ _id }).save();
	}

	public async getGuildPrefix(_id: string): Promise<string> {
		const guildData = await this.getGuildData(_id);
		return guildData.prefix;
	}

	// User
	public async getUserData(_id: string): Promise<UserType> {
		return await User.findOne({ _id }) || await new User({ _id }).save();
	}

	public async getBalance(_id: string): Promise<number> {
		const userData = await this.getUserData(_id);
		return userData.bal;
	}

	public async getRank(_id: string): Promise<number> {
		const userData = await this.getUserData(_id);
		return userData.rank;
	}

	public async setBalance(_id: string, amount: number): Promise<number> {
		const userData = await this.getUserData(_id);

		userData.bal = amount;
		await userData.save();

		return userData.bal;
	}

	public async addBalance(_id: string, amount: number): Promise<number> {
		const userData = await this.getUserData(_id);

		userData.bal += amount;
		await userData.save();

		return userData.bal;
	}
}