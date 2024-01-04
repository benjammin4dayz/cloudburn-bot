import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../../backend/util.js';
import { getCuteUrl } from './reddit.js';

const metadata = {
  name: 'awww',
  description: 'Drop some cute on this channel.',
};

const aww = async () => {
  const cuteUrl = await getCuteUrl();

  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: cuteUrl,
    },
  });
};

export default {
  execute: aww,
  metadata,
};
