const request = require('request-promise-native')
const has = require('./multiDeepHas.js')

const url = 'http://realclearpolitics.com/epolls/json/5493_historical.js'

const promiseOfRating = request(url)
.then(jsonp => {
  // strip callback function
  return jsonp.replace(/^return_json\(|\)\;/g, '')
})
.then(JSON.parse)
.then(getLatest)
.then(compilePoll)
.catch(err => console.error(err))

function getLatest(data) {
  return data.poll.rcp_avg[0]; // safer: sort by date?
}

function compilePoll(results) {
  if (!has(results, 'date', 'candidate[0]', 'candidate[1]')) {
    return new Error('RCP data is missing something. Maybe they changed their spec?')
  }
  const compiledResults = {}
  const favString = results.candidate.find(result => {return result.name === 'Favorable'}).value
  const unfavString = results.candidate.find(result => {return result.name === 'Unfavorable'}).value

  compiledResults.date = new Date(results.date)
  // get a 1-place percent string ('40.8') to 3-place decimal (.408)
  compiledResults.favorable = Math.round(parseFloat(favString) * 10) / 1000
  compiledResults.unfavorable = Math.round(parseFloat(unfavString) * 10) / 1000

  return compiledResults
}

module.exports = promiseOfRating
