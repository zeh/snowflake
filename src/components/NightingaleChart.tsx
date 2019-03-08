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

	public constructor(props: IProps) {
		super(props);

		const allTracks = this.props.ladder.getAllTracks();
		const arcMilestones = this.props.ladder.getMilestoneIds();

		this.colorScale = d3.scaleSequential(d3.interpolateWarm).domain([0, 5]);

		this.radiusScale = d3
			.scaleBand()
			.domain(arcMilestones.map((m) => m.toString(10)))
			.range([0.15 * width, 0.45 * width])
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
	}

	public render(): JSX.Element {
		const currentMilestoneId = this.props.score.getTrackMilestone(this.props.focusedTrackId);
		const allTracks = this.props.ladder.getAllTracks();
		const arcMilestones = this.props.ladder.getMilestoneIds();
		return (
			<figure css={styles.figure}>
				<svg css={styles.svg}>
					<g transform={`translate(${width / 2},${width / 2}) rotate(-33.75)`}>
						{allTracks.map((track, i) => {
							const isCurrentTrack = track.id == this.props.focusedTrackId;
							const color = this.props.ladder.getCategoryColorForTrack(track.id);
							return (
								<g key={track.id} transform={`rotate(${(i * 360) / allTracks.length})`}>
									{arcMilestones.map((milestoneId) => {
										const isCurrentMilestone = isCurrentTrack && milestoneId == currentMilestoneId;
										const isMet = this.props.score.getTrackMilestone(track.id) >= milestoneId || milestoneId == 0;
										return (
											<path
												key={milestoneId}
												css={cx(styles.trackMilestone, isCurrentMilestone ? styles.trackMilestoneCurrent : undefined)}
												onClick={() => this.props.handleTrackMilestoneChangeFn(track.id, milestoneId)}
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
										onClick={() => this.props.handleTrackMilestoneChangeFn(track.id, 0)}
									/>
								</g>
							);
						})}
					</g>
				</svg>
			</figure>
		);
	}
}

export default NightingaleChart;
