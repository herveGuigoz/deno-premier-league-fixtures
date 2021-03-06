interface FixturesResponse {
  name: string,
  rounds: Round[]
}

interface Round {
  name: string,
  matches: Match[]
}

interface Match {
  date: string,
  team1: OpenFootballTeam,
  team2: OpenFootballTeam,
  score1: number,
  score2: number
}

interface OpenFootballTeam {
  key: string,
  name: string,
  code: string,
}

interface ClubItem {
  key: string,
  name: string,
  code: string
}

interface ClubResponse {
  name: string,
  clubs: ClubItem[]
}

export { FixturesResponse, ClubResponse }