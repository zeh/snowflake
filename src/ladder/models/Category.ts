import Track from "./Track";

export default class Category {
	public readonly id: string;
	public readonly name: string;
	public readonly color: string;
	public readonly textColor: string;
	public readonly tracks: Track[] = [];

	public constructor(id: string, name: string, color: string, textColor: string) {
		this.id = id;
		this.name = name;
		this.color = color;
		this.textColor = textColor;
	}
}
