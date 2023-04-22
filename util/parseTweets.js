import { sub } from 'date-fns'

function rotate(arr, angle){

	angle %= arr.length

	for(let i=0; i<= angle; i++){
		let pop = arr.shift()
		arr.push(pop)
	}

	arr.reverse()

	return arr
}

function getDateArray(start, end){

	let dates = []

	for(let i = 0; i<7; i++ ){
		let temp = sub(new Date(start), {
			days: i
		})

		dates.push(temp.getDate() + '/' + temp.getMonth())
	}

	dates.reverse()

	return dates

}

export function parseTweets(tweets){
	let obj = {};

	// count of tweets in last 7 days
	obj.daysCount = [0, 0, 0, 0, 0, 0, 0]

	// longest streal maintained in last 7 days
	obj.streak = 0

	// count of tweets in last 7 days
	obj.daysTweeted = [0, 0, 0, 0, 0, 0, 0]

	// count of replies in last 7 days
	obj.daysReplied = [0, 0, 0, 0, 0, 0, 0]

	let dayStart = new Date().getDay()
	let todayTweets = 0, todayReplies = 0;

	for(const t of tweets){
		let day = new Date(t.created_at).getDay()
		obj.daysCount[day] += 1

		if(day == dayStart){
			if('in_reply_to_user_id' in t){
				todayTweets += 1
			} else {
				todayReplies += 1
			}			
		}

		if('in_reply_to_user_id' in t){
			obj.daysReplied[day] += 1
		} else {
			obj.daysTweeted[day] += 1
		}
	}

	obj.today = {
		tweets: todayTweets,
		replies: todayReplies
	}

	rotate(obj.daysCount, dayStart)
	rotate(obj.daysReplied, dayStart)
	rotate(obj.daysTweeted, dayStart)

	for(let i = 0; i < obj.daysCount.length && obj.daysCount[i] != 0; i++){
		obj.streak += 1
	}

	obj.startDate = tweets[0].created_at

	obj.dates = getDateArray(obj.startDate, obj.endDate)

	let maxTweeted = 0
	let maxReplied = 0

	for(const t of obj.daysTweeted){
		if(t > maxTweeted){
			maxTweeted = t
		}
	}

	for(const t of obj.daysReplied){
		if(t > maxReplied){
			maxReplied = t
		}
	}

	obj.maxTweeted = maxTweeted
	obj.maxReplied = maxReplied

	// console.log(obj)

	return obj

}