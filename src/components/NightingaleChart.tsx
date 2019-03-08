import * as React from "react";
import * as d3 from "d3";
import cx from "@emotion/css";

import Score from "../ladder/models/Score";
import Ladder from "../ladder/models/Ladder";

const width = 400;

const styles = {
	figure: {
		margin: 0,
	},
	svg: {
		width: width,
		height: width,
	},
	trackCategory: {
		fill: "#eee",
		opacity: 0.5,
	},
	trackMilestone: {
		fill: "#eee",
		cursor: "pointer",
		":hover": {
			stroke: "#000",
			strokeWidth: 4,
			strokeLinejoin: "round" as "round",
		},
	},
	trackMilestoneCurrent: {
		stroke: "#000",
		strokeWidth: 4,
		strokeLinejoin: "round" as "round",
	},
};

interface IProps {
	ladder: Ladder;
	score: Score;
	focusedTrackId: string;
	handleTrackMilestoneChangeFn: (arg0: string, arg1: number) => void;
}

class NightingaleChart extends React.Component<IProps> {
	private colorScale: any;
	private radiusScale: any;
	private arcFn: any;
	private createArcFnOut: any;

	public constructor(props: IProps) {
		super(props);
	}

	public render(): JSX.Element {
		this.createFunctions(this.props);

		const { focusedTrackId, handleTrackMilestoneChangeFn, ladder, score } = this.props;

		const hasCategoryNames = ladder.hasCategoryNames();

		const currentMilestoneId = score.getTrackMilestone(focusedTrackId);
		const allTracks = ladder.getAllTracks();
		const arcMilestones = ladder.getMilestoneIds();
		let accumulatedTracks = 0;
		return (
			<figure css={styles.figure}>
				<svg css={styles.svg}>
					<g transform={`translate(${width / 2},${width / 2}) rotate(-33.75)`}>
						{hasCategoryNames &&
							ladder.categories.map((category, i) => {
								const numTracks = category.tracks.length;
								accumulatedTracks += numTracks;
								return (
									<path
										key={i}
										css={styles.trackCategory}
										d={this.createArcFnOut(accumulatedTracks - numTracks, numTracks)()}
										style={{ fill: category.color }}
									/>
								);
							})}
						{allTracks.map((track, i) => {
							const isCurrentTrack = track.id == focusedTrackId;
							const color = ladder.getCategoryColorForTrack(track.id);
							return (
								<g key={track.id} transform={`rotate(${(i * 360) / allTracks.length + 45})`}>
									{arcMilestones.map((milestoneId) => {
										const isCurrentMilestone = isCurrentTrack && milestoneId == currentMilestoneId;
										const isMet = score.getTrackMilestone(track.id) >= milestoneId || milestoneId == 0;
										return (
											<path
												key={milestoneId}
												css={cx(styles.trackMilestone, isCurrentMilestone ? styles.trackMilestoneCurrent : undefined)}
												onClick={() => handleTrackMilestoneChangeFn(track.id, milestoneId)}
												d={this.arcFn(milestoneId)}
												style={{ fill: isMet ? color : undefined }}
											/>
										);
									})}
									<circle
										r={"8"}
										cx={"0"}
										cy={"-50"}
										style={{ fill: color }}
										css={cx(
											styles.trackMilestone,
											isCurrentTrack && !currentMilestoneId ? styles.trackMilestoneCurrent : "",
										)}
										onClick={() => handleTrackMilestoneChangeFn(track.id, 0)}
									/>
								</g>
							);
						})}
					</g>
				</svg>
			</figure>
		);
	}

	public createFunctions(props: IProps): void {
		const { ladder } = props;

		const hasCategoryNames = ladder.hasCategoryNames();
		const allTracks = ladder.getAllTracks();
		const arcMilestones = ladder.getMilestoneIds();
		arcMilestones.push(arcMilestones[arcMilestones.length - 1] + 1);

		const numBands = arcMilestones.length + (hasCategoryNames ? 1 : 0);

		this.colorScale = d3.scaleSequential(d3.interpolateWarm).domain([0, 5]);

		this.radiusScale = d3
			.scaleBand()
			.domain(arcMilestones.map((m) => m.toString(10)))
			.range([0.15 * width, (2.7 / numBands) * width])
			.paddingInner(0.1);

		this.arcFn = d3
			.arc()
			.innerRadius((milestone) => this.radiusScale(milestone))
			.outerRadius((milestone) => this.radiusScale(milestone) + this.radiusScale.bandwidth())
			.startAngle(-Math.PI / allTracks.length)
			.endAngle(Math.PI / allTracks.length)
			.padAngle(Math.PI / 200)
			.padRadius(0.45 * width)
			.cornerRadius(2);

		this.createArcFnOut = (start: number, length: number) => {
			return d3
				.arc()
				.innerRadius(this.radiusScale(arcMilestones.length))
				.outerRadius(this.radiusScale(arcMilestones.length) + this.radiusScale.bandwidth())
				.startAngle(-Math.PI / allTracks.length + (start * 2 * Math.PI) / allTracks.length + Math.PI * 0.25)
				.endAngle(-Math.PI / allTracks.length + ((start + length) * 2 * Math.PI) / allTracks.length + Math.PI * 0.25)
				.padAngle(Math.PI / 200)
				.padRadius(0.45 * width)
				.cornerRadius(2);
		};
	}
}

export default NightingaleChart;
