import aww from './aww/index.js';
import links from './links/index.js';

const commands = {
  aww: aww.execute,
  invite: links.invite.execute,
  reddit: links.reddit.execute,
  twitch: links.twitch.execute,
  youtube: links.youtube.execute,
};

const metadata = {
  aww: aww.metadata,
  invite: links.invite.metadata,
  reddit: links.reddit.metadata,
  twitch: links.twitch.metadata,
  youtube: links.youtube.metadata,
};

export default commands;
export { commands, metadata };
