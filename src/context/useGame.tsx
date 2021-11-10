import { Game, GameEvent, Session } from 'common/types';
import { last } from 'lodash';
import { useEffect, useState } from 'react';
import feathers from 'services/feathers';
import { useListener } from './useListener';

export const useGame = ({ session }: { session?: Session }) => {
  const [game, setGame] = useState<Game>();

  const createGame = async (data: any = {}) => {
    if (!session) return;

    const r = await feathers
      .service('games')
      .create({ session_id: session._id });
    setGame(r);
  };

  useEffect(() => {
    if (last(session?.games_ids)) {
      feathers
        .service('games')
        .get(last(session?.games_ids))
        .then((g: Game) => setGame(g));
    }
  }, [session]);

  // Update game object synchronously
  useListener<Game>({
    serviceName: 'games',
    setter: setGame,
  });

  const patchGame = async (e: GameEvent) => {
    if (!game) return;

    return await feathers
      .service('games')
      .patch(game._id, e)
      .catch(console.error);
  };

  return { game, createGame, patchGame };
};
