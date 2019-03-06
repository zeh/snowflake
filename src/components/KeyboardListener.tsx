import * as React from "react";

interface IProps {
	increaseFocusedMilestoneFn: () => void;
	selectNextTrackFn: () => void;
	decreaseFocusedMilestoneFn: () => void;
	selectPrevTrackFn: () => void;
}

class KeyboardListener extends React.Component<IProps> {
	public componentDidMount(): void {
		window.addEventListener("keydown", (e) => this.handleKeyDown(e)); // TK unlisten
	}

	public handleKeyDown(e: KeyboardEvent): void {
		switch (e.code) {
			case "ArrowUp":
				this.props.increaseFocusedMilestoneFn();
				e.preventDefault();
				break;
			case "ArrowRight":
				this.props.selectNextTrackFn();
				e.preventDefault();
				break;
			case "ArrowDown":
				this.props.decreaseFocusedMilestoneFn();
				e.preventDefault();
				break;
			case "ArrowLeft":
				this.props.selectPrevTrackFn();
				e.preventDefault();
				break;
		}
	}

	public render(): JSX.Element | null {
		return null;
	}
}

export default KeyboardListener;
