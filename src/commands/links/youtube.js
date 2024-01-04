import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../../backend/util.js';

const metadata = {
  name: 'youtube',
  description: 'Get a link to some cool videos!',
};

const youtube = (username) =>
  new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Subscribe to ${username} on YouTube!\n\nhttps://youtube.com/@${username.toLowerCase()}`,
    },
  });

export default {
  execute: youtube,
  metadata,
};
