enum Difficulty {
  EASY = 'Difficulty.EASY',
  MEDIUM = 'Difficulty.MEDIUM',
  HARD = 'Difficulty.HARD',
}

export default Difficulty

export const DIFFICULTY_TO_CARVED_NUMBERS = {
  [Difficulty.EASY]: 37,
  [Difficulty.MEDIUM]: 46,
  [Difficulty.HARD]: 55,
}
