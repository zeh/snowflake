import medium from "./data/ladder-medium.json";
import mediumEmpty from "./data/ladder-medium-empty.json";
import mediumEmptyWithArchetypes from "./data/ladder-medium-empty-archetypes.json";
import alden from "./data/ladder-alden.json";

import Ladder from "./models/Ladder";

const Ladders: any = {
	medium,
	mediumEmpty,
	mediumEmptyWithArchetypes,
	alden,
};

function get(data: unknown): Ladder | null {
	if (data) return Ladder.fromJSON(data);
	return null;
}

function getDefault(): Ladder {
	return get(medium) as Ladder;
}

export default {
	Ladders,
	get,
	getDefault,
};
