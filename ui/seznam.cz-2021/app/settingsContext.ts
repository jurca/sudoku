import {createContext} from 'react'
import SettingsStorage from '../storage/SettingsStorage'

export default createContext<null | SettingsStorage>(null)
