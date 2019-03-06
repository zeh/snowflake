export default class Milestone {
	public readonly summary: string;
	public readonly signals: string[];
	public readonly examples: string[];

	public constructor(summary: string, signals: string[], examples: string[]) {
		this.summary = summary;
		this.signals = signals.concat();
		this.examples = examples.concat();
	}
}
