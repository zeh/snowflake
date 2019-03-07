import * as React from "react";

const styles = {
	select: {
		fontSize: 20,
		lineHeight: 20,
		marginBottom: 20,
		minWidth: 300,
	},
};

interface IProps {
	options: string[];
	onChange: (arg0: string) => void;
	value?: string;
}

class Selector extends React.Component<IProps> {
	public render(): JSX.Element {
		const { onChange, options, value } = this.props;
		return (
			<select css={styles.select} value={value || ""} onChange={(e) => onChange(e.target.value)}>
				{options.map((option) => (
					<option key={option}>{option}</option>
				))}
			</select>
		);
	}
}

export default Selector;
