import React from 'react';
import PropTypes from 'prop-types';
import {getText} from '../JSONParser';
import {getHeader} from '../JSONParser';
import BodyModal from './BodyModal';

//Import Male PNG
import Male from '../assets/MaleBody/male_all-01.png';
import MaleAorta from '../assets/MaleBody/male_aorta-01.png';
import MaleBowel from '../assets/MaleBody/male_bowel-01.png';
import MaleEyes from '../assets/MaleBody/male_eyes-01.png';
import MaleHeart from '../assets/MaleBody/male_heart-01.png';
import MaleBone from '../assets/MaleBody/male_bone-01.png';
import MaleLiver from '../assets/MaleBody/male_liver-01.png';
import MaleLungs from '../assets/MaleBody/male_lungs-01.png';
import MalePancreas from '../assets/MaleBody/male_pancreas-01.png';
import MaleStomach from '../assets/MaleBody/male_stomach-01.png';

//Import Female PNG
import Female from '../assets/FemaleBody/female_anatomy.png';
import FemaleAorta from '../assets/FemaleBody/female_aorta-01.png';
import FemaleBowel from '../assets/FemaleBody/female_bowel-01.png';
import FemaleBreast from '../assets/FemaleBody/female_breast-01.png';
import FemaleEyes from '../assets/FemaleBody/female_eyes-01.png';
import FemaleHeart from '../assets/FemaleBody/female_heart-01.png';
import FemaleBone from '../assets/FemaleBody/female_bone-01.png';
import FemaleLiver from '../assets/FemaleBody/female_liver.png';
import FemaleLungs from '../assets/FemaleBody/female_lungs-01.png';
import FemalePancreas from '../assets/FemaleBody/female_pancreas-01.png';
import FemaleStomach from '../assets/FemaleBody/female_stomach-01.png';
import FemaleUterus from '../assets/FemaleBody/female_uterus-01.png';

//Import male/female
import MaleFemale from '../assets/Male-Female/femManV1.png';

//Import icons
import brainIcon from '../assets/Icons/icon_brain.png';
import examIcon from '../assets/Icons/icon_exam.png';
import fallsIcon from '../assets/Icons/icon_falls.png';
import immunizationIcon from '../assets/Icons/icon_immunization.png';
import phyactIcon from '../assets/Icons/icon_physact.png';
import sunExposureIcon from '../assets/Icons/icon_sunexposure.png';

import './Body.css';
import '../App.css';

