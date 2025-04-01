import { type ColorResolvable, EmbedBuilder, type Message } from 'discord.js';
import { type UstiuakClient } from '..';
import { type Command } from '../typings';

const InventoryCommand: Command = {
	name: 'inventory',
	description: 'Shows what the user has purchased from the Shop',
	aliases: ['i', 'inv'],

	async run(client: UstiuakClient, message: Message, args: string[]) {
		const userData = await client.database.getUserData(message.author.id);

		const inventoryEmbed = new EmbedBuilder()
			.setAuthor({ name: `${message.author.username} Items`, iconURL: message.author.displayAvatarURL() })
			.addFields(
				{ name: 'Inventory', value: `[${userData.inv.join(', ')}]` }
			)
			.setFooter({ text: `${client.config.branding} | ${client.parser.getRankName(userData.rank)}` })
			.setThumbnail(client.parser.getThumbnailFromRank(userData.rank) || null)
			.setColor(client.parser.getColorFromRank(userData.rank) as ColorResolvable);

		return await message.channel.send({ embeds: [inventoryEmbed] });
	}
};

export default InventoryCommand;