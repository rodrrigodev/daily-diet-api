interface UserStatistics {
  id: string
  user_id: string
  name: string
  description: string
  completed: boolean
  day_hour: string
  created_at: string
  active: boolean
}

export function userStatistics(diets: UserStatistics[]) {
  const activeDiets = diets.filter((diet) => {
    return diet.active && !diet.completed
  }).length

  const actualStreak = diets.filter((diet) => {
    return diet.active && diet.completed
  }).length

  const notActiveDiets = diets.filter((diet) => {
    return !diet.active
  }).length

  const dietsCompleted =
    (diets.filter((diet) => {
      return diet.active
    }).length /
      diets.length) *
    100

  return {
    totalDiets: diets.length,
    activeDiets,
    notActiveDiets,
    actualStreak,
    dietsCompleted: dietsCompleted.toFixed(2),
  }
}
