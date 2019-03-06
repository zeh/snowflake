import * as React from 'react'

import Score from "../ladder/models/Score";

interface Props {
  score: Score
}

class PointSummaries extends React.Component<Props> {
  render() {
    const totalPoints = this.props.score.getScore()
    const currentLevel = this.props.score.getLevel();
    const nextLevel = this.props.score.getNextLevel();
    const pointsToNextLevel = nextLevel ? `${nextLevel.points - totalPoints}` : "N/A";

    const blocks = [
      {
        label: 'Current level',
        value: currentLevel.level
      },
      {
        label: 'Total points',
        value: totalPoints
      },
      {
        label: 'Points to next level',
        value: pointsToNextLevel
      }
    ]

    return (
      <table>
        <style jsx>{`
          table {
            border-spacing: 3px;
            margin-bottom: 20px;
            margin-left: -3px;
          }
          .point-summary-label {
            font-size: 12px;
            text-align: center;
            font-weight: normal;
            width: 120px;
          }
          .point-summary-value {
            width: 120px;
            background: #eee;
            font-size: 24px;
            font-weight: bold;
            line-height: 50px;
            border-radius: 2px;
            text-align: center;
          }
        `}</style>
        <tbody>
          <tr>
          {blocks.map(({label}, i) => (
            <th key={i} className="point-summary-label">
              {label}
            </th>
          ))}
          </tr>
          <tr>
          {blocks.map(({value}, i) => (
            <td key={i} className="point-summary-value">
              {value}
            </td>
          ))}
          </tr>
        </tbody>
      </table>
    )
  }
}

export default PointSummaries
