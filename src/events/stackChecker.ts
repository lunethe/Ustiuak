import { Events, type Message } from 'discord.js';
import { type Event } from '../typings';
import { type UstiuakClient } from '..';
import { calculateRandomRPM } from '../util/math';

const StackCheckerEvent: Event = {
	name: 'stackChecker',
	eventName: Events.MessageCreate,
	disabled: false,

	async run(client: UstiuakClient, message: Message) {
		// Check for a guild or a bot
		if (message.author.bot || !message.guild) {
			return;
		}

		// Fetch user data from database
		const userData = await client.database.getUserData(message.author.id);

		// Get current ms
		const now = Date.now();

		// Check if the user already has a stack
		if (!userData.stack) {
			userData.stack = 0;
		}

		if (userData.stackTimer) {
			clearTimeout(userData.stackTimer);
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		userData.stackTimer = setTimeout(async () => {
			userData.stack = 0;
			await userData.save();
		}, 60000);

		// If less than a minute has passed, return without updating the stack
		if (userData.lastStack) {
			const elapsedTime = now - userData.lastStack;
			if (elapsedTime < 60000) {
				await userData.save();
				return;
			}
		}

		// Increase user bal
		userData.bal += calculateRandomRPM(userData.stack, userData.rank);

		// Increase the stack by 1
		if (userData.stack < 1000) {
			userData.stack++;
		}
		userData.lastStack = now;

		await userData.save();
	}
};

export default StackCheckerEvent;