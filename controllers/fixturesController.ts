import { Fixture } from '../models/fixture.ts'
import { parseFixturesResponse } from '../utils/OpenFootballParser.ts'

let cache: Fixture[] = [];

const _fetchFixtures = async() => {
	let resp: Response = await fetch('https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json');
  let json: Object = await resp.json();

  cache = parseFixturesResponse(json)
}

// @desc    Get fixtures collection
// @route   GET /teams
const getFixturesCollection = async ({ response }: { response: any }) => {

  if(cache.length == 0) {
		try {
			await _fetchFixtures();
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

// @desc    Get fixtures item
// @route   GET /fixtures/:id
const getFixturesItem = async ({ params, response }: { params: { id: string }, response: any }) => {

	if(cache.length == 0) {
		try {
			await _fetchFixtures();
		} catch (error) {
			response.status = 500
			response.body = {
				success: false,
				error: 'Server Error'
			}
		}
	}

	const fixture: Fixture | undefined = cache.find(p => p.id === parseInt(params.id))

	if (fixture) {
		response.status = 200
		response.body = {
				success: true,
				data: fixture
		}
	} else {
		response.status = 404
		response.body = {
				success: false,
				msg: 'No fixture found'
		}
	}
}

export { getFixturesCollection, getFixturesItem }