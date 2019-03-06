import * as React from 'react'

import TrackSelector from '../components/TrackSelector'
import NightingaleChart from '../components/NightingaleChart'
import KeyboardListener from '../components/KeyboardListener'
import Track from '../components/Track'
import Wordmark from '../components/Wordmark'
import LevelThermometer from '../components/LevelThermometer'
import PointSummaries from '../components/PointSummaries'
import TitleSelector from '../components/TitleSelector'
import Score from "../ladder/models/Score";
import { careerLadder } from '../ladder/Constants';

type SnowflakeAppState = {
  score: Score,
  name: string,
  title: string,
  focusedTrackId: string,
}

const allTracks = careerLadder.getAllTracks();

const hashToState = (hash: string): SnowflakeAppState | null => {
  if (!hash) return null
  const result = defaultState()
  const hashValues = hash.split('#')[1].split(',')
  if (!hashValues) return null
  allTracks.forEach((track, i) => {
    result.score.setTrackMilestone(track.id, Number(hashValues[i]))
  })
  if (hashValues[16]) result.name = decodeURI(hashValues[16])
  if (hashValues[17]) result.title = decodeURI(hashValues[17])
  return result
}

const emptyState = (): SnowflakeAppState => {
  return {
    name: '',
    title: '',
    score: new Score(careerLadder),
    focusedTrackId: careerLadder.categories[0].tracks[0].id
  }
}

const defaultState = (): SnowflakeAppState => {
  return {
    name: 'Cersei Lannister',
    title: 'Staff Engineer',
    score: new Score(careerLadder), // TODO: set other defaults
    focusedTrackId: careerLadder.categories[0].tracks[0].id
  }
}

const stateToHash = (state: SnowflakeAppState) => {
  if (!state || !state.score) return null
  const values = [ ...allTracks.map(track => state.score.getTrackMilestone(track.id)), encodeURI(state.name), encodeURI(state.title)]
  return values.join(',')
}

interface Props {}

class SnowflakeApp extends React.Component<Props, SnowflakeAppState> {
  constructor(props: Props) {
    super(props)
    this.state = emptyState()
  }

  componentDidUpdate() {
    const hash = stateToHash(this.state)
    if (hash) window.location.replace(`#${hash}`)
  }

  componentDidMount() {
    const state = hashToState(window.location.hash)
    if (state) {
      this.setState(state)
    } else {
      this.setState(defaultState())
    }
  }

  render() {
    return (
      <main>
        <style jsx global>{`
          body {
            font-family: Helvetica;
          }
          main {
            width: 960px;
            margin: 0 auto;
          }
          .name-input {
            border: none;
            display: block;
            border-bottom: 2px solid #fff;
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
            width: 380px;
            margin-bottom: 10px;
          }
          .name-input:hover, .name-input:focus {
            border-bottom: 2px solid #ccc;
            outline: 0;
          }
          a {
            color: #888;
            text-decoration: none;
          }
        `}</style>
        <div style={{margin: '19px auto 0', width: 142}}>
          <a href="https://medium.com/" target="_blank">
            <Wordmark />
          </a>
        </div>
        <div style={{display: 'flex'}}>
          <div style={{flex: 1}}>
            <form>
              <input
                  type="text"
                  className="name-input"
                  value={this.state.name}
                  onChange={e => this.setState({name: e.target.value})}
                  placeholder="Name"
                  />
              <TitleSelector
                  score={this.state.score}
                  currentTitle={this.state.title}
                  setTitleFn={(title) => this.setTitle(title)} />
            </form>
            <PointSummaries score={this.state.score} />
            <LevelThermometer ladder={careerLadder} score={this.state.score} />
          </div>
          <div style={{flex: 0}}>
            <NightingaleChart
				ladder={careerLadder}
                score={this.state.score}
                focusedTrackId={this.state.focusedTrackId}
                handleTrackMilestoneChangeFn={(track, milestone) => this.handleTrackMilestoneChange(track, milestone)} />
          </div>
        </div>
        <TrackSelector
            ladder={careerLadder}
            score={this.state.score}
            focusedTrackId={this.state.focusedTrackId}
            setFocusedTrackIdFn={this.setFocusedTrackId.bind(this)} />
        <KeyboardListener
            selectNextTrackFn={this.shiftFocusedTrack.bind(this, 1)}
            selectPrevTrackFn={this.shiftFocusedTrack.bind(this, -1)}
            increaseFocusedMilestoneFn={this.shiftFocusedTrackMilestoneByDelta.bind(this, 1)}
            decreaseFocusedMilestoneFn={this.shiftFocusedTrackMilestoneByDelta.bind(this, -1)} />
        <Track
            ladder={careerLadder}
            score={this.state.score}
            trackId={this.state.focusedTrackId}
            handleTrackMilestoneChangeFn={(track, milestone) => this.handleTrackMilestoneChange(track, milestone)} />
        <div style={{display: 'flex', paddingBottom: '20px'}}>
          <div style={{flex: 1}}>
            Made with ❤️ by <a href="https://medium.engineering" target="_blank">Medium Eng</a>.
            Learn about the <a href="https://medium.com/s/engineering-growth-framework" target="_blank">growth framework</a>.
            Get the <a href="https://github.com/Medium/snowflake" target="_blank">source code</a>.
            Read the <a href="https://medium.com/p/85e078bc15b7" target="_blank">terms of service</a>.
          </div>
        </div>
      </main>
    )
  }

  handleTrackMilestoneChange(trackId: string, milestoneIndex: number) {
    const score = this.state.score
    score.setTrackMilestone(trackId, milestoneIndex);

    const titles = score.getEligibleTitles();
    const title = titles.indexOf(this.state.title) === -1 ? titles[0] : this.state.title

    this.setState({ score: score, focusedTrackId: trackId, title })
  }

  shiftFocusedTrack(delta: number) {
    let index = allTracks.findIndex((track) => track.id === this.state.focusedTrackId);
    index = (index + delta + allTracks.length) % allTracks.length
    const focusedTrackId = allTracks[index].id
    this.setState({ focusedTrackId })
  }

  setFocusedTrackId(trackId: string) {
    let index = allTracks.findIndex((track) => track.id === trackId);
    const focusedTrackId = allTracks[index].id;
    this.setState({ focusedTrackId })
  }

  shiftFocusedTrackMilestoneByDelta(delta: number) {
    let prevMilestone = this.state.score.getTrackMilestone(this.state.focusedTrackId);
    let milestone = prevMilestone + delta
    if (milestone < 0) milestone = 0
    if (milestone > 5) milestone = 5
    this.handleTrackMilestoneChange(this.state.focusedTrackId, milestone)
  }

  setTitle(title: string) {
    let titles = this.state.score.getEligibleTitles()
    title = titles.indexOf(title) == -1 ? titles[0] : title
    this.setState({ title })
  }
}

export default SnowflakeApp