class Anatomy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      display: {name: "" , body: [{subject: "", text: ""}]}
    };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  /*button correspont to the name of the button being press (all lowercase)
  text is what is display on the screen
  and organ is the id of the organ you want to highlight*/
  organClicked = (button,text,organ) =>{

    if(organ != ""){
      try{
        document.getElementById(organ).style.visibility="visible";
      }catch(err){}
    }
    this.setState({
      organSelected: text
    });

    setTimeout(function() {
      if(organ != ""){
        try{
          document.getElementById(organ).style.visibility="hidden";
        }catch(err){}
      }
      this.setState({
        isOpen: !this.state.isOpen,
        display: this.props.getDisplay(button),
        buttonText: "close",
        displayConfigOption: false
      });
    }.bind(this), 1000);

  }

  iconClicked = (button,text) =>{

    this.setState({
      organSelected: text
    });

    setTimeout(function() {
      this.setState({
        isOpen: !this.state.isOpen,
        display: this.props.getDisplay(button),
        buttonText: "close",
        displayConfigOption: false
      });
    }.bind(this), 1000);

  }
  //not used anymore, caused the "double click" problem on phone
  mouseOverOrgans = (button,text) => {
      document.getElementById(button).style.visibility="visible";
      this.setState({
        organSelected: text
      });

  }
  //not used anymore, caused the "double click" problem on phone
  mouseOutOrgans = (organ) => {
    document.getElementById(organ).style.visibility="hidden";
    this.setState({
      organSelected: null
    });
  }

  render() {

    const fixedStyle = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      zIndex: 3
    };

    if(this.props.gender === "male"){
      return (
        <div>
            <div className="mainRunner">
              {/*male body*/}
              <img className="body" src={Male} alt="Male"/>
              {/*male organ*/}
              <img id="MaleAorta" className="organ" src={MaleAorta} alt="MaleAorta" />
              <img id="MaleBowel" className="organ" src={MaleBowel} alt="MaleBowel" />
              <img id="MaleEyes" className="organ" src={MaleEyes} alt="MaleEyes" />
              <img id="MaleHeart" className="organ" src={MaleHeart} alt="MaleHeart" />
              <img id="MaleBone" className="organ" src={MaleBone} alt="MaleBone" />
              <img id="MaleLiver" className="organ" src={MaleLiver} alt="MaleLiver"/>
              <img id="MaleLungs" className="organ" src={MaleLungs} alt="MaleLungs" />
              <img id="MalePancreas" className="organ" src={MalePancreas} alt="MalePancreas" />
              <img  id="MaleStomach" className="organ" src={MaleStomach} alt="MaleStomach" />

              {/*<button id="bowelButton" className="bowel" onClick={(button,text) => this.organClicked("colon","Bowel")} onMouseOver={(organ) => this.mouseOverOrgans("MaleBowel")} onMouseOut={(organ) => this.mouseOutOrgans("MaleBowel")} />
              <button id="eyesButton" className="eyes" onClick={(button,text) => this.organClicked("eye","Eyes")} onMouseOver={(organ) => this.mouseOverOrgans("MaleEyes")} onMouseOut={(organ) => this.mouseOutOrgans("MaleEyes")}/>
              <button id="kneeButton" className="knee" onClick={(button,text) => this.organClicked("Bone","Knee")} onMouseOver={(organ) => this.mouseOverOrgans("MaleKnee")} onMouseOut={(organ) => this.mouseOutOrgans("MaleKnee")}/>
              <button id="liverButton" className="liver" onClick={(button,text) => this.organClicked("Liver","Liver")} onMouseOver={(organ) => this.mouseOverOrgans("MaleLiver")} onMouseOut={(organ) => this.mouseOutOrgans("MaleLiver")}/>
              <button id="lungsButton" className="lungs" onClick={(button,text) => this.organClicked("lung","Lungs")} onMouseOver={(organ) => this.mouseOverOrgans("MaleLungs")} onMouseOut={(organ) => this.mouseOutOrgans("MaleLungs")}/>
              <button id="pancreasButton" className="pancreas" onClick={(button,text) => this.organClicked("pancreas","Pancreas")} onMouseOver={(organ) => this.mouseOverOrgans("MalePancreas")} onMouseOut={(organ) => this.mouseOutOrgans("MalePancreas")} />
              <button id="stomachButton" className="stomach" onClick={(button,text) => this.organClicked("stomach","Stomach")} onMouseOver={(organ) => this.mouseOverOrgans("MaleStomach")} onMouseOut={(organ) => this.mouseOutOrgans("MaleStomach")}/>
              <button id="aortaButton" className="aorta" onClick={(button,text) => this.organClicked("aorta","Aorta")} onMouseOver={(organ) => this.mouseOverOrgans("MaleAorta")} onMouseOut={(organ) => this.mouseOutOrgans("MaleAorta")}></button>
              <button id="heartButton" className="heart" onClick={(button,text) => this.organClicked("heart","Heart")} onMouseOver={(organ) => this.mouseOverOrgans("MaleHeart")} onMouseOut={(organ) => this.mouseOutOrgans("MaleHeart")}/>*/}
              {/*male button*/}
              <button id="bowelButton" className="bowel" onClick={(button,text,organ) => this.organClicked("colon","Bowel","MaleBowel")}/>
              <button id="eyesButton" className="eyes" onClick={(button,text,organ) => this.organClicked("eye","Eyes","MaleEyes")}/>
              <button id="boneButton" className="bone" onClick={(button,text,organ) => this.organClicked("bone","Bone","MaleBone")}/>
              <button id="liverButton" className="liver" onClick={(button,text,organ) => this.organClicked("liver","Liver","MaleLiver")}/>
              <button id="lungsButton" className="lungs" onClick={(button,text,organ) => this.organClicked("lung","Lungs","MaleLungs")}/>
              <button id="pancreasButton" className="pancreas" onClick={(button,text,organ) => this.organClicked("pancreas","Pancreas","MalePancreas")}/>
              <button id="stomachButton" className="stomach" onClick={(button,text,organ) => this.organClicked("stomach","Stomach","MaleStomach")}/>
              <button id="aortaButton" className="aorta" onClick={(button,text,organ) => this.organClicked("aorta","Aorta","MaleAorta")}></button>
              <button id="heartButton" className="heart" onClick={(button,text,organ) => this.organClicked("heart","Heart","MaleHeart")}/>
              <button id="genitaliaButton" className="maleGenitalia" onClick={(button,text,organ) => this.organClicked("genitalia","Genitalia","")}/>
              <div className = "icons">
                <button id="brainButton" className="brain" onClick={(button,text,organ) => this.iconClicked("brain","Memory Problems")}><img src={brainIcon} alt="brainIcon"/></button>
                <button id="examButton" className="exam" onClick={(button,text,organ) => this.iconClicked("stethoscope","Physical Exam")}><img src={examIcon} alt="examIcon"/></button>
                <button id="fallsButton" className="falls" onClick={(button,text,organ) => this.iconClicked("hip", "Falls")}><img src={fallsIcon} alt="fallsIcon"/></button>
                <button id="immunizationButton" className="immunization" onClick={(button,text,organ) => this.iconClicked("needle in arm", "Immunization")}><img src={immunizationIcon} alt="immunizationIcon"/></button>
                <button id="sunExposureButton" className="sunExposure" onClick={(button,text,organ) => this.iconClicked("sun", "Sun Exposure")}><img src={sunExposureIcon} alt="sunExposureIcon"/></button>
                <button id="phyActivityButton" className="phyActivity" onClick={(button,text,organ) => this.iconClicked("figure outside body walking", "physical Activity")}><img src={phyactIcon} alt="physicalActivityIcon"/></button>
              </div>
            </div>
            <h1 style={fixedStyle}>{this.state.organSelected}</h1>

            <div>
              <BodyModal show={this.state.isOpen}
                onClose={this.toggleModal}
                display = {this.state.display}
                button={this.state.buttonText}
                displayConfig={this.state.displayConfigOption}
                getTopic={this.props.getDisplay}>
              </BodyModal>
            </div>

          </div>
        );
    }
    else if(this.props.gender === "female"){
      return (
        <div>
          <div className="mainRunner">
            <img className="body" src={Female} alt="Female"/>
            <img id="FemaleAorta" className="organ" src={FemaleAorta} alt="FemaleAorta" />
            <img id="FemaleBowel" className="organ" src={FemaleBowel} alt="FemaleBowel"  />
            <img id="FemaleBreast" className="organ" src={FemaleBreast} alt="FemaleBreast" />
            <img id="FemaleEyes" className="organ" src={FemaleEyes} alt="FemaleEyes" />
            <img id="FemaleHeart" className="organ" src={FemaleHeart} alt="FemaleHeart"  />
            <img id="FemaleBone" className="organ" src={FemaleBone} alt="FemaleBone"  />
            <img id="FemaleLiver" className="organ" src={FemaleLiver} alt="FemaleLiver"/>
            <img id="FemaleLungs" className="organ" src={FemaleLungs} alt="FemaleLungs" />
            <img id="FemalePancreas" className="organ" src={FemalePancreas} alt="FemalePancreas"  />
            <img id="FemaleStomach" className="organ" src={FemaleStomach} alt="FemaleStomach"  />
            <img id="FemaleUterus" className="organ" src={FemaleUterus} alt="FemaleUterus"/>

            {/*<button className="bowel" onClick={(button,text) => this.organClicked("colon","Bowel")} onMouseOver={(organ,organText) => this.mouseOverOrgans("FemaleBowel")} onMouseOut={(organ) => this.mouseOutOrgans("FemaleBowel")}/>
            <button className="eyes" onClick={(button,text) => this.organClicked("eye","Eyes")} onMouseOver={(organ,organText) => this.mouseOverOrgans("FemaleEyes")} onMouseOut={(organ) => this.mouseOutOrgans("FemaleEyes")}/>
            <button className="knee" onClick={(button,text) => this.organClicked("Bone","Knee")} onMouseOver={(organ,organText) => this.mouseOverOrgans("FemaleKnee")} onMouseOut={(organ) => this.mouseOutOrgans("FemaleKnee")}/>
            <button className="liver" onClick={(button,text) => this.organClicked("Liver","Liver")} onMouseOver={(organ,organText) => this.mouseOverOrgans("FemaleLiver")} onMouseOut={(organ) => this.mouseOutOrgans("FemaleLiver")}/>
            <button className="lungs" onClick={(button,text) => this.organClicked("lung","Lungs")} onMouseOver={(organ,organText) => this.mouseOverOrgans("FemaleLungs")} onMouseOut={(organ) => this.mouseOutOrgans("FemaleLungs")}/>
            <button className="pancreas" onClick={(button,text) => this.organClicked("pancreas","Pancreas")} onMouseOver={(organ,organText) => this.mouseOverOrgans("FemalePancreas")} onMouseOut={(organ) => this.mouseOutOrgans("FemalePancreas")}/>
            <button className="stomach" onClick={(button,text) => this.organClicked("stomach","Stomach")} onMouseOver={(organ,organText) => this.mouseOverOrgans("FemaleStomach")} onMouseOut={(organ) => this.mouseOutOrgans("FemaleStomach")}/>
            <button className="breast" onClick={(button,text) => this.organClicked("breast","Breast")} onMouseOver={(organ,organText) => this.mouseOverOrgans("FemaleBreast")} onMouseOut={(organ) => this.mouseOutOrgans("FemaleBreast")}/>
            <button className="aorta" onClick={(button,text) => this.organClicked("aorta","Aorta")} onMouseOver={(organ,organText) => this.mouseOverOrgans("FemaleAorta")} onMouseOut={(organ) => this.mouseOutOrgans("FemaleAorta")}></button>
            <button className="heart" onClick={(button,text) => this.organClicked("heart","Heart")} onMouseOver={(organ,organText) => this.mouseOverOrgans("FemaleHeart")} onMouseOut={(organ) => this.mouseOutOrgans("FemaleHeart")}/>
            <button className="uterus" onClick={(button,text) => this.organClicked("genital area\neg female put on uterus\neg male put on area where genitals would be","Uterus")} onMouseOver={(organ) => this.mouseOverOrgans("FemaleUterus")} onMouseOut={(organ) => this.mouseOutOrgans("FemaleUterus")}/>*/}
            <button className="bowel" onClick={(button,text,organ) => this.organClicked("colon","Bowel","FemaleBowel")}/>
            <button className="eyes" onClick={(button,text,organ) => this.organClicked("eye","Eyes","FemaleEyes")}/>
            <button className="bone" onClick={(button,text,organ) => this.organClicked("bone","Bone","FemaleBone")}/>
            <button className="liver" onClick={(button,text,organ) => this.organClicked("liver","Liver","FemaleLiver")}/>
            <button className="lungs" onClick={(button,text,organ) => this.organClicked("lung","Lungs","FemaleLungs")}/>
            <button className="pancreas" onClick={(button,text,organ) => this.organClicked("pancreas","Pancreas","FemalePancreas")}/>
            <button className="stomach" onClick={(button,text,organ) => this.organClicked("stomach","Stomach","FemaleStomach")}/>
            <button className="breast" onClick={(button,text,organ) => this.organClicked("breast","Breast","FemaleBreast")}/>
            <button className="aorta" onClick={(button,text,organ) => this.organClicked("aorta","Aorta","FemaleAorta")}></button>
            <button className="heart" onClick={(button,text,organ) => this.organClicked("heart","Heart","FemaleHeart")}/>
            <button className="uterus" onClick={(button,text,organ) => this.organClicked("uterus","Uterus","FemaleUterus")}/>
            <button className="ovary" onClick={(button,text,organ) => this.organClicked("ovary","Ovary","")}/>
            <button id="genitaliaButton" className="femaleGenitalia" onClick={(button,text,organ) => this.organClicked("genitalia","Genitalia","")}/>
            <div className = "icons">
              <button className="brain" onClick={(button,text) => this.iconClicked("brain","Memory Problems")}><img src={brainIcon} alt="brainIcon"/></button>
              <button className="exam" onClick={(button,text) => this.iconClicked("stethoscope","Physical Exams")}><img src={examIcon} alt="examIcon"/></button>
              <button className="falls" onClick={(button,text) => this.iconClicked("hip", "Falls")}><img src={fallsIcon} alt="fallsIcon"/></button>
              <button className="immunization" onClick={(button,text) => this.iconClicked("needle in arm", "Immunization")}><img src={immunizationIcon} alt="immunizationIcon"/></button>
              <button className="sunExposure" onClick={(button,text) => this.iconClicked("sun", "Sun Exposure")}><img src={sunExposureIcon} alt="sunExposureIcon"/></button>
              <button className="phyActivity" onClick={(button,text) => this.iconClicked("figure outside body walking", "physical Activity")}><img src={phyactIcon} alt="physicalActivityIcon"/></button>
            </div>
          </div>
          <h1 style={fixedStyle}>{this.state.organSelected}</h1>

          <BodyModal show={this.state.isOpen}
            onClose={this.toggleModal}
            display = {this.state.display}
            button={this.state.buttonText}
            displayConfig={this.state.displayConfigOption}
            getTopic={this.props.getDisplay}>
          </BodyModal>

        </div>
      );
    }
    else if (this.props.gender === "all genders") {
      return(
        <div>
          <div className="mainRunner">
            <img className="body" src={MaleFemale} alt="allGenders"/>
            <img id="Aorta" className="organ" src={FemaleAorta} alt="Aorta" />
            <img id="Bowel" className="organ" src={FemaleBowel} alt="Bowel" />
            <img id="Breast" className="organ" src={FemaleBreast} alt="Breast" />
            <img id="Eyes" className="organ" src={FemaleEyes} alt="Eyes" />
            <img id="Heart" className="organ" src={FemaleHeart} alt="Heart" />
            <img id="Bone" className="organ" src={FemaleBone} alt="Bone" />
            <img id="Liver" className="organ" src={FemaleLiver} alt="Liver"/>
            <img id="Lungs" className="organ" src={FemaleLungs} alt="Lungs" />
            <img id="Pancreas" className="organ" src={FemalePancreas} alt="Pancreas" />
            <img  id="Stomach" className="organ" src={FemaleStomach} alt="Stomach" />
            <img id="Uterus" className="organ" src={FemaleUterus} alt="Uterus"/>

            <button id="bowelButton" className="bowel" onClick={(button,text,organ) => this.organClicked("colon","Bowel","Bowel")}/>
            <button id="eyesButton" className="eyes" onClick={(button,text,organ) => this.organClicked("eye","Eyes","Eyes")}/>
            <button id="boneButton" className="bone" onClick={(button,text,organ) => this.organClicked("bone","Bone","Bone")}/>
            <button id="liverButton" className="liver" onClick={(button,text,organ) => this.organClicked("Liver","Liver","Liver")}/>
            <button id="lungsButton" className="lungs" onClick={(button,text,organ) => this.organClicked("lung","Lungs","Lungs")}/>
            <button id="pancreasButton" className="pancreas" onClick={(button,text,organ) => this.organClicked("pancreas","Pancreas","Pancreas")}/>
            <button id="stomachButton" className="stomach" onClick={(button,text,organ) => this.organClicked("stomach","Stomach","Stomach")}/>
            <button className="breast" onClick={(button,text,organ) => this.organClicked("breast","Breast","Breast")}/>
            <button id="aortaButton" className="aorta" onClick={(button,text,organ) => this.organClicked("aorta","Aorta","Aorta")}></button>
            <button id="heartButton" className="heart" onClick={(button,text,oran) => this.organClicked("heart","Heart","Heart")}/>
            <button className="uterus" onClick={(button,text,organ) => this.organClicked("genital area\neg female put on uterus\neg male put on area where genitals would be","Uterus","Uterus")}/>
            <button className="femaleGenitalia" onClick={(button,text,organ) => this.organClicked("genitalia","Genitalia","")}/>
            <div className = "icons">
              <button id="brainButton" className="brain" onClick={(button,text) => this.iconClicked("brain","Memory Problems")}><img src={brainIcon} alt="brainIcon"/></button>
              <button id="examButton" className="exam" onClick={(button,text) => this.iconClicked("stethoscope","Physical Exams")}><img src={examIcon} alt="examIcon"/></button>
              <button id="fallsButton" className="falls" onClick={(button,text) => this.iconClicked("hip", "Falls")}><img src={fallsIcon} alt="fallsIcon"/></button>
              <button id="immunizationButton" className="immunization" onClick={(button,text) => this.iconClicked("needle in arm", "Immunization")}><img src={immunizationIcon} alt="immunizationIcon"/></button>
              <button id="sunExposureButton" className="sunExposure" onClick={(button,text) => this.iconClicked("sun", "Sun Exposure")}><img src={sunExposureIcon} alt="sunExposureIcon"/></button>
              <button id="phyActivityButton" className="phyActivity" onClick={(button,text) => this.iconClicked("figure outside body walking", "physical Activity")}><img src={phyactIcon} alt="physicalActivityIcon"/></button>
            </div>
          </div>
          <h1 style={fixedStyle}>{this.state.organSelected}</h1>

          <div>
            <BodyModal show={this.state.isOpen}
              onClose={this.toggleModal}
              display = {this.state.display}
              button={this.state.buttonText}
              getTopic={this.props.getDisplay}>
            </BodyModal>
          </div>

        </div>
      );
    }
    else{
      return(
          <div>
            <div className="mainRunner">
              <img className="body" src={MaleFemale} alt="MaleFemale"/>;
            </div>
          </div>
      );
    }
  }
}

Anatomy.propTypes = {
  gender: PropTypes.string,
  getDisplay: PropTypes.func.isRequired,
};


export default Anatomy;
