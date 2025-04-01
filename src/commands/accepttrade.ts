import { type ColorResolvable, EmbedBuilder, type Message, type User } from 'discord.js';
import { type UstiuakClient } from '..';
import { type Command } from '../typings';

const AcceptTradeCommand: Command = {
	name: 'accepttrade',
	description: 'Accept a trade request',
	aliases: ['at'],

	async run(client: UstiuakClient, message: Message, args: string[]) {
		const userData = await client.database.getUserData(message.author.id);

		if (!args[0] || !args[1] || !args[2]) {
			const tradeInfoEmbed = new EmbedBuilder()
				.setAuthor({ name: `${message.author.username} Items`, iconURL: message.author.displayAvatarURL() })
				.setFields(
					{ name: '**Trading** 🏛️', value: 'Trade items in your inventory with other people for gems! 💎\n\n**Send a Trade Request 🔁** - (**.trade .t**)\n`.trade @user (item you own) (cost)`\n**Accepting a Trade Request ✅** - (**.accepttrade .at**)\n`.accepttrade @trader (item they own) (cost)`\n**Cancel a Trade Request 🇽** - (**.canceltrade .ct**)\n`.canceltrade`' }
				)
				.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
				.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
				.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

			return await message.channel.send({ embeds: [tradeInfoEmbed] });
		} else {
			const receiver: User | undefined = message.mentions.users.first() || client.users.cache.get(args[0]);
			if (!receiver) {
				return await message.channel.send(':x: Please mention a valid user.');
			} else if (receiver.bot || receiver.id === message.author.id) {
				return await message.channel.send(':x: You cannot send a trade request to this user.');
			}

			const item: string = args[1];
			if (!userData.inv.includes(item)) {
				return await message.channel.send(':x: You don\'t own this item.');
			}

			const cost = Number(args[2]);
			if (!cost) {
				return await message.channel.send(':x: Please provide a valid cost.');
			}

			const tradingEmbed = new EmbedBuilder()
				.setAuthor({ name: `${message.author.username} Items`, iconURL: message.author.displayAvatarURL() })
				.addFields(
					{ name: 'Trading Request Sent! 🏛️', value: `A trade request of **${cost.toLocaleString()}**💎 was sent to <@!${receiver.id}>!` }
				)
				.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
				.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
				.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

			return await message.channel.send({ embeds: [tradingEmbed] });
		}
	}
};

export default AcceptTradeCommand;