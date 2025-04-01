import { type ColorResolvable, EmbedBuilder, type Message } from 'discord.js';
import { type UstiuakClient } from '..';
import { type Command } from '../typings';
import { calculateRankUp } from '../util/math';

const RankUpCommand: Command = {
	name: 'rankup',
	description: 'Ranks you up to a higher tier giving you more currency and RPM',
	aliases: ['ru', 'levelup'],

	async run(client: UstiuakClient, message: Message, args: string[]) {
		const userData = await client.database.getUserData(message.author.id);

		if (userData.rank > 30) {
			const maxRankEmbed = new EmbedBuilder()
				.setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
				.addFields(
					{ name: 'Highest Rank Achieved', value: 'You have achieved the highest rank possible!' }
				)
				.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
				.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
				.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

			return await message.channel.send({ embeds: [maxRankEmbed] });
		}

		const rankUpCost = calculateRankUp(userData.rank);

		if (userData.bal >= rankUpCost) {
			const rankUpEmbed = new EmbedBuilder()
				.setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
				.setFields(
					{ name: 'Rank Up?', value: `You can unlock **${client.parser.getRankName(userData.rank + 1)}**!\n**UNLOCK FOR ${calculateRankUp(userData.rank).toLocaleString()}💎**\n*(Use **.unlock** to unlock! 🔒)*` }
				)
				.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
				.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
				.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

			return await message.channel.send({ embeds: [rankUpEmbed] });
		} else {
			const invalidRankUpEmbed = new EmbedBuilder()
				.setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
				.setFields(
					{ name: 'Rank Up?', value: `Insufficient funds 💎 to rank up! 🇽\n*${(rankUpCost - userData.bal).toLocaleString()} 💎 more required*` }
				)
				.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
				.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
				.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

			return await message.channel.send({ embeds: [invalidRankUpEmbed] });
		}
	}
};

export default RankUpCommand;