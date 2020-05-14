import Twit from 'twit';

export default async (req, res) => {
  const { tweetId } = req.body;

  const twitter = new Twit({
    consumer_key: process.env.twitterConsumerKey,
    consumer_secret: process.env.twitterConsumerSecret,
    access_token: process.env.twitterAccessToken,
    access_token_secret: process.env.twitterAccessTokenSecret,
  });

  try {
    twitter.get('statuses/retweets/:id', { id: tweetId }, function(err, data) {
      res.status(200).json({
        tweet: data,
        error: '',
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
};
