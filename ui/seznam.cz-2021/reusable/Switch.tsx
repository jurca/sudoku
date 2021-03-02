import classnames from 'classnames'
import * as React from 'react'
import styles from './switch.css'

type Props = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>

export default function Switch(props: Props) {
  const {className, ...inputProps} = props
  return (
    <label className={classnames(className, styles.switch)}>
      <input {...inputProps} className={styles.input} type="checkbox"/>
      <span className={styles.ui}>
        <span className={styles.handle}/>
      </span>
    </label>
  )
}
