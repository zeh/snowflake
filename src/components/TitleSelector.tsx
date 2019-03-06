import * as React from "react";
import Score from "../ladder/models/Score";

interface IProps {
	score: Score;
	currentTitle: string;
	setTitleFn: (arg0: string) => void;
}

class TitleSelector extends React.Component<IProps> {
	public render(): JSX.Element {
		const titles = this.props.score.getEligibleTitles();
		return (
			<select value={this.props.currentTitle} onChange={(e) => this.props.setTitleFn(e.target.value)}>
				<style jsx>{`
					select {
						font-size: 20px;
						line-height: 20px;
						margin-bottom: 20px;
						min-width: 300px;
					}
				`}</style>
				{titles.map((title) => (
					<option key={title}>{title}</option>
				))}
			</select>
		);
	}
}

export default TitleSelector;
