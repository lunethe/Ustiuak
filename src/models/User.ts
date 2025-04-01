import { Document, Schema, model } from 'mongoose';

export interface Trade {
	amount: number;
	user: string;
	item: string;
}

export const TradeSchema = new Schema<Trade>({
	amount: { type: Number },
	user: { type: String },
	item: { type: String }
});

export interface User extends Document {
	_id: string;
	bal: number;
	stack: number;
	lastStack: number;
	stackTimer: number;
	trades: Trade[];
	rank: number;
	inv: string[];
}

export const UserSchema = new Schema<User>({
	_id: { type: String },
	bal: { type: Number, default: 0 },
	stack: { type: Number, default: 0 },
	lastStack: { type: Number },
	stackTimer: { type: Number },
	trades: [TradeSchema],
	rank: { type: Number, default: 1 },
	inv: [String]
});

export default model<User>('User', UserSchema);