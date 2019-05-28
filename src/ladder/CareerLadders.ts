import medium from "./data/ladder-medium.json";
import mediumEmpty from "./data/ladder-medium-empty.json";
import mediumEmptyWithArchetypes from "./data/ladder-medium-empty-archetypes.json";
import aldenOld from "./data/ladder-alden.json";
import zehOld from "./data/ladder-zeh.json";
import workCo from "./data/ladder-workco-draft.json";

import Ladder from "./models/Ladder";

const Ladders: any = {
	medium,
	mediumEmpty,
	mediumEmptyWithArchetypes,
	aldenOld,
	zehOld,
	workCo,
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
