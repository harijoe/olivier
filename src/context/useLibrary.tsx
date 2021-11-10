import { useState, useEffect } from 'react';
import feathers from 'services/feathers';
import { Game, Library } from 'common/types';

export const useLibrary = ({ game }: { game?: Game }) => {
  const [library, setLibrary] = useState<Library>();

  // Retrieve last game in DB for initialization
  // Refetches library on every new game
  useEffect(() => {
    feathers
      .service('library')
      .get(null)
      .then((r: { library: Library }) => setLibrary(r.library))
      .catch((e: Error) => {
        window.alert(
          "La librairie n'a pas pu être téléchargée, veuillez recharger la page",
        );
        throw e;
      });
  }, [game?._id]);

  return { library };
};
