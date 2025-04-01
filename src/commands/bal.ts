import { type ColorResolvable, EmbedBuilder, type Message } from 'discord.js';
import { type UstiuakClient } from '..';
import { type Command } from '../typings';

const BalCommand: Command = {
	name: 'bal',
	description: 'Shows how much currency a user has.',
	aliases: ['currency', 'c', 'money', 'credits', 'gems', 'coins'],

	async run(client: UstiuakClient, message: Message, args: string[]) {
		const userData = await client.database.getUserData(message.author.id);

		const currencyEmbed = new EmbedBuilder()
			.setAuthor({ name: `${message.author.username} Banking Information`, iconURL: message.author.displayAvatarURL() })
			.addFields(
				{ name: 'Currency', value: `**${userData.bal.toLocaleString()}** 💎` }
			)
			.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
			.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
			.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

		return await message.channel.send({ embeds: [currencyEmbed] });
	}
};

export default BalCommand;