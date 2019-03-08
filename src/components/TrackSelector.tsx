import * as React from "react";

import Score from "../ladder/models/Score";
import Ladder from "../ladder/models/Ladder";

const styles = {
	table: {
		width: "100%",
		borderSpacing: 3,
		borderBottom: "2px solid #ccc",
		paddingBottom: 20,
		marginBottom: 20,
		marginLeft: -3,
	},
	trackSelectorValue: {
		lineHeight: "50px",
		width: 50,
		textAlign: "center" as "center",
		background: "#eee",
		fontWeight: "bold" as "bold",
		fontSize: 24,
		borderRadius: 3,
		cursor: "pointer" as "pointer",
	},
	trackSelectorLabel: {
		textAlign: "center" as "center",
		fontSize: 9,
	},
};

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
			<table css={styles.table}>
				<tbody>
					<tr>
						{allTracks.map((track) => (
							<td
								key={track.id}
								css={styles.trackSelectorLabel}
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
								css={styles.trackSelectorValue}
								style={{
									border:
										"4px solid " +
										(track.id == this.props.focusedTrackId
											? "#000"
											: this.props.ladder.getCategoryColorForTrack(track.id)),
									background: this.props.ladder.getCategoryColorForTrack(track.id),
									color: this.props.ladder.getCategoryTextColorForTrack(track.id),
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
