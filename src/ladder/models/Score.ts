import Ladder from "./Ladder";
import PointsLevelMap from "./PointLevelMap";

export default class Score {
	public readonly scores: { [ key: string ] : number } = {};

	private readonly ladder: Ladder;

	constructor(ladder: Ladder) {
		this.ladder = ladder;
	}

	getTrackMilestone(trackId: string): number {
		if (this.scores.hasOwnProperty(trackId)) {
			return this.scores[trackId];
		} else {
			return 0;
		}
	}

	setTrackMilestone(trackId: string, milestone: number) {
		this.scores[trackId] = milestone;
	}

	getScore(): number {
		let total = 0;
		for (const trackId in this.scores) {
			total += this.getScoreForTrack(trackId);
		}
		return total;
	}

	getScoreForTrack(trackId: string) {
		return this.ladder.getMilestonePoints(this.scores[trackId] || 0);
	}

	getEligibleTitles(): string[] {
		const totalPoints = this.getScore();
		return this.ladder.pointsToTitles.filter((ptt) => {
			const satisfiesMin = (ptt.min === undefined || totalPoints >= ptt.min);
			const satisfiesMax = (ptt.max === undefined || totalPoints <= ptt.max);
			return satisfiesMin && satisfiesMax;
		}).map((ptt) => ptt.name);
	}

	getLevel(): PointsLevelMap {
		const points = this.getScore();
		const allLevels = this.ladder.pointsToLevels;
		let currentLevel = allLevels[0];
		for (const level of allLevels) {
			if (level.points <= points) currentLevel = level;
		}
		return currentLevel;
	}

	getNextLevel(): PointsLevelMap | undefined  {
		const points = this.getScore();
		const allLevels = this.ladder.pointsToLevels;
		return allLevels.find((ptl) => ptl.points > points);
	}

	getScoreByCategory(): { [key: string]: number } {
		const scores: { [key: string]: number} = {};
		for (const category of this.ladder.categories) {
			let total = 0;
			for (const track of category.tracks) {
				total += this.getScoreForTrack(track.id);
			}
			scores[category.id] = total;
		}
		return scores;
	}
}
