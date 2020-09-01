/**
 * Helper Function for calling api's.
 * @param {*} method :-describes the api method (required)
 * @param {*} params :- contains the api payload (required)
 * @param {*} endPoint :- contains the api endPoint (required)

 */
export const getData = async (method, params, endPoint) => {
  console.log(method, params, endPoint);
  try {
    const {data} = await axios({
      method: method,
      url: endPoint,
      //   data: params,
    });
    console.log(data, '-----------datat--------------');
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};
