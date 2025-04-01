import { type ColorResolvable, EmbedBuilder, type Message, type User } from 'discord.js';
import { type UstiuakClient } from '..';
import { type Command } from '../typings';

const BalCommand: Command = {
	name: 'gift',
	description: 'Gift a user some currency',
	aliases: ['g'],

	async run(client: UstiuakClient, message: Message, args: string[]) {
		const receiver: User | undefined = message.mentions.users.first() || client.users.cache.get(args[0]);
		if (!receiver) {
			return await message.reply(':x: Please mention a valid user.');
		} else if (receiver.bot || receiver.id === message.author.id) {
			return await message.reply(':x: You cannot gift to this user.');
		}

		const amount = Number(args[1]);
		const userData = await client.database.getUserData(message.author.id);

		if (!amount || amount < 1) {
			return await message.reply(':x: Please provide a valid amount to send.');
		} else if (userData.bal < amount) {
			return await message.reply(':x: You don\'t have enough money for this.');
		}

		const receiverData = await client.database.getUserData(receiver.id);

		userData.bal -= amount;
		receiverData.bal += amount;

		await userData.save();
		await receiverData.save();

		const giftEmbed = new EmbedBuilder()
			.setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
			.addFields(
				{ name: ':gift:', value: `**${message.author.username}'s Gift** of **${amount.toLocaleString()}** 💎 has been sent to **${receiver.username}**` }
			)
			.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
			.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
			.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

		return await message.channel.send({ embeds: [giftEmbed] });
	}
};

export default BalCommand;