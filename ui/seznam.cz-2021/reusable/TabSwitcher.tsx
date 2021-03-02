import * as React from 'react'
import styles from './tabSwitcher.css'

export interface ITab {
  readonly id: string
  readonly label: string
}

interface IProps {
  readonly name: string
  readonly tabs: readonly ITab[]
  readonly defaultSelectedTabId?: string
  readonly onActiveTabChange?: (activeTabId: string) => void
}

export default function TabSwitcher({defaultSelectedTabId, name, tabs, onActiveTabChange}: IProps) {
  const onChange = React.useMemo(
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const tabId = event.target.value
      if (onActiveTabChange && tabs.find((tab) => tab.id === tabId)) {
        onActiveTabChange(tabId)
      }
    },
    [tabs, onActiveTabChange],
  )

  return (
    <div className={styles.tabSwitcher}>
      {tabs.map((tab) =>
        <label key={tab.id} className={styles.tab}>
          <input
            className={styles.tabInput}
            type="radio"
            name={name}
            value={tab.id}
            defaultChecked={tab.id === defaultSelectedTabId}
            onChange={onChange}
          />
          <span className={styles.tabUi}>
            {tab.label}
          </span>
        </label>,
      )}
    </div>
  )
}
