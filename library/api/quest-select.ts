// import { ObjectId } from "mongodb";
// import { Schema, model, connect } from "mongoose";

// import { Quest } from "cello-core/core";
import { ApiHandler, ApiRequest, ApiResponse } from "../types";

export interface QuestSummaryRequest{
}
export interface QuestSummaryResponse{
  quest:{title:string, experience: number, genre: string, clear: boolean}
}

export type QuestApiRequest = ApiRequest<QuestApiRequest>;
export type QuestApiResponse = ApiRequest<QuestApiResponse>;
export type QuestApi = ApiHandler<QuestSummaryResponse, QuestSummaryRequest>;
  
// export const find = async (idNum:number) => {

//   var idVal:any = new ObjectId();

//   switch (idNum) {
//     case 1:
//       console.log("switch in: " + 1);
      
//       idVal = "62b163806170680900494579";
//       break;
  
//     case 2:
//       console.log("switch in: " + 2);
      
//       idVal = "62b17f6c43fe45abe507b3b8";
//       break;
  
//     case 3:
//       console.log("switch in: " + 3);
      
//       idVal = "62c647bf490e690c4415913b";
//       break;
  
//     case 4:
//       console.log("switch in: " + 4);
      
//       idVal = "62c7fad614c8820df8f1c86d";
//       break;
//   }    
// };  

// export function getBindingData(
//   bindingData: {
//     [key: string]: unknown
//   },
//   key: string
// ): number {
//   const value = bindingData[key]
//   return typeof value === 'number' ? value : 0
// }