import client from '../apiClient';

export const notifyRequest = async (token: String): Promise<any> => {
  const res = await client
    .post('/api/notifications', { token: token })
    .catch((err: any) => {
      throw err;
    });
  return res.data;
};

export const sleepNotifyRequest = async (token: String): Promise<any> => {
  const res = await client
    .post('/api/sleep_notify', { token: token })
    .catch((err: any) => {
      throw err;
    });
  return res.data;
};
