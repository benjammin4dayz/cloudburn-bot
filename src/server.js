/**
 * The core server that runs on a Cloudflare worker.
 */

import { Router } from 'itty-router';
import { InteractionType, verifyKey } from 'discord-interactions';
import { PONG, WAVE, handleError } from './backend/util.js';
import { commands as cmd, metadata as data } from './commands/index.js';
import {
  TWITCH_USERNAME,
  YOUTUBE_USERNAME,
  REDDIT_SUBNAME,
} from './customize.js';

const router = Router();

/**
 * A simple :wave: hello page to verify the worker is working.
 */
router.get('/', (request, env) => WAVE(env));

/**
 * Main route for all requests sent from Discord.  All incoming messages will
 * include a JSON payload described here:
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
router.post('/', async (request, env) => {
  const { isValid, interaction } = await server.verifyDiscordRequest(
    request,
    env,
  );
  if (!isValid || !interaction) return handleError(401);
  // The `PING` interaction is used to handshake with the Discord API.
  if (interaction.type === InteractionType.PING) return PONG();
  // Most user commands will come as `APPLICATION_COMMAND`.
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const lc = (cmd) => cmd.name.toLowerCase();
    switch (lc(interaction.data)) {
      case lc(data.aww):
        return cmd.aww();
      case lc(data.invite):
        return cmd.invite(env);
      case lc(data.twitch):
        return cmd.twitch(TWITCH_USERNAME);
      case lc(data.youtube):
        return cmd.youtube(YOUTUBE_USERNAME);
      case lc(data.reddit):
        return cmd.reddit(REDDIT_SUBNAME);
      default:
        return handleError(400);
    }
  }
  console.error('Unhandled interaction type');
  return handleError(400);
});

router.all('*', () => handleError(404));

const server = {
  verifyDiscordRequest: async (request, env) => {
    const signature = request.headers.get('x-signature-ed25519');
    const timestamp = request.headers.get('x-signature-timestamp');
    const body = await request.text();

    const isValidRequest =
      signature &&
      timestamp &&
      verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);

    return !isValidRequest
      ? { isValid: false }
      : { interaction: JSON.parse(body), isValid: true };
  },
  fetch: async (request, env) => router.handle(request, env),
};

export default server;
