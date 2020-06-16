import { Fixture } from '../models/fixture.ts'
import { Team } from '../models/team.ts'
import { FixturesResponse, ClubResponse } from '../models/openDataModels.ts'

const parseFixturesResponse = (json: FixturesResponse) => {
  let id: number = 0;
  let roundNumber: number = 1;
  let fixtures: Fixture[] = [];

  json.rounds.map(round => {

    const item: Fixture[] = round.matches.map(match => {
      id++;
      const fix: Fixture = {
        id: id,
        round: roundNumber,
        date: match.date,
        played: match.score1 !== null,
        homeTeam: match.team1.name,
        awayTeam: match.team2.name,
        homeScore: match.score1 ?? 0,
        awayScore: match.score2 ?? 0,
      }
      
      return fix;
    }); 
    roundNumber++;
    fixtures = [...fixtures, ...item];
  });

  return fixtures;
}

const parseClubsResponse = (json: ClubResponse) => {
  let id: number = 1;

  const teams: Team[] = json.clubs.map(item => {
    const team: Team = {
      id: id,
      name: item.name
    }
    id++;
    return team;
  });

  return teams;
}


export { parseFixturesResponse, parseClubsResponse }