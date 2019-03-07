import * as React from "react";

import TrackSelector from "../components/TrackSelector";
import NightingaleChart from "../components/NightingaleChart";
import KeyboardListener from "../components/KeyboardListener";
import Track from "../components/Track";
import Wordmark from "../components/Wordmark";
import LevelThermometer from "../components/LevelThermometer";
import PointSummaries from "../components/PointSummaries";
import Score from "../ladder/models/Score";
import LZString from "lz-string";
import CareerLadders from "../ladder/CareerLadders";
import Ladder from "../ladder/models/Ladder";
import TrackModel from "../ladder/models/Track";
import Selector from "./Selector";

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
	row: {
		marginTop: 20,
		display: "flex" as "flex",
		alignItems: "center",
	},
	rowP: {
		marginTop: 0,
		marginRight: 5,
	},
};

type ISnowflakeAppState = {
	ladder: Ladder;
	score: Score;
	name: string;
	title: string;
	ladderId?: string;
	focusedTrackId: string;
	tracks: TrackModel[];
};

const emptyState = (): ISnowflakeAppState => {
	const ladder = CareerLadders.getDefault();
	return {
		name: "",
		title: "",
		ladder: ladder,
		score: new Score(ladder),
		focusedTrackId: ladder.categories[0].tracks[0].id,
		tracks: ladder.getAllTracks(),
	};
};

const defaultState = (): ISnowflakeAppState => {
	const ladder = CareerLadders.getDefault();
	return {
		name: "Cersei Lannister",
		title: "Staff Engineer",
		ladder: ladder,
		score: new Score(ladder), // TODO: set other defaults
		focusedTrackId: ladder.categories[0].tracks[0].id,
		tracks: ladder.getAllTracks(),
	};
};

const hashToState = (hash: string): ISnowflakeAppState | null => {
	if (!hash) return null;
	const result = defaultState();
	const hashStateRaw = LZString.decompressFromEncodedURIComponent(hash);
	if (hashStateRaw && typeof hashStateRaw === "string") {
		const hashState = JSON.parse(hashStateRaw);
		if (hashState) {
			const { ladderId, name, title, ...milestoneIds } = hashState;
			if (ladderId) {
				const ladder = CareerLadders.get(CareerLadders.Ladders[ladderId]);
				if (ladder) {
					result.ladderId = ladderId;
					result.ladder = ladder;
					result.score = new Score(ladder);
				}
			}
			if (name) result.name = name;
			if (title) result.title = title;
			result.score.setState(milestoneIds);
		}
	}
	return result;
};

const stateToHash = (state: ISnowflakeAppState): string | null => {
	if (!state || !state.score) return null;
	const savedState = {
		...state.score.getState(),
		...(state.name ? { name: state.name } : undefined),
		...(state.title ? { title: state.title } : undefined),
		...(state.ladderId ? { ladderId: state.ladderId } : undefined),
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
							<div css={styles.row}>
								<p css={styles.rowP}>Career Ladder template:</p>
								<Selector
									value={this.state.ladderId}
									options={Object.keys(CareerLadders.Ladders)}
									onChange={(id) => this.setLadderId(id)}
								/>
							</div>
							<input
								type={"text"}
								css={styles.nameInput}
								value={this.state.name}
								onChange={(e) => this.setState({ name: e.target.value })}
								placeholder={"Name"}
							/>
							<Selector
								value={this.state.title}
								options={this.state.score.getEligibleTitles()}
								onChange={(title) => this.setTitle(title)}
							/>
						</form>
						<PointSummaries score={this.state.score} />
						<LevelThermometer ladder={this.state.ladder} score={this.state.score} />
					</div>
					<div style={{ flex: 0 }}>
						<NightingaleChart
							ladder={this.state.ladder}
							score={this.state.score}
							focusedTrackId={this.state.focusedTrackId}
							handleTrackMilestoneChangeFn={(track, milestone) => this.handleTrackMilestoneChange(track, milestone)}
						/>
					</div>
				</div>
				<TrackSelector
					ladder={this.state.ladder}
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
					ladder={this.state.ladder}
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
		let index = this.state.tracks.findIndex((track) => track.id === this.state.focusedTrackId);
		index = (index + delta + this.state.tracks.length) % this.state.tracks.length;
		const focusedTrackId = this.state.tracks[index].id;
		this.setState({ focusedTrackId });
	}

	public setFocusedTrackId(trackId: string): void {
		let index = this.state.tracks.findIndex((track) => track.id === trackId);
		const focusedTrackId = this.state.tracks[index].id;
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

	public setLadderId(ladderId: string): void {
		if (CareerLadders.Ladders.hasOwnProperty(ladderId)) {
			let ladder = CareerLadders.get(CareerLadders.Ladders[ladderId]);
			if (ladder) {
				this.setState({
					ladder,
					ladderId,
				});
			}
		}
	}
}

export default SnowflakeApp;
