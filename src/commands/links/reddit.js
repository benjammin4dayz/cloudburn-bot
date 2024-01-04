import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../../backend/util.js';

const metadata = {
  name: 'reddit',
  description: 'Get a link to the Reddit community!',
};

const reddit = (subreddit) =>
  new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Join r/${subreddit} on Reddit!\n\nhttps://reddit.com/r/${subreddit.toLowerCase()}`,
    },
  });

export default {
  execute: reddit,
  metadata,
};
