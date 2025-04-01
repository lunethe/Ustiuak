import { Events, type Message } from 'discord.js';
import manageRateLimits from '../util/rateLimitManager';
import { type Command, type Event } from '../typings';
import { type UstiuakClient } from '..';

const CommandRunEvent: Event = {
	name: 'commandRun',
	eventName: Events.MessageCreate,
	disabled: false,

	async run(client: UstiuakClient, message: Message) {
		// Check for a guild or a bot
		if (message.author.bot || !message.guild) {
			return;
		}

		// Since guild checked already, assume not null. Get the prefix
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const prefix = await client.database.getGuildPrefix(message.guildId!);

		// Check if the message starts with the prefix
		if (!message.content.startsWith(prefix)) {
			return;
		}

		// Get an array of the arguments
		const args: string[] = message.content.slice(prefix.length).split(/ +/);
		const commandName: string = args.shift()?.toLowerCase() || '';

		if (!commandName) {
			return;
		}

		const command =
			client.commands.get(commandName) ||
			client.commands.find((cmd: Command) => cmd.aliases && cmd.aliases.includes(commandName));

		if (command) {
			const rateLimitTime = await manageRateLimits(message.author.id, command.name);
			if (rateLimitTime > 0) {
				return message.reply('Slow down there!');
			}

			return await command.run(client, message, args);
		}
	}
};

export default CommandRunEvent;