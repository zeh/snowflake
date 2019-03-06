import * as React from "react";

import Score from "../ladder/models/Score";
import Ladder from "../ladder/models/Ladder";

interface IProps {
	ladder: Ladder;
	score: Score;
	trackId: string;
	handleTrackMilestoneChangeFn: (arg0: string, arg1: number) => void;
}

class Track extends React.Component<IProps> {
	public render(): JSX.Element | null {
		const track = this.props.ladder.getTrackById(this.props.trackId);
		if (!track) return null;

		const currentMilestoneId = this.props.score.getTrackMilestone(this.props.trackId);
		const currentMilestone = track.milestones[currentMilestoneId - 1];
		return (
			<div className={"track"}>
				<style jsx>{`
					div.track {
						margin: 0 0 20px 0;
						padding-bottom: 20px;
						border-bottom: 2px solid #ccc;
					}
					h2 {
						margin: 0 0 10px 0;
					}
					p.track-description {
						margin-top: 0;
						padding-bottom: 20px;
						border-bottom: 2px solid #ccc;
					}
					table {
						border-spacing: 3px;
					}
					td {
						line-height: 50px;
						width: 50px;
						text-align: center;
						background: #eee;
						font-weight: bold;
						font-size: 24px;
						border-radius: 3px;
						cursor: pointer;
					}
					ul {
						line-height: 1.5em;
					}
				`}</style>
				<h2>{track.name}</h2>
				<p className={"track-description"}>{track.description}</p>
				<div style={{ display: "flex" }}>
					<table style={{ flex: 0, marginRight: 50 }}>
						<tbody style={{ display: "flex", flexDirection: "column-reverse" }}>
							{track.milestones.map((milestone, index) => {
								const isMet = index <= currentMilestoneId;
								const color = this.props.ladder.getCategoryColorForTrack(track.id);
								return (
									<tr key={index}>
										<td
											onClick={() => this.props.handleTrackMilestoneChangeFn(this.props.trackId, index)}
											style={{
												border: `4px solid ${index === currentMilestoneId ? "#000" : isMet ? color : "#eee"}`,
												background: isMet ? color : undefined,
											}}
										>
											{index}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{currentMilestone ? (
						<div style={{ flex: 1 }}>
							<h3>{currentMilestone.summary}</h3>
							<h4>Example behaviors:</h4>
							<ul>
								{currentMilestone.signals.map((signal, i) => (
									<li key={i}>{signal}</li>
								))}
							</ul>
							<h4>Example tasks:</h4>
							<ul>
								{currentMilestone.examples.map((example, i) => (
									<li key={i}>{example}</li>
								))}
							</ul>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

export default Track;
