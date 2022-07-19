import { Context } from "@azure/functions";
// import { Quest } from "cello-core/core";
// import { ObjectId } from "mongodb";
import { QuestApi } from "../library/api/quest-select";
import { QuestRepository } from "../library/db";

// import { getBindingData } from "../library/quest-select-mongodb";

const httpTrigger: QuestApi = async (
  context: Context
  ) =>{
  const idNum:number = context.bindingData.index;

  var idVal:any = "";

  switch (idNum) {
    case 1:
      console.log("switch in: " + 1);
      
      idVal = "62b163806170680900494579";
      break;
  
    case 2:
      console.log("switch in: " + 2);
      
      idVal = "62b17f6c43fe45abe507b3b8";
      break;
  
    case 3:
      console.log("switch in: " + 3);
      
      idVal = "62c647bf490e690c4415913b";
      break;
  
    case 4:
      console.log("switch in: " + 4);
      
      idVal = "62c7fad614c8820df8f1c86d";
      break;
  }    
  
  console.log("idNum: " + idNum);
  console.log("typeof idNum: " + typeof(idNum));

  const repo = new QuestRepository();
  const Quests = await repo.getQuest(idVal);

  return{
    body: {
      quest:{
        title: Quests.title,  
        experience: Quests.experience,  
        genre: "",
        clear:false,  
      }
    }
  }
};

  // const idNum = context.bindingData;
  // const idNum = getBindingData(bindingData, 'index');
  // const idNum:number = bindingData.index;
  // const idNum = typeof context.bindingData.index === 'number' ? context.bindingData.index : 0;
  
  // try {
  //   // let response = null;

  //   // // Request メソッドに応じて処理を振り分け
  //   //   if (idNum > 4) {     
  //   //     response = {
  //   //       status: "404"
  //   //     };
  //   //   } else{
  //   //     response = {
  //   //       status: "200",
  //   //       documentResponse: await db.find(idNum)
  //   //     };
  //   //     console.log(db.find(idNum));
        
  //   //   }    
    
  //   // context.res = {
  //   //   body: response,
  //   // };

  // } catch (err) {
  //   context.log(`*** Error throw: ${JSON.stringify(err)}`);
    
  //   context.res = {
  //     status: 500,
  //     body: err,
  //   };
  // }

export default httpTrigger;
