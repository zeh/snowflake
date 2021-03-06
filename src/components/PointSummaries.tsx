import * as React from "react";

import Score from "../ladder/models/Score";

const styles = {
	table: {
		borderSpacing: 3,
		marginBottom: 20,
		marginLeft: -3,
	},
	pointSummaryLabel: {
		fontSize: 12,
		textAlign: "center" as "center",
		fontWeight: "normal" as "normal",
		width: 120,
	},
	pointSummaryValue: {
		width: 120,
		background: "#eee",
		fontSize: 24,
		fontWeight: "bold" as "bold",
		lineHeight: "50px",
		borderRadius: 2,
		textAlign: "center" as "center",
	},
};

interface IProps {
	score: Score;
}

class PointSummaries extends React.Component<IProps> {
	public render(): JSX.Element {
		const { score } = this.props;
		const totalPoints = score.getScore();
		const currentLevel = score.getLevel();
		const nextLevel = score.getNextLevel();
		const pointsToNextLevel = nextLevel ? `${nextLevel.points - totalPoints}` : undefined;

		const blocks = [
			{
				label: "Current level",
				value: currentLevel ? currentLevel.level : "N/A",
			},
			{
				label: "Total points",
				value: totalPoints,
			},
			{
				label: "Points to next level",
				value: pointsToNextLevel ? pointsToNextLevel : "N/A",
			},
		];

		return (
			<table css={styles.table}>
				<tbody>
					<tr>
						{blocks.map(({ label }, i) => (
							<th key={i} css={styles.pointSummaryLabel}>
								{label}
							</th>
						))}
					</tr>
					<tr>
						{blocks.map(({ value }, i) => (
							<td key={i} css={styles.pointSummaryValue}>
								{value}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		);
	}
}

export default PointSummaries;
