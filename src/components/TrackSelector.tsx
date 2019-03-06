import * as React from "react";

import Score from "../ladder/models/Score";
import Ladder from "../ladder/models/Ladder";

interface IProps {
	ladder: Ladder;
	score: Score;
	focusedTrackId: string;
	setFocusedTrackIdFn: (arg0: string) => void;
}

class TrackSelector extends React.Component<IProps> {
	public render(): JSX.Element {
		const allTracks = this.props.ladder.getAllTracks();
		return (
			<table>
				<style jsx>{`
					table {
						width: 100%;
						border-spacing: 3px;
						border-bottom: 2px solid #ccc;
						padding-bottom: 20px;
						margin-bottom: 20px;
						margin-left: -3px;
					}
					.track-selector-value {
						line-height: 50px;
						width: 50px;
						text-align: center;
						background: #eee;
						font-weight: bold;
						font-size: 24px;
						border-radius: 3px;
						cursor: pointer;
					}
					.track-selector-label {
						text-align: center;
						font-size: 9px;
					}
				`}</style>
				<tbody>
					<tr>
						{allTracks.map((track) => (
							<td
								key={track.id}
								className={"track-selector-label"}
								onClick={() => this.props.setFocusedTrackIdFn(track.id)}
							>
								{track.name}
							</td>
						))}
					</tr>
					<tr>
						{allTracks.map((track) => (
							<td
								key={track.id}
								className={"track-selector-value"}
								style={{
									border:
										"4px solid " +
										(track.id == this.props.focusedTrackId
											? "#000"
											: this.props.ladder.getCategoryColorForTrack(track.id)),
									background: this.props.ladder.getCategoryColorForTrack(track.id),
								}}
								onClick={() => this.props.setFocusedTrackIdFn(track.id)}
							>
								{this.props.score.getTrackMilestone(track.id)}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		);
	}
}

export default TrackSelector;
