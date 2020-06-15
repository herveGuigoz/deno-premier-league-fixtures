import { Team } from '../models/team.ts'
import { ClubResponse } from '../models/OpenDataModels.ts'
import { parseClubsResponse } from '../utils/OpenFootballParser.ts'

let cache: Team[] = [];

const _fetchTeam = async() => {
  const resp: Response = await fetch('https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.clubs.json');
  const json: ClubResponse = await resp.json();
  cache = parseClubsResponse(json);
}

// @desc    Get teams collection
// @route   GET /teams
const getTeamsCollection = async ({ response }: { response: any }) => {
  if(cache.length == 0) {
    try {
      await _fetchTeam();
    } catch (error) {
      response.status = 500
      response.body = {
        success: false,
	error: 'Server Error'
      }
    }
  }
  
  response.body = {
    success: true,
    data: cache
  }
}


// @desc    Get teams item
// @route   GET /teams/:id
const getTeamsItem = async ({ params, response }: { params: { id: string }, response: any }) => {
  if(cache.length == 0) {
    try {
      await _fetchTeam();
    } catch (error) {
      response.status = 500
      response.body = {
        success: false,
	error: 'Server Error'
      }
    }
  }
  
  const team: Team | undefined = cache.find(p => p.id === parseInt(params.id))
  
  if (team) {
    response.status = 200
    response.body = {
      success: true,
      data: team
    }
  } else {
    response.status = 404
    response.body = {
      success: false,
      msg: 'No team found'
    }
  }
}

export { getTeamsCollection, getTeamsItem }
