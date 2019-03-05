import json from "./data/ladder-medium.json";
import Ladder from "./models/Ladder";

export const careerLadder = Ladder.fromJSON(json);
