enum Difficulty {
  EASY = 'Difficulty.EASY',
  MEDIUM = 'Difficulty.MEDIUM',
  HARD = 'Difficulty.HARD',
}

export default Difficulty

export const DIFFICULTY_TO_CARVED_NUMBERS = {
  [Difficulty.EASY]: 28,
  [Difficulty.MEDIUM]: 37,
  [Difficulty.HARD]: 46,
}
