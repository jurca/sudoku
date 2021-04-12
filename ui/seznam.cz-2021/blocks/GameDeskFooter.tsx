import classnames from 'classnames'
import * as React from 'react'
import IconButton, {IconType} from '../reusable/IconButton'
import isAndroidOrIOS from '../reusable/isAndroidOrIOS'
import styles from './gameDeskFooter.css'

interface IProps {
  readonly className?: string
  readonly onNewGame: () => void
  readonly onPause: () => void
  readonly onUndo: () => void
  readonly onHelp: () => void
}

export default function GameDeskFooter(props: IProps): React.ReactElement {
  return (
    <div className={classnames(styles.gameDeskFooter, isAndroidOrIOS() && styles.forceMobileLayout, props.className)}>
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
            onAction={props.onPause}
          >
            Pozastavit
          </IconButton>
          <IconButton
            className={classnames(styles.button, styles.buttonWithMargin)}
            icon={IconType.UNDO}
            onAction={props.onUndo}
          >
            Zpět
          </IconButton>
          <IconButton
            className={classnames(styles.button, styles.buttonWithMargin)}
            icon={IconType.HELP}
            onAction={props.onHelp}
          >
            Nápověda
          </IconButton>
        </div>
      </div>
    </div>
  )
}
