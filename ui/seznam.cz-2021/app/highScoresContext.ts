import {createContext} from 'react'
import HighScoreStorage from '../storage/HighScoreStorage'

export default createContext<null | HighScoreStorage>(null)
