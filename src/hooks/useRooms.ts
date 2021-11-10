import {useMount} from 'ahooks';
import {Room} from 'common/types';
import {useState} from 'react';
import feathers from 'services/feathers';

const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>();
  useMount(() => {
    const reset = () => feathers.service('rooms').find().then(setRooms);
    feathers.service('rooms').on('created', reset);
    feathers.service('rooms').on('patched', reset);
    feathers.service('rooms').on('removed', reset);
    reset();
    return () => {
      feathers.service('rooms').removeListener('created', reset);
      feathers.service('rooms').removeListener('patched', reset);
      feathers.service('rooms').removeListener('removed', reset);
    };
  });
  return rooms;
};

export default useRooms;
