import * as httpRequest from '../utils/httpRequest';

//Search query example
export const search = async (param1, param2) => {
  try {
    const res = await httpRequest.get('posts', {
      params: {
        param1,
        param2,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
