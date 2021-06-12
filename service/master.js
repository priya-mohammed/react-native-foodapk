
import {AsyncStorage,Platform} from "react-native";


const Master = {

    getResponseType : function(data) {  
        return data["inventoryResponse"]["responseType"];
    },
    getResponseValue : function(data) {  
        return data["inventoryResponse"]["responseObj"];
    },
    
};


export  default Master;