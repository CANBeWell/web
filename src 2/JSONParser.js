//import Topics from './JSONFolder/Topics.json';
import {getUserInfo} from './UserInfo';
import Topics from './JSONFolder/topicnew2.json';

var getTopic = function(organ){
    var topic = organ;
    if(organ == "aorta"){return ("abdominal_aortic_aneurysm_screen");}
    else if(organ == "bowel"){return ("colorectal_cancer");}
    else if(organ == "breast"){return ("breast_cancer");}
    else if(organ == "eyes"){return ("vision");}
    else if(organ == "heart"){return ("heart_disease");}
    else if(organ == "knee"){return ("vitamins_minerals");} //TODO bone health
    else if(organ == "liver"){return ("substance_abuse");}
    else if(organ == "lungs"){return ("lung");}
    else if(organ == "pancreas"){return ("diabetes_type2");}
    else if(organ == "stomach"){return ("diet_nutrition");}
    else if(organ == "uterus"){return ("sexual_activity");}
    else{return (topic);} //TODO return also family planning and cervical cancer use has syntax to differensiate string from strings array
}


var getText = function(button) {


  //var topic = getTopic(organ)
  var UserInfo = getUserInfo();
  var age = UserInfo.age;
  var jsonGender;


  let text = "";
  try{
    if(UserInfo.patient_provider !== null && UserInfo.gender !== null){
      for(var i = 0; i < Topics[button]["subjectArray"].length; i++){
        if(Topics[button]['subjectArray'][i] instanceof Array){
          for(var j = 0; j < Topics[button]["subjectArray"][i].length; j++){
            if((Topics[button]['subjectArray'][i][j]['minAge'] <= age && age <= Topics[button]['subjectArray'][i][j]['maxAge']) || (age == "all ages")) {
              jsonGender = handleGenderString(Topics[button]['subjectArray'][i][j]['gender']);
              if((UserInfo.gender == "male" && jsonGender.male) || (UserInfo.gender == "female" && jsonGender.female) (jsonGender.allGenders)){
                text += Topics[button]['subjectArray'][i]['subject'] + "<br/>";
                text += Topics[button]['subjectArray'][i][UserInfo.patient_provider] + "<br/><br/>";
              }
            }
          }
        }else if((Topics[button]['subjectArray'][i]['minAge'] <= age && age <= Topics[button]['subjectArray'][i]['maxAge']) || (age == "all ages")){
          jsonGender = handleGenderString(Topics[button]['subjectArray'][i]['gender']);
          if((UserInfo.gender == "male" && jsonGender.male) || (UserInfo.gender == "female" && jsonGender.female) || (jsonGender.allGenders)){
            text += Topics[button]['subjectArray'][i]['subject'] + "<br/>";
            text += Topics[button]['subjectArray'][i][UserInfo.patient_provider] + "<br/><br/>";
          }
        }
      }
    }
  }
  catch(err) {

  }

  return(text);
}

var getHeader = function(button) {
    //var topic = getTopic(organ)
    try{
      return(Topics[button]['heading']);
    }
    catch(err) {
      return("This Topics is Not Yet Defined");
    }

}

var handleGenderString = function(genderString) {

  /*var genderCharArray= genderString.split('[[');
  genderCharArray= genderString.split(']]');

  return [genderCharArray[0],]*/


  var genderCharArray = genderString.split(';');
  var genderObj = {
    female: genderCharArray.includes("f"),
    male: genderCharArray.includes("m"),
    transMale: genderCharArray.includes("fm"),
    transFemale: genderCharArray.includes("mf"),
    allGenders: genderCharArray.includes("all")
  };
  return genderObj;
}

var getListOfTopics = function(){
  var UserInfo = getUserInfo();
  //var age = Number(UserInfo.age)
  var buttonArray = ["abdominal_aortic_aneurysm_screen",
    "colorectal_cancer",
    "breast_cancer",
    "vision",
    "heart_disease",
    "vitamins_minerals",
    "liver",
    "lung",
    "diabetes_type2",
    "diet_nutrition",
    "sexual_activity",
    "lower left face"
  ];
  let list = "";
  let styleString = "\"background-color: rgb(64, 224, 208) ;border-radius: 10px;width: 99%; min-height: 50px;margin: 0px auto; text-align: left;padding: 10px;\"";

  /*for(var i = 0; i < topicsArray.length; i++){
      list += "<div className=\"backdrop\" style=\"padding: 5px;\"><div style=";
      list += styleString;
      list += "><details><summary>";
      list += getHeader(topicsArray[i]);
      list += "</summary><p>";
      list += getText(topicsArray[i]);
      list += "</p></details></div></div>";
  }*/

    if(UserInfo.patient_provider !== null && UserInfo.gender !== null){

        for(var i = 0; i < buttonArray.length; i++){
          try{
            //TODO check if every element of array
            //if(Topics[buttonArray[i]]['subjectArray'][0]['minAge'] <= age && age <= Topics[buttonArray[i]]['subjectArray'][0]['maxAge']){
              //if((UserInfo.gender == "male" && Topics[topicsArray[i]]['subjects'][0]['gender']['male']) || (UserInfo.gender == "female" && Topics[topicsArray[i]]['subjects'][0]['gender']['female'])){
                list += "<div className=\"backdrop\" style=\"padding: 5px;\"><div style=";
                list += styleString;
                list += "><details><summary>";
                list += getHeader(buttonArray[i]);
                list += "</summary><p>";
                list += getText(buttonArray[i]);
                list += "</p></details></div></div>";
            //}
          //}
        }
        catch(err) {}
      }


    }

  return(list);

}

/*<div className="backdrop" style={backdroplistItemStyle}>
  <div style={firstListItemStyle}>
  <details>
    <summary onClick={(list_element) => this.handleClick(1)}>Sample text</summary><p></p>
  </details>
  </div>
</div>*/

export {getText};
export {getHeader};
export {getListOfTopics};
