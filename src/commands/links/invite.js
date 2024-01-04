import {
  InteractionResponseType,
  InteractionResponseFlags,
} from 'discord-interactions';
import { JsonResponse } from '../../backend/util.js';

const metadata = {
  name: 'invite',
  description: 'Get an invite link to add this bot to your server!',
};

const invite = ({ DISCORD_APPLICATION_ID }) => {
  const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${DISCORD_APPLICATION_ID}&permissions=2147485696&scope=bot+applications.commands`;

  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: INVITE_URL,
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  });
};

export default {
  execute: invite,
  metadata,
};
