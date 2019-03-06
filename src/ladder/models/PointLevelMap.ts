export default class PointsLevelMap {
	public readonly points: number;
	public readonly level: string;

	public constructor(points: number, level: string) {
		this.points = points;
		this.level = level;
	}
}
