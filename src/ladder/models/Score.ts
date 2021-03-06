import Ladder from "./Ladder";
import PointsLevelMap from "./PointLevelMap";

type IScoreMap = { [key: string]: number };

export default class Score {
	public readonly scores: IScoreMap = {};

	private readonly ladder: Ladder;

	public constructor(ladder: Ladder) {
		this.ladder = ladder;
	}

	public getTrackMilestone(trackId: string): number {
		if (this.scores.hasOwnProperty(trackId)) {
			return this.scores[trackId];
		} else {
			return 0;
		}
	}

	public getTrackMilestoneNormalizedLevel(trackId: string): number {
		const milestoneIndex = this.getTrackMilestone(trackId);
		const track = this.ladder.getTrackById(trackId);
		if (track) {
			const max = track.milestones.length;
			return milestoneIndex / max;
		} else {
			return 0;
		}
	}

	public setTrackMilestone(trackId: string, milestone: number): void {
		this.scores[trackId] = milestone;
	}

	public getScore(): number {
		let total = 0;
		for (const trackId in this.scores) {
			if (this.doesTrackIdExist(trackId)) {
				total += this.getScoreForTrack(trackId);
			}
		}
		return total;
	}

	public getScoreForTrack(trackId: string): number {
		return this.ladder.getMilestonePoints(this.scores[trackId] || 0);
	}

	public getEligibleTitles(): string[] {
		const totalPoints = this.getScore();
		return this.ladder.pointsToTitles
			.filter((ptt) => {
				const satisfiesMin = ptt.min === undefined || totalPoints >= ptt.min;
				const satisfiesMax = ptt.max === undefined || totalPoints <= ptt.max;
				return satisfiesMin && satisfiesMax;
			})
			.map((ptt) => ptt.name);
	}

	public getLevel(): PointsLevelMap | undefined {
		if (!this.ladder.hasLevels()) return undefined;
		const points = this.getScore();
		const allLevels = this.ladder.pointsToLevels;
		let currentLevel = allLevels[0];
		for (const level of allLevels) {
			if (level.points <= points) currentLevel = level;
		}
		return currentLevel;
	}

	public getNextLevel(): PointsLevelMap | undefined {
		if (!this.ladder.hasLevels()) return undefined;
		const points = this.getScore();
		const allLevels = this.ladder.pointsToLevels;
		return allLevels.find((ptl) => ptl.points > points);
	}

	public getScoreByCategory(): { [key: string]: number } {
		const scores: { [key: string]: number } = {};
		for (const category of this.ladder.categories) {
			let total = 0;
			for (const track of category.tracks) {
				total += this.getScoreForTrack(track.id);
			}
			scores[category.id] = total;
		}
		return scores;
	}

	public getArchetypes(): Array<{ name: string; scale: number }> {
		const archetypes: Array<{ name: string; scale: number }> = [];

		const pwas = this.ladder.pointWeightsToArchetypes;
		for (const pwa of pwas) {
			let total = 0;
			let max = 0;
			for (const trackId in pwa.weights) {
				const scale = pwa.weights[trackId];
				total += this.getTrackMilestoneNormalizedLevel(trackId) * scale;
				max += scale;
			}

			if (total > 0) {
				archetypes.push({ name: pwa.name, scale: total / max });
			}
		}

		return archetypes;
	}

	public getState(): IScoreMap {
		const newMap: IScoreMap = {};
		Object.keys(this.scores).forEach((trackId) => {
			const milestoneIndex = this.scores[trackId];
			if (typeof milestoneIndex === "number") {
				newMap[trackId] = milestoneIndex;
			}
		});
		return newMap;
	}

	public setState(newState: IScoreMap): void {
		Object.keys(newState).forEach((trackId) => {
			this.scores[trackId] = newState[trackId];
		});
	}

	private doesTrackIdExist(trackId: string): boolean {
		return this.ladder.getAllTracks().some((track) => track.id === trackId);
	}
}
