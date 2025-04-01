import _Ranks from '../assets/ranks.json';
import _Colors from '../assets/colors.json';
import _Thumbnails from '../assets/thumbnails.json';

interface RanksJSON {
	[key: string]: string;
}

interface ColorsJSON {
	[key: string]: string;
}

interface ThumbnailsJSON {
	[key: string]: string;
}

const Ranks = _Ranks as RanksJSON;
const Colors = _Colors as ColorsJSON;
const Thumbnails = _Thumbnails as ThumbnailsJSON;

export default class Parser {
	getRankName(rank: number): string {
		return Ranks[rank];
	}

	getColorFromRank(rank: number): string {
		return Colors[rank];
	}

	getThumbnailFromRank(rank: number): string {
		return Thumbnails[rank];
	}
}