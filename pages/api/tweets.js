import { TwitterApi } from "twitter-api-v2";
import { formatISO, sub } from "date-fns";

export default async function (req, res) {
    let { user } = JSON.parse(req.body);

    const client = new TwitterApi({
        appKey: process.env.TWITTER_CONSUMER_KEY, // "consumerAppKey"
        appSecret: process.env.TWITTER_CONSUMER_SECRET, // "consumerAppSecret"
        accessToken: process.env.TWITTER_ACCESS_TOKEN, // "accessOAuthToken"
        accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET, // "accessOAuthSecret"
    });

    let d = new Date(
        sub(new Date(), {
            days: 7,
        })
    ).toISOString();

    const homeTimeline = await client.v2.userTimeline(user.provider_id, {
        start_time: d,
        end_time: new Date().toISOString(),
        "tweet.fields": ["created_at", "author_id", "in_reply_to_user_id"],
        max_results: 100,
    });

    let data = [];

    for (const fetchedTweet of homeTimeline) {
        data.push(fetchedTweet);
    }

    const follow = await client.v2.followers(user.provider_id, {
        asPaginator: true,
        "user.fields": ['public_metrics'],
    });

    let followers = [];

    for (const f of follow) {
        followers.push(f);
    }

    res.status(200).json({
        data,
        "followerCount": follow._realData.meta.result_count
    });
}
