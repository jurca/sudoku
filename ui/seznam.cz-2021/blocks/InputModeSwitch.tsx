import classnames from 'classnames'
import * as React from 'react'
import Icon, {IconType} from '../reusable/Icon'
import styles from './inputModeSwitch.css'

export enum CssClassNames {
  ROOT = 'input-mode-switch',
  MODE = 'input-mode-switch__mode',
  ICON = 'input-mode-switch__icon',
  SEPARATOR = 'input-mode-switch__separator',
}

interface IProps {
  readonly name: string
  readonly defaultMode: InputMode
  onModeChange(currentMode: InputMode): void
}

export enum InputMode {
  INPUT = 'InputMode.INPUT',
  NOTES = 'InputMode.NOTES',
  ERASE = 'InputMode.ERASE',
}

const MODES: ReadonlyArray<readonly [InputMode, IconType]> = [
  [InputMode.INPUT, IconType.NUMERAL],
  [InputMode.NOTES, IconType.NOTEPAD],
  [InputMode.ERASE, IconType.ERASER],
]

export default function InputModeSwitch(props: IProps) {
  const onChange = React.useMemo(
    () => (event: React.ChangeEvent<HTMLInputElement>) => props.onModeChange(event.target.value as InputMode),
    [props.onModeChange],
  )

  return (
    <div className={classnames(CssClassNames.ROOT, styles.switch)}>
      <div className={styles.content}>
        {MODES.map(([mode, icon], index, modes) =>
          <React.Fragment key={mode}>
            <label className={styles.mode}>
              <input
                className={styles.input}
                type="radio"
                name={props.name}
                value={mode}
                defaultChecked={mode === props.defaultMode}
                onChange={onChange}
              />
              <span className={classnames(CssClassNames.MODE, styles.modeUI)}>
                <span className={classnames(CssClassNames.ICON, styles.icon)}>
                  <Icon icon={icon}/>
                </span>
              </span>
            </label>
            {index < modes.length - 1 &&
              <div className={classnames(CssClassNames.SEPARATOR, styles.separator)}/>
            }
          </React.Fragment>,
        )}
      </div>
    </div>
  )
}
