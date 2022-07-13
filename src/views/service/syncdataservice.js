import common from '../common/common';
const syncdataservice=(controller,reqbody)=>{
    console.log(common.baseurl);
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqbody)
      };
    
  const url=common.baseurl+controller+".php"    
  return  fetch(url, requestOptions)
          .then(async response => {
              const data = await response.json();
          
              if (!response.ok) {
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }else{
                return data; 
              }
        
          })
          .catch(error => {
            return Promise.reject(error);
          });
    
}
  
export default syncdataservice