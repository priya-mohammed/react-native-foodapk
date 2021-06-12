import Frisbee from "frisbee";
import {AsyncStorage,Platform} from "react-native";
import {BASE_URL,LOGIN_URL,NOTIFY_URL} from "../service/config";
import Master from "../service/master";


const Api = {
    api:  () => {
        let api = new Frisbee({
            baseURI: BASE_URL, 
            headers: {
                'Accept': 'application/text',
                'Content-Type': 'application/text'
            }
        });

        api.interceptor.register({
            response : (response) => {
                let text = response.body;
                if (Platform.OS === 'android') {
                   
                }
                return text;
            },
            request: function (path, options) {
                return [path, options];
            },
        });

        return api;
    },

    get : async function(url) {

    let token = await  AsyncStorage.getItem('tokenkey');
    if(token == null || token =='' || token =='0' || token ==undefined) {
        let customerName = await  AsyncStorage.getItem('customerName');
        let mobileno = await  AsyncStorage.getItem('mobileno');
        let customerId = await  AsyncStorage.getItem('customerId');

        let object = {"Username":"guest_user","Password":"admin@123","Applntype":1, 
        "customerName" : customerName, "mobileno" : mobileno, "customerId" : customerId };
        
        return fetch(LOGIN_URL+"validlogin", {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(result => {
            let responseType = result["inventoryResponse"]["responseType"];
            let responseValue = result["inventoryResponse"]["responseObj"];
            if (responseType == "S") {

                let tokenkey = responseValue["tokenkey"];    
                AsyncStorage.setItem("tokenkey",tokenkey + '');

            return fetch(BASE_URL+url, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'tokenkey': tokenkey
                }
              })
                .then(response => response.json())
                .then(data => {
                     return data;
                })
                .catch(err => {
                    console.log(err);
                  });
                }
        });
    }
    else{
    return fetch(BASE_URL+url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'tokenkey': token
      }
    })
      .then(response => response.json())
      .then(data => {
           return data;
      })
      .catch(err => {
          console.log(err);
        });
    }
    } ,

    post : async function(url, param) {
        return fetch(BASE_URL+url, {
            method: 'POST',
            body: JSON.stringify(param),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(err => {return err});
    },
    

    postwithtoken : async function(url,param ) { 
       
    
        let token = await  AsyncStorage.getItem('tokenkey');
        if(token == null || token =='' || token =='0' || token ==undefined) {
            let customerName = await  AsyncStorage.getItem('customerName');
            let mobileno = await  AsyncStorage.getItem('mobileno');
            let customerId = await  AsyncStorage.getItem('customerId');
    
            let object = {"Username":"guest_user","Password":"admin@123","Applntype":1, 
            "customerName" : customerName, "mobileno" : mobileno, "customerId" : customerId };
           
            return fetch(LOGIN_URL+"validlogin", {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                })
                .then(response => response.json())
                .then(result => {
                let responseType = result["inventoryResponse"]["responseType"];
                let responseValue = result["inventoryResponse"]["responseObj"];
                if (responseType == "S") {
    
                    let tokenkey = responseValue["tokenkey"];    
                    AsyncStorage.setItem("tokenkey",tokenkey + '');
                    return fetch(BASE_URL+url, {
                        method: 'POST',
                        body: JSON.stringify(param),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'tokenkey': tokenkey
                        }
                        })
                        .then(response => response.json())
                        .then(data => {
                            return data;
                        })
                        .catch(err => {return err});
                }
            })
        }else{
            return fetch(BASE_URL+url, {
                method: 'POST',
                body: JSON.stringify(param),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'tokenkey': token
                }
                })
                .then(response => response.json())
                .then(data => {
                    return data;
                })
                .catch(err => {return err});
        }

        
    },


    postwithNotifytoken : async function(url,param ) { 

        let token = await  AsyncStorage.getItem('tokenkey');
// alert(token)
        if(token == null || token =='' || token =='0' || token ==undefined) {
            
            let customerName = await  AsyncStorage.getItem('customerName');
            let mobileno = await  AsyncStorage.getItem('mobileno');
            let customerId = await  AsyncStorage.getItem('customerId');
    
            let object = {"Username":"guest_user","Password":"admin@123","Applntype":1, 
            "customerName" : customerName, "mobileno" : mobileno, "customerId" : customerId };
            
            return fetch(LOGIN_URL+"validlogin", {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                })
                .then(response => response.json())
                .then(result => {
                let responseType = result["inventoryResponse"]["responseType"];
                let responseValue = result["inventoryResponse"]["responseObj"];
                if (responseType == "S") {
    
                    let tokenkey = responseValue["tokenkey"];    
                    AsyncStorage.setItem("tokenkey",tokenkey + '');
                    return fetch(NOTIFY_URL+url, {
                        method: 'POST',
                        body: JSON.stringify(param),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'tokenkey': tokenkey
                        }
                        })
                        .then(response => response.json())
                        .then(data => {
                            return data;
                        })
                        .catch(err => {return err});
                }
            })
        }else{
            return fetch(NOTIFY_URL+url, {
                method: 'POST',
                body: JSON.stringify(param),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                });
                // .then(response => response.json())
                // .then(data => {
                //     alert("param "+JSON.stringify(param))
                 
                //     let responseType = Master.getResponseType(data);
                //     let responseValue = Master.getResponseValue(data); 
                //     console.log("responseValue is -------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+data)
                //     console.log("responseValue is "+responseValue)
                //  //   return false;
                //     return data;
                // })
                // .catch(err => {return err});
        }

        
    },



    gettokenkey : async function() { 

        let customerName = await  AsyncStorage.getItem('customerName');
        let mobileno = await  AsyncStorage.getItem('mobileno');
        let customerId = await  AsyncStorage.getItem('customerId');

        let object = {"Username":"guest_user","Password":"admin@123","Applntype":1, 
        "customerName" : customerName, "mobileno" : mobileno, "customerId" : customerId };
        
        return fetch(LOGIN_URL+"validlogin", {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(data => {
            console.warn(data["inventoryResponse"]["responseType"])
            let responseType = data["inventoryResponse"]["responseType"];
            let responseValue = data["inventoryResponse"]["responseObj"];
            if (responseType == "S") {
                let tokenkey = responseValue["tokenkey"];    
                AsyncStorage.setItem("tokenkey",tokenkey + '');
                return responseType;
            }
            })
            .catch(err => {return err});
    },


   
};


export  default Api;