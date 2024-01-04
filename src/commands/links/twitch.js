import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../../backend/util.js';

const metadata = {
  name: 'twitch',
  description: "Get a link to the streamer's Twitch channel!",
};

const twitch = (username) =>
  new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Follow ${username} on Twitch!\n\nhttps://twitch.tv/${username.toLowerCase()}`,
    },
  });

export default {
  execute: twitch,
  metadata,
};
