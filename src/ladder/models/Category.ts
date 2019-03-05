import Track from "./Track";

export default class Category {
	public readonly id: string;
	public readonly name: string;
	public readonly color: string;
	public readonly tracks: Track[] = [];

	constructor(id: string, name: string, color: string) {
		this.id = id;
		this.name = name;
		this.color = color;
	}
}
