import { Fixture } from '../models/fixture.ts'
import { Team } from '../models/team.ts'
import { Round, Club } from '../models/OpenDataModels.ts'

const parseFixturesResponse = (json: any) => {
  let n: number = 0;
  let roundNumber: number = 1;
  let fixtures: Fixture[] = [];

  (json.rounds as Round[]).map(r => {

    let f: Fixture[] = (r as Round).matches.map(m => {
      n++;
      let fix: Fixture = {
        id: n,
        round: roundNumber,
        date: m.date,
        played: m.score1 !== null,
        homeTeam: m.team1.name,
        awayTeam: m.team2.name,
        homeScore: m.score1 ?? 0,
        awayScore: m.score2 ?? 0,
      }
      
      return fix;
    }); 
    roundNumber++;
    fixtures = [...fixtures, ...f];
  });

  return fixtures;
}

const parseClubsResponse = (json: Object) => {
  let n: number = 1;

  let teams: Team[] = (json as Club).clubs.map(item => {
    const team: Team = {
      id: n,
      name: item.name
    }
    n++;
    return team;
  });

  return teams;
}


export { parseFixturesResponse, parseClubsResponse }