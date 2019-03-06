import * as React from "react";

import Score from "../ladder/models/Score";

const styles = {
	select: {
		fontSize: 20,
		lineHeight: 20,
		marginBottom: 20,
		minWidth: 300,
	},
};

interface IProps {
	score: Score;
	currentTitle: string;
	setTitleFn: (arg0: string) => void;
}

class TitleSelector extends React.Component<IProps> {
	public render(): JSX.Element {
		const titles = this.props.score.getEligibleTitles();
		return (
			<select
				css={styles.select}
				value={this.props.currentTitle}
				onChange={(e) => this.props.setTitleFn(e.target.value)}
			>
				{titles.map((title) => (
					<option key={title}>{title}</option>
				))}
			</select>
		);
	}
}

export default TitleSelector;
