import Category from "./Category";
import Track from "./Track";
import Milestone from "./Milestone";
import PointsLevelMap from "./PointLevelMap";
import PointsTitleMap from "./PointTitleMap";
import PointWeightsArchetypeMap from "./PointWeightsArchetypeMap";

export default class Ladder {
	public readonly categories: Category[] = [];
	public readonly milestonesToPoints: number[] = [];
	public readonly pointsToLevels: PointsLevelMap[] = [];
	public readonly pointsToTitles: PointsTitleMap[] = [];
	public readonly pointWeightsToArchetypes: PointWeightsArchetypeMap[] = [];

	public constructor() {}

	public static fromJSON(json: any): Ladder {
		const ladder = new Ladder();

		if (json) {
			// Parse categories
			const categories = json.categories;
			if (categories && typeof categories === "object") {
				for (const categoryKey in categories) {
					// Create individual category
					const categoryData = categories[categoryKey];
					const category = new Category(categoryKey, categoryData.name, categoryData.color);
					ladder.categories.push(category);

					// Parse tracks
					const tracks = categoryData.tracks;
					if (tracks && typeof tracks === "object") {
						for (const trackKey in tracks) {
							// Create individual track
							const trackData = tracks[trackKey];
							const track = new Track(trackKey, trackData.name, trackData.description);
							category.tracks.push(track);

							// Parse milestones
							const milestones = trackData.milestones;
							if (milestones && Array.isArray(milestones)) {
								milestones.forEach((milestoneData) => {
									// Create individual milestone
									const milestone = new Milestone(milestoneData.summary, milestoneData.signals, milestoneData.examples);
									track.milestones.push(milestone);
								});
							}
						}
					}
				}
			}

			const mappings = json.mappings;
			if (mappings) {
				// Parse mappings for analysis

				// Parse milestones-to-points
				const milestonesToPoints = mappings.milestonesToPoints;
				if (milestonesToPoints && Array.isArray(milestonesToPoints)) {
					milestonesToPoints.forEach((points) => {
						if (typeof points === "number") {
							ladder.milestonesToPoints.push(points);
						}
					});
				}

				// Parse points-to-levels
				const pointsToLevels = mappings.pointsToLevels;
				if (pointsToLevels && typeof pointsToLevels === "object") {
					for (const ptlKey in pointsToLevels) {
						const ptlData = pointsToLevels[ptlKey];
						const ptlMin: number = parseFloat(ptlKey);
						if (ptlData && typeof ptlMin === "number" && !isNaN(ptlMin)) {
							const ptl = new PointsLevelMap(ptlMin, ptlData);
							ladder.pointsToLevels.push(ptl);
						}
					}
				}

				// Parse points-to-titles
				const pointsToTitles = mappings.pointsToTitles;
				if (pointsToTitles && Array.isArray(pointsToTitles)) {
					pointsToTitles.forEach((pttData) => {
						const name = pttData.name || "?";
						const min = parseFloat(pttData.min) || undefined;
						const max = parseFloat(pttData.max) || undefined;
						const ptt = new PointsTitleMap(name, min, max);
						ladder.pointsToTitles.push(ptt);
					});
				}

				// Parse archetypes
				const pointWeightsToArchetypes = mappings.pointWeightsToArchetypes;
				if (pointWeightsToArchetypes && Array.isArray(pointWeightsToArchetypes)) {
					pointWeightsToArchetypes.forEach((pwaData) => {
						const name = pwaData.name || "?";
						const weights: { [key: string]: number } = {};
						const weightsData = pwaData.weights;
						if (weightsData && typeof weightsData === "object") {
							for (const weightKey in weightsData) {
								const weightData = weightsData[weightKey];
								if (weightData && typeof weightData === "number") {
									weights[weightKey] = weightData;
								}
							}
						}
						const pwa = new PointWeightsArchetypeMap(name, weights);
						ladder.pointWeightsToArchetypes.push(pwa);
					});
				}
			}
		}

		return ladder;
	}

	public getAllTracks(): Track[] {
		let tracks: Track[] = [];
		this.categories.forEach((category) => {
			tracks = tracks.concat(category.tracks);
		});
		return tracks;
	}

	public getTrackById(trackId: string): Track | undefined {
		for (const category of this.categories) {
			const track = category.tracks.find((track) => track.id === trackId);
			if (track) return track;
		}
		return undefined;
	}

	public getMilestonePoints(milestoneIndex: number): number {
		if (milestoneIndex === 0) return 0;
		if (milestoneIndex < this.milestonesToPoints.length - 1) return this.milestonesToPoints[milestoneIndex - 1];
		return this.milestonesToPoints[this.milestonesToPoints.length - 1];
	}

	public getMilestoneIds(): number[] {
		let numMaxMilestones = 0;
		for (const category of this.categories) {
			for (const track of category.tracks) {
				numMaxMilestones = Math.max(numMaxMilestones, track.milestones.length);
			}
		}

		const list: number[] = [];
		while (list.length < numMaxMilestones) list.push(list.length + 1);
		return list;
	}

	public getCategoryForTrack(trackId: string): Category | undefined {
		return this.categories.find((c) => {
			return c.tracks.some((t) => t.id === trackId);
		});
	}

	public getCategoryColorForTrack(trackId: string): string {
		const category = this.getCategoryForTrack(trackId);
		return category ? category.color : "#ff00ff";
	}

	public getCategoryColorForCategory(categoryId: string): string {
		const category = this.categories.find((category) => category.id === categoryId);
		return category ? category.color : "#ff00ff";
	}

	public hasArchetypes(): boolean {
		return this.pointWeightsToArchetypes.length > 0;
	}
}
