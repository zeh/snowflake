import * as React from "react";

import TrackSelector from "../components/TrackSelector";
import NightingaleChart from "../components/NightingaleChart";
import KeyboardListener from "../components/KeyboardListener";
import Track from "../components/Track";
import Wordmark from "../components/Wordmark";
import LevelThermometer from "../components/LevelThermometer";
import PointSummaries from "../components/PointSummaries";
import TitleSelector from "../components/TitleSelector";
import Score from "../ladder/models/Score";
import { careerLadder } from "../ladder/Constants";
import LZString from "lz-string";

const styles = {
	main: {
		fontFamily: "Helvetica",
		width: 960,
		margin: "0 auto",
	},
	nameInput: {
		border: "none",
		display: "block",
		borderBottom: "2px solid #fff",
		fontSize: 30,
		lineHeight: "40px",
		fontWeight: "bold" as "bold",
		width: 380,
		marginBottom: 10,
		":hover,:focus": {
			borderBottom: "2px solid #ccc",
			outline: 0,
		},
	},
	a: {
		color: "#888",
		textDecoration: "none",
	},
};

type ISnowflakeAppState = {
	score: Score;
	name: string;
	title: string;
	focusedTrackId: string;
};

const allTracks = careerLadder.getAllTracks();

const emptyState = (): ISnowflakeAppState => {
	return {
		name: "",
		title: "",
		score: new Score(careerLadder),
		focusedTrackId: careerLadder.categories[0].tracks[0].id,
	};
};

const defaultState = (): ISnowflakeAppState => {
	return {
		name: "Cersei Lannister",
		title: "Staff Engineer",
		score: new Score(careerLadder), // TODO: set other defaults
		focusedTrackId: careerLadder.categories[0].tracks[0].id,
	};
};

const hashToState = (hash: string): ISnowflakeAppState | null => {
	if (!hash) return null;
	const result = defaultState();
	const hashStateRaw = LZString.decompressFromEncodedURIComponent(hash);
	if (hashStateRaw && typeof hashStateRaw === "string") {
		const hashState = JSON.parse(hashStateRaw);
		if (hashState) {
			const { name, title, ...milestoneIds } = hashState;
			result.name = name;
			result.title = title;
			result.score.setState(milestoneIds);
		}
	}
	return result;
};

const stateToHash = (state: ISnowflakeAppState): string | null => {
	if (!state || !state.score) return null;
	const savedState = {
		...state.score.getState(),
		name: state.name,
		title: state.title,
	};
	const savedStateRaw = JSON.stringify(savedState);
	return LZString.compressToEncodedURIComponent(savedStateRaw);
};

interface IProps {}

class SnowflakeApp extends React.Component<IProps, ISnowflakeAppState> {
	public constructor(props: IProps) {
		super(props);
		this.state = emptyState();
	}

	public componentDidUpdate(): void {
		const hash = stateToHash(this.state);
		if (hash) window.location.replace(`#${hash}`);
	}

	public componentDidMount(): void {
		const state = hashToState(window.location.hash.substr(1));
		if (state) {
			this.setState(state);
		} else {
			this.setState(defaultState());
		}
	}

	public render(): JSX.Element {
		return (
			<main css={styles.main}>
				<div style={{ margin: "19px auto 0", width: 142 }}>
					<a css={styles.a} href={"https://medium.com/"} target={"_blank"}>
						<Wordmark />
					</a>
				</div>
				<div style={{ display: "flex" }}>
					<div style={{ flex: 1 }}>
						<form>
							<input
								type={"text"}
								css={styles.nameInput}
								value={this.state.name}
								onChange={(e) => this.setState({ name: e.target.value })}
								placeholder={"Name"}
							/>
							<TitleSelector
								score={this.state.score}
								currentTitle={this.state.title}
								setTitleFn={(title) => this.setTitle(title)}
							/>
						</form>
						<PointSummaries score={this.state.score} />
						<LevelThermometer ladder={careerLadder} score={this.state.score} />
					</div>
					<div style={{ flex: 0 }}>
						<NightingaleChart
							ladder={careerLadder}
							score={this.state.score}
							focusedTrackId={this.state.focusedTrackId}
							handleTrackMilestoneChangeFn={(track, milestone) => this.handleTrackMilestoneChange(track, milestone)}
						/>
					</div>
				</div>
				<TrackSelector
					ladder={careerLadder}
					score={this.state.score}
					focusedTrackId={this.state.focusedTrackId}
					setFocusedTrackIdFn={this.setFocusedTrackId.bind(this)}
				/>
				<KeyboardListener
					selectNextTrackFn={this.shiftFocusedTrack.bind(this, 1)}
					selectPrevTrackFn={this.shiftFocusedTrack.bind(this, -1)}
					increaseFocusedMilestoneFn={this.shiftFocusedTrackMilestoneByDelta.bind(this, 1)}
					decreaseFocusedMilestoneFn={this.shiftFocusedTrackMilestoneByDelta.bind(this, -1)}
				/>
				<Track
					ladder={careerLadder}
					score={this.state.score}
					trackId={this.state.focusedTrackId}
					handleTrackMilestoneChangeFn={(track, milestone) => this.handleTrackMilestoneChange(track, milestone)}
				/>
				<div style={{ display: "flex", paddingBottom: "20px" }}>
					<div style={{ flex: 1 }}>
						Made with ❤️ by{" "}
						<a css={styles.a} href={"https://medium.engineering"} target={"_blank"}>
							Medium Eng
						</a>
						. Learn about the{" "}
						<a css={styles.a} href={"https://medium.com/s/engineering-growth-framework"} target={"_blank"}>
							growth framework
						</a>
						. Get the{" "}
						<a css={styles.a} href={"https://github.com/Medium/snowflake"} target={"_blank"}>
							source code
						</a>
						. Read the{" "}
						<a css={styles.a} href={"https://medium.com/p/85e078bc15b7"} target={"_blank"}>
							terms of service
						</a>
						.
					</div>
				</div>
			</main>
		);
	}

	public handleTrackMilestoneChange(trackId: string, milestoneIndex: number): void {
		const score = this.state.score;
		score.setTrackMilestone(trackId, milestoneIndex);

		const titles = score.getEligibleTitles();
		const title = titles.indexOf(this.state.title) === -1 ? titles[0] : this.state.title;

		this.setState({ score: score, focusedTrackId: trackId, title });
	}

	public shiftFocusedTrack(delta: number): void {
		let index = allTracks.findIndex((track) => track.id === this.state.focusedTrackId);
		index = (index + delta + allTracks.length) % allTracks.length;
		const focusedTrackId = allTracks[index].id;
		this.setState({ focusedTrackId });
	}

	public setFocusedTrackId(trackId: string): void {
		let index = allTracks.findIndex((track) => track.id === trackId);
		const focusedTrackId = allTracks[index].id;
		this.setState({ focusedTrackId });
	}

	public shiftFocusedTrackMilestoneByDelta(delta: number): void {
		let prevMilestone = this.state.score.getTrackMilestone(this.state.focusedTrackId);
		let milestone = prevMilestone + delta;
		if (milestone < 0) milestone = 0;
		if (milestone > 5) milestone = 5;
		this.handleTrackMilestoneChange(this.state.focusedTrackId, milestone);
	}

	public setTitle(title: string): void {
		let titles = this.state.score.getEligibleTitles();
		title = titles.indexOf(title) == -1 ? titles[0] : title;
		this.setState({ title });
	}
}

export default SnowflakeApp;
