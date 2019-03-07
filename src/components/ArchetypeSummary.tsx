import * as React from "react";

import Ladder from "../ladder/models/Ladder";
import Score from "../ladder/models/Score";

const styles = {
	table: {
		borderSpacing: 3,
		marginBottom: 20,
		marginLeft: -3,
		width: "70%",
	},
	summaryLabel: {
		fontSize: 12,
		textAlign: "center" as "center",
		fontWeight: "normal" as "normal",
		width: 120,
	},
	typePrimary: {
		background: "#eee",
		fontSize: 22,
		textAlign: "center" as "center",
		fontWeight: "bold" as "bold",
		lineHeight: 2,
	},
	typeSecondary: {
		background: "#eee",
		fontSize: 18,
		textAlign: "center" as "center",
		fontWeight: "normal" as "normal",
		lineHeight: 1.5,
	},
};

interface IProps {
	ladder: Ladder;
	score: Score;
}

class ArchetypeSummary extends React.Component<IProps> {
	public constructor(props: IProps) {
		super(props);
	}

	public render(): JSX.Element | null {
		if (!this.props.ladder.hasArchetypes()) return null;

		const types = this.props.score.getArchetypes();

		return (
			<table css={styles.table}>
				<tbody>
					<tr>
						<td css={styles.summaryLabel}>Archetypes</td>
					</tr>
					{types.map((type, i) => (
						<tr key={i} css={i === 0 ? styles.typePrimary : styles.typeSecondary}>
							<td>{`${type.name} (${Math.round(type.scale * 100)}%)`}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default ArchetypeSummary;
