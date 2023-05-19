import common from '../common/common';
const dataservice = async (controller, reqbody) => {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqbody)
  };
  //common.baseurl +;
  // https://maubantourism.smartpay.ph/
  // https://tourism-test.smartpay.ph/
  const url = "https://balertourism.smartpay.ph/balertourism/balertourismphp/" + controller + ".php"
  //const url = "http://localhost:90/BalerAuroraPHP/" + controller + ".php"
  return await fetch(url, requestOptions)
    .then(async response => {
      const data = await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      } else {
        return data;
      }

    })
    .catch(error => {
      return Promise.reject(error);
    });

}

export default dataservice