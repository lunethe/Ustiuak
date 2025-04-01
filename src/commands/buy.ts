import { type ColorResolvable, EmbedBuilder, type Message } from 'discord.js';
import { type UstiuakClient } from '..';
import { type Command } from '../typings';
import { items } from './shop';

const BuyCommand: Command = {
	name: 'buy',
	description: 'Purchase an available item from the shop',
	aliases: [],

	async run(client: UstiuakClient, message: Message, args: string[]) {
		const item: string = args[0];
		if (!item) {
			return await message.channel.send(':x: Please specify an item to buy from the shop.');
		}

		const itemToBuy = items.find((i) => i.name === item);
		if (!itemToBuy) {
			return await message.channel.send(':x: Please specify a valid item to buy from the shop.');
		}

		const userData = await client.database.getUserData(message.author.id);

		if (userData.bal < itemToBuy.cost) {
			return await message.channel.send(':x: You don\'t have enough :gem: for this.');
		} else if (userData.inv.includes(itemToBuy.name)) {
			return await message.channel.send(':x: You already have this item.');
		} else {
			userData.bal -= itemToBuy.cost;
			itemToBuy.stock--;
			userData.inv.push(itemToBuy.name);
			await userData.save();

			const boughtEmbed = new EmbedBuilder()
				.setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
				.addFields(
					{ name: `${itemToBuy.name}`, value: `Item purchased for **${itemToBuy.cost.toLocaleString()}** :gem:` }
				)
				.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
				.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
				.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

			return await message.channel.send({ embeds: [boughtEmbed] });
		}
	}
};

export default BuyCommand;