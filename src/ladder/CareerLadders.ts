import medium from "./data/ladder-medium.json";
import mediumEmpty from "./data/ladder-medium-empty.json";
import mediumEmptyWithArchetypes from "./data/ladder-medium-empty-archetypes.json";

import Ladder from "./models/Ladder";

const Ladders: any = {
	medium,
	mediumEmpty,
	mediumEmptyWithArchetypes,
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
