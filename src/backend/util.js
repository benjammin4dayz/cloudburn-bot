import { InteractionResponseType } from 'discord-interactions';

class JsonResponse extends Response {
  constructor(body, init) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    super(jsonBody, init);
  }
}

const PONG = () => new JsonResponse({ type: InteractionResponseType.PONG });

const WAVE = ({ DISCORD_APPLICATION_ID }) =>
  new Response(`👋 ${DISCORD_APPLICATION_ID}`);

const handleError = (code) => {
  const _ERR_UNKNOWN_TYPE = () =>
    new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
  const _ERR_BAD_REQUEST_SIGNATURE = () =>
    new Response('Bad request signature.', { status: 401 });
  const _ERR_NOT_FOUND = () => new Response('Not Found.', { status: 404 });
  switch (code) {
    case 400:
      return _ERR_UNKNOWN_TYPE();
    case 401:
      return _ERR_BAD_REQUEST_SIGNATURE();
    case 404:
      return _ERR_NOT_FOUND();
    default:
      console.warn('Unrecognized error code:', code);
      return _ERR_NOT_FOUND();
  }
};

export { JsonResponse, PONG, WAVE, handleError };
