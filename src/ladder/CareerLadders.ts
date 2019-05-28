import medium from "./data/ladder-medium.json";
import mediumEmpty from "./data/ladder-medium-empty.json";
import mediumEmptyWithArchetypes from "./data/ladder-medium-empty-archetypes.json";
import aldenOld from "./data/ladder-alden.json";
import zehOld from "./data/ladder-zeh.json";
import workCo from "./data/ladder-workco-draft.json";

import Ladder from "./models/Ladder";

const Ladders: Record<string, unknown> = {
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

function getDefaultJSON(): unknown {
	return workCo;
}

function getDefault(): Ladder {
	return get(getDefaultJSON()) as Ladder;
}

function getDefaultId(): string | undefined {
	const defaultJSON = getDefaultJSON();
	return Object.keys(Ladders).find((id) => Ladders[id] === defaultJSON);
}

export default {
	Ladders,
	get,
	getDefault,
	getDefaultId,
};
