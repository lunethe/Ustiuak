import dotenv from 'dotenv';
dotenv.config();

import { readdirSync } from 'fs';
import { join } from 'path';

import { Client, Collection, GatewayIntentBits, type Snowflake } from 'discord.js';
import { connect } from 'mongoose';

import Config from './assets/config.json';

import { type Command, type Event } from './typings';
import { Database } from './helpers/Database';
import Parser from './util/parser';

export class UstiuakClient extends Client {
	public readonly config: typeof Config;
	public readonly parser: Parser;
	public readonly commands: Collection<string, Command>;
	public readonly database: Database;
	public readonly stacks: Map<Snowflake, number>;

	constructor() {
		super({ intents:
			[
				GatewayIntentBits.DirectMessageReactions,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.GuildBans,
				GatewayIntentBits.GuildEmojisAndStickers,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.MessageContent
			]
		});
		this.config = Config;
		this.parser = new Parser();
		this.commands = new Collection();
		this.database = new Database();
		this.stacks = new Map();
		this.start();
	}

	private async connectMongo() {
		return await connect(process.env.MONGO_URI, {
			keepAlive: true
		});
	}

	private async initEventHandler() {
		const events: string[] = readdirSync(join(__dirname, 'events')).filter((file) => file.endsWith('.js'));
		for await (const eventFile of events) {
			const event: Event = (await require(join(__dirname, 'events', eventFile))).default;
			if (event.disabled) continue;
			this.on((event.eventName as string), (...args) => event.run(this, ...args));
		}
	}

	private async initCommands() {
		const commandFiles: string[] = readdirSync(join(__dirname, 'commands')).filter((file) => file.endsWith('.js'));
		for await (const commandFile of commandFiles) {
			const c: Command = (await require(join(__dirname, 'commands', commandFile))).default;
			this.commands.set(c.name, c);
		}
	}

	private async start() {
		await this.connectMongo();
		await this.initEventHandler();
		await this.initCommands();
		await this.login(process.env.TOKEN);
	}
}

export default new UstiuakClient();

process.on('unhandledRejection', (err) => {
	console.log(err, 'error');
});
process.on('rejectionHandled', (err) => {
	console.log(err, 'error');
});
process.on('uncaughtException', (err) => {
	console.log(err, 'error');
});