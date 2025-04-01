import { type ColorResolvable, EmbedBuilder, type Message } from 'discord.js';
import { type UstiuakClient } from '..';
import { type Command } from '../typings';
import { getRPM } from '../util/math';

const StackCommand: Command = {
	name: 'stack',
	description: 'Shows the amount of stacks obtained (Stacks up to 999x until the user is inactive for 1 minute)',
	aliases: ['s'],

	async run(client: UstiuakClient, message: Message, args: string[]) {
		const userData = await client.database.getUserData(message.author.id);
		const rpm = getRPM(userData.stack, userData.rank);

		const stackEmbed = new EmbedBuilder()
			.setAuthor({ name: `${message.author.username} Stacks`, iconURL: message.author.displayAvatarURL() })
			.addFields(
				{ name: 'Stack', value: `**${userData.stack}**x`, inline: true },
				{ name: 'RPM', value: `**${rpm.min.toLocaleString()}**💎 to **${rpm.max.toLocaleString()}**💎`, inline: true }
			)
			.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
			.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
			.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

		return await message.channel.send({ embeds: [stackEmbed] });
	}
};

export default StackCommand;