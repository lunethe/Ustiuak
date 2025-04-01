import { type ColorResolvable, EmbedBuilder, type Message } from 'discord.js';
import { type UstiuakClient } from '..';
import { type Command } from '../typings';
import { calculateRankUp } from '../util/math';

const UnlockCommand: Command = {
	name: 'unlock',
	description: '',
	aliases: [],

	async run(client: UstiuakClient, message: Message, args: string[]) {
		const userData = await client.database.getUserData(message.author.id);

		if (userData.rank > 30) {
			return;
		}

		const rankUpCost = calculateRankUp(userData.rank);

		if (userData.bal >= rankUpCost) {
			userData.bal -= rankUpCost;
			userData.rank += 1;
			await userData.save();

			const rankUpEmbed = new EmbedBuilder()
				.setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
				.setFields(
					{ name: 'Rank Up! 🎇', value: `**Congratulations! You have unlocked ${client.parser.getRankName(userData.rank)}! 🎉**` }
				)
				.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
				.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
				.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

			return await message.channel.send({ embeds: [rankUpEmbed] });
		} else {
			return;
		}
	}
};

export default UnlockCommand;