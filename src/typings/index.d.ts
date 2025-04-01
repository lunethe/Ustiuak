import { Events, Message } from 'discord.js';
import { type UstiuakClient } from '..';

export type Args = string[];

export declare interface Command {
	name: string;
	description?: string;
	aliases: string[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async run(client: UstiuakClient, message: Message, args: Args): Promise<any>;
}

export declare interface Event {
    name: string;
    eventName: Events;
    disabled?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run: (client: UstiuakClient, ...args: any[]) => void;
}