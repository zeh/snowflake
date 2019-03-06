export default class PointsTitleMap {
	public readonly name: string;
	public readonly min?: number;
	public readonly max?: number;

	public constructor(name: string, min?: number, max?: number) {
		this.name = name;
		this.min = min;
		this.max = max;
	}
}
