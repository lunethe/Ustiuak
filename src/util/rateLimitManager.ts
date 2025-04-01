import Cooldown, { type Cooldown as CooldownType } from '../models/Cooldown';

interface CooldownsJSON {
	[key: string]: number;
}

import _cooldowns from '../assets/cooldowns.json';
const Cooldowns = _cooldowns as CooldownsJSON;

export default async function manageRateLimits(uid: string, command: string) {
	// Get cooldown
	const cooldown: CooldownType | null = await Cooldown.findOne({ uid, command });
	if (!cooldown) {
		const expireTime = new Date();
		expireTime.setSeconds(expireTime.getSeconds() + Cooldowns[command]);

		await new Cooldown({ uid, command, expiresAt: expireTime }).save();
		return 0;
	}

	const now: number = new Date().valueOf();
	const expirationTime: number = new Date(cooldown.expiresAt).valueOf();

	// Return time left
	return (expirationTime - now) / 1000;
}