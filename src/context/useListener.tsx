import { useMount } from 'ahooks';
import dayjs from 'dayjs';
import feathers from 'services/feathers';

export const useListener = <T extends { _id?: string; updated_at: Date }>({
  setter,
  serviceName,
}: {
  setter: (e: any) => void;
  serviceName: string;
}) => {
  useMount(() => {
    const handler = (force = false) => (message: T) => {
      setter((prev: T) =>
        !prev ||
        (dayjs(message.updated_at).isSameOrAfter(prev.updated_at) &&
          (force || message._id === prev._id))
          ? message
          : prev,
      );
    };

    const patchHandler = handler();
    const createHandler = handler(true);

    feathers.service(serviceName).on('created', createHandler);
    feathers.service(serviceName).on('patched', patchHandler);

    return () => {
      feathers.service(serviceName).removeListener('created', createHandler);
      feathers.service(serviceName).removeListener('patched', patchHandler);
    };
  });
};
