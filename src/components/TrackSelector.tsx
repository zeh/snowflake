import * as React from "react";

import Score from "../ladder/models/Score";
import Ladder from "../ladder/models/Ladder";

const styles = {
	container: {
		width: "100%",
		display: "flex",
		paddingBottom: 20,
		marginBottom: 20,
		marginTop: 20,
		borderBottom: "2px solid #ccc",
	},
	category: {
		display: "flex" as "flex",
		flex: "1",
		flexWrap: "wrap" as "wrap",
		alignSelf: "flex-end" as "flex-end",
		marginLeft: 3,
		":first-of-type": {
			marginLeft: 0,
		},
	},
	trackGroup: {
		display: "flex" as "flex",
		flexWrap: "nowrap" as "nowrap",
		flex: "1",
	},
	track: {
		flex: "1",
		alignSelf: "flex-end",
		marginLeft: 3,
		":first-of-type": {
			marginLeft: 0,
		},
	},
	trackName: {
		textAlign: "center" as "center",
		fontSize: 9,
		marginBottom: 5,
		wordBreak: "break-word" as "break-word",
	},
	categoryName: {
		fontSize: 9,
		fontWeight: "bold" as "bold",
		flex: "1 0 100%",
		textAlign: "center" as "center",
		marginTop: 2,
		backgroundColor: "#eee",
		lineHeight: "2em",
		height: "2em",
		opacity: 0.7,
		borderRadius: "0 0 4px 4px",
	},
	trackBox: {
		lineHeight: "50px",
		textAlign: "center" as "center",
		background: "#eee",
		fontWeight: "bold" as "bold",
		fontSize: 24,
		borderRadius: 3,
		cursor: "pointer" as "pointer",
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
		const { focusedTrackId, ladder, score } = this.props;

		const hasCategoryNames = ladder.hasCategoryNames();

		return (
			<div css={styles.container}>
				{ladder.categories.map((category) => (
					<div key={category.id} css={styles.category} style={{ flex: category.tracks.length }}>
						<div css={styles.trackGroup}>
							{category.tracks.map((track) => (
								<div key={track.id} css={styles.track} onClick={() => this.props.setFocusedTrackIdFn(track.id)}>
									<div css={styles.trackName}>{track.name}</div>
									<div
										css={styles.trackBox}
										style={{
											border:
												"4px solid " +
												(track.id == focusedTrackId ? "#000" : ladder.getCategoryColorForTrack(track.id)),
											background: category.color,
											color: category.textColor,
										}}
									>
										{score.getTrackMilestone(track.id)}
									</div>
								</div>
							))}
						</div>
						{hasCategoryNames && (
							<div
								css={styles.categoryName}
								style={{
									background: category.color,
									color: category.textColor,
								}}
							>
								{category.name}
							</div>
						)}
					</div>
				))}
			</div>
		);
	}
}

export default TrackSelector;
