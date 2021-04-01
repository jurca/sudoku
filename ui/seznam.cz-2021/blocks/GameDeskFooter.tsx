import classnames from 'classnames'
import * as React from 'react'
import IconButton, {IconType} from '../reusable/IconButton'
import isAndroidOrIOS from '../reusable/isAndroidOrIOS'
import styles from './gameDeskFooter.css'

interface IProps {
  readonly onNewGame: () => void
  readonly onPause: () => void
  readonly onUndo: () => void
  readonly onHelp: () => void
}

export default function GameDeskFooter(props: IProps): React.ReactElement {
  return (
    <div className={classnames(styles.gameDeskFooter, isAndroidOrIOS() && styles.forceMobileLayout)}>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <IconButton className={styles.button} icon={IconType.CIRCLED_PLUS} onAction={props.onNewGame}>
            Nová hra
          </IconButton>
        </div>
        <div className={styles.innerContainer}>
          <IconButton
            className={classnames(styles.button, styles.buttonWithMargin)}
            icon={IconType.PAUSE}
          >
            Pozastavit
          </IconButton>
          <IconButton
            className={classnames(styles.button, styles.buttonWithMargin)}
            icon={IconType.UNDO}
          >
            Zpět
          </IconButton>
          <IconButton
            className={classnames(styles.button, styles.buttonWithMargin)}
            icon={IconType.HELP}
          >
            Nápověda
          </IconButton>
        </div>
      </div>
    </div>
  )
}
