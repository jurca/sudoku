import * as React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import Difficulty from '../../../conf/Difficulty'
import {closeDialogs} from '../Action'
import SettingsListItem from '../blocks/SettingsListItem'
import TabSwitcher, {ITab} from '../reusable/TabSwitcher'
import {highScoresSelector} from '../selectors'
import {IState} from '../state'
import {HighScores} from '../storage/HighScoreStorage'
import {IDialogProps} from './DialogHost'
import styles from './highScores.css'

interface IDataProps {
  readonly highScores: HighScores
}

interface ICallbackProps {
  onCloseDialogs(): void
}

type Props = IDataProps & ICallbackProps & IDialogProps

const DIFFICULTY_TABS: readonly ITab[] = [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map(
  (difficulty) => ({
    id: difficulty,
    label: getDifficultyLabel(difficulty),
  }),
)

function HighScores(props: Props) {
  const [difficulty, setDifficulty] = React.useState(Difficulty.MEDIUM)
  const onTabChange = React.useMemo(
    () => (newDifficulty: string) => {
      setDifficulty(newDifficulty as Difficulty)
    },
    [setDifficulty],
  )

  return (
    <div>
      <TabSwitcher
        name="difficulty"
        tabs={DIFFICULTY_TABS}
        defaultSelectedTabId={Difficulty.MEDIUM}
        onActiveTabChange={onTabChange}
      />
      <SettingsListItem
        leftContent="Vyhrané hry"
        rightContent={
          <span className={styles.stat}>
            {props.highScores[difficulty].wonGamesWithHints + props.highScores[difficulty].wonGamesWithoutHints}
          </span>
        }
      />
      <SettingsListItem
        leftContent="Vyhrané hry bez nápovědy"
        rightContent={
          <span className={styles.stat}>
            {props.highScores[difficulty].wonGamesWithoutHints}
          </span>
        }
      />
      <SettingsListItem
        leftContent="Nejkratší vyhraná hra"
        rightContent={
          <span className={styles.stat}>
            {formatTime(props.highScores[difficulty].shortestWonGame)}
          </span>
        }
      />
      <SettingsListItem
        leftContent="Nejdelší vyhraná hra"
        rightContent={
          <span className={styles.stat}>
            {formatTime(props.highScores[difficulty].longestWonGame)}
          </span>
        }
      />
    </div>
  )
}

export default Object.assign(connect<IDataProps, ICallbackProps, IDialogProps, IState>(
  createStructuredSelector({
    highScores: highScoresSelector,
  }),
  {
    onCloseDialogs: closeDialogs,
  },
)(
  HighScores,
), {
  drawerActionLabel: 'Zpět do hry',
  title: 'Skóre',
})

function formatTime(time: number): string {
  const timeAsSeconds = Math.floor(time / 1_000)
  return [Math.floor(timeAsSeconds / 60), `${timeAsSeconds % 60}`.padStart(2, '0')].join(':')
}

function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case Difficulty.EASY:
      return 'Lehká'
    case Difficulty.MEDIUM:
      return 'Střední'
    case Difficulty.HARD:
      return 'Těžká'
  }
}
