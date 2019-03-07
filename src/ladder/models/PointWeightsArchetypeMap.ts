import IdWeightMap from "./IdWeightMap";

type IIdWeightMaps = { [key: string]: IdWeightMap };

export default class PointWeightsArchetypeMap {
	public readonly name: string;
	public readonly weights: IIdWeightMaps;

	public constructor(name: string, weights: IIdWeightMaps) {
		this.name = name;
		this.weights = weights;
	}
}
