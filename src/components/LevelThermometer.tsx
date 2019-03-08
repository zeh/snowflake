import * as d3 from "d3";
import * as React from "react";

import Ladder from "../ladder/models/Ladder";
import Score from "../ladder/models/Score";

const margins = {
	top: 30,
	right: 20,
	bottom: 30,
	left: 10,
};
const height = 150;
const width = 550;

const styles = {
	figure: {
		margin: "0 0 0 -10px",
	},
	svg: {
		width: width,
		height: height + 10,
	},
};

interface IProps {
	ladder: Ladder;
	score: Score;
}

class LevelThermometer extends React.Component<IProps> {
	private pointScale: any;
	private topAxisFn: any;
	private bottomAxisFn: any;
	private topAxis: unknown;
	private bottomAxis: unknown;

	public constructor(props: IProps) {
		super(props);

		const pointsToLevelsKeys = this.props.ladder.pointsToLevels.map((ptl) => ptl.points.toString(10));

		this.pointScale = d3
			.scaleLinear()
			.domain([0, 135])
			.rangeRound([0, width - margins.left - margins.right]);

		this.topAxisFn = d3
			.axisTop()
			.scale(this.pointScale)
			.tickValues(pointsToLevelsKeys)
			.tickFormat((points, i) => this.props.ladder.pointsToLevels[i].level);

		this.bottomAxisFn = d3
			.axisBottom()
			.scale(this.pointScale)
			.tickValues(pointsToLevelsKeys);
	}

	public componentDidMount(): void {
		d3.select(this.topAxis)
			.call(this.topAxisFn)
			.selectAll("text")
			.attr("y", 0)
			.attr("x", -25)
			.attr("transform", "rotate(90)")
			.attr("dy", ".35em")
			.style("font-size", "12px")
			.style("text-anchor", "start");
		d3.select(this.bottomAxis)
			.call(this.bottomAxisFn)
			.selectAll("text")
			.attr("y", 0)
			.attr("x", 10)
			.attr("transform", "rotate(90)")
			.attr("dy", ".35em")
			.style("font-size", "12px")
			.style("text-anchor", "start");
	}

	public rightRoundedRect(x: number, y: number, width: number, height: number, radius: number): string {
		return (
			"M" +
			x +
			"," +
			y +
			"h" +
			(width - radius) +
			"a" +
			radius +
			"," +
			radius +
			" 0 0 1 " +
			radius +
			"," +
			radius +
			"v" +
			(height - 2 * radius) +
			"a" +
			radius +
			"," +
			radius +
			" 0 0 1 " +
			-radius +
			"," +
			radius +
			"h" +
			(radius - width) +
			"z"
		);
	}

	public render(): JSX.Element | null {
		if (!this.props.ladder.hasLevels()) return null;

		let categoryPoints = this.props.score.getScoreByCategory();
		let lastCategoryIndex = 0;
		Object.keys(categoryPoints).forEach((categoryKey, i) => {
			if (categoryPoints[categoryKey]) lastCategoryIndex = i;
		});
		let cumulativePoints = 0;
		return (
			<figure css={styles.figure}>
				<svg css={styles.svg}>
					<g transform={`translate(${margins.left},${margins.top})`}>
						{Object.keys(categoryPoints).map((categoryKey, i) => {
							const categoryPoint = categoryPoints[categoryKey];
							const color = this.props.ladder.getCategoryColorForCategory(categoryKey);
							const x = this.pointScale(cumulativePoints);
							const width = this.pointScale(cumulativePoints + categoryPoint) - x;
							cumulativePoints += categoryPoint;
							return i != lastCategoryIndex ? (
								<rect
									key={`${categoryKey}-react`}
									x={x}
									y={0}
									width={width}
									height={height - margins.top - margins.bottom}
									style={{ fill: color, borderRight: "1px solid #000" }}
								/>
							) : (
								<path
									key={`${categoryKey}-path`}
									d={this.rightRoundedRect(x, 0, width, height - margins.top - margins.bottom, 3)}
									style={{ fill: color }}
								/>
							);
						})}
						<g ref={(ref) => (this.topAxis = ref)} className={"top-axis"} transform={`translate(0, -2)`} />
						<g
							ref={(ref) => (this.bottomAxis = ref)}
							className={"bottom-axis"}
							transform={`translate(0,${height - margins.top - margins.bottom + 1})`}
						/>
					</g>
				</svg>
			</figure>
		);
	}
}

export default LevelThermometer;
