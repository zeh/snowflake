import Milestone from "./Milestone";

export default class Track {
	public readonly id: string;
	public readonly name: string;
	public readonly description: string;
	public readonly milestones: Milestone[] = [];

	public constructor(id: string, name: string, description: string) {
		this.id = id;
		this.name = name;
		this.description = description;
	}
}
