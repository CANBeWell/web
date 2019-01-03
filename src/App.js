import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import './Button.css';
import MyModal from './MyModal';
import Data from './Data.js';
import InstructionModal from './InstructionModal.js';
import MyBody from './Body/Body.js';
import Tests from './Tests/Tests.js';
import Topics from './Topics/Topics.js';
import IconGender from './listicon.png';
import DisclaimerText from './Disclaimer.json';
import {getUserInfo} from './UserInfo';
//import firebase from 'firebase/app';
import * as firebase from 'firebase';
import Lang from './Lang/Lang.json';


class App extends Component {


  constructor(props) {
    super(props);
    var userInfo = getUserInfo();
    let DataToDisplay = new Data();

    this.state = {
      instructionIsOpen: true,
      isOpen: false,
      bodyView: true,
      topicsView: false,
      testsView: false,
      //allowToClose: false,
      topics: 20,
      lang: (typeof userInfo.language == "string") ? Lang[userInfo.language] : Lang.english,
      data: DataToDisplay
    };

  }

  componentDidMount(){

    document.getElementById("body").classList = 'active';

    /*var userInfo = getUserInfo();
    if(typeof userInfo.language == "string"){
      //try {
        this.setState({lang: Lang[userInfo.language]});
        //} //Call back once setState is done
      //}catch(err){}
    }*/

    /*this.setState({
      lang: Lang.english
    }, () => {
      var userInfo = getUserInfo();
      if(typeof userInfo.language == "string"){
        try {
          this.setState({lang: Lang[userInfo.language]});
        //} //Call back once setState is done
      }catch(err){}
    }});*/


    //TODO include ref to the database
    /*const rootRef = firebase.database().ref().child('liver');
    const topicsRef = rootRef.child('heading');
    topicsRef.on('value', snap => {
      this.setState({
        topics: snap.val()
      })
    });*/

  }

  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0px";
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleIntrutionModal = () => {
    //if(this.state.allowToClose){
      this.setState({
        instructionIsOpen: !this.state.instructionIsOpen
      });
    //}
  }

  /*togglePermission = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        allowToClose: !this.state.allowToClose
      });
  }*/

  selectLanguage = (userLang) => {
    //setState() is an async function
    this.setState({
      lang: Lang[userLang]
    });
  }

  bodyClicked = (e) => {
    //e.preventDefault();
    this.setState({
      bodyView: true,
      topicsView: false,
      testsView: false
    });

    document.getElementById("body").classList = 'active';
    document.getElementById("topic").classList = '';
    document.getElementById("test").classList = '';

  }
  topicsClicked = (e) => {
    //e.preventDefault();
    this.setState({
      bodyView: false,
      topicsView: true,
      testsView: false
    });

    document.getElementById("body").classList = '';
    document.getElementById("topic").classList = 'active' ;
    document.getElementById("test").classList = '';
  }
  testsClicked = (e) => {
    //e.preventDefault();
    this.setState({
      bodyView: false,
      topicsView: false,
      testsView: true
    });

    document.getElementById("body").classList = '';
    document.getElementById("topic").classList = '';
    document.getElementById("test").classList = 'active';
  }

  genderIconClicked = () => {
        this.setState({
          isOpen: !this.state.isOpen,
          headerText: this.state.lang.configuration_header,
          bodyText: null,
          buttonText: this.state.lang.instruction_modal_button,
          displayConfigOption: true
        });
        //Remove bouncing animation once clicked
        if ( document.getElementById("genderIcon").classList.contains('drop-down') ){
          document.getElementById("genderIcon").classList.remove('drop-down');
        }
  }
  suggestedAppsClicked = () => {
        this.setState({
          isOpen: !this.state.isOpen,
          headerText: "Suggested App",
          bodyText: "Suggested App",
          buttonText: this.state.lang.instruction_modal_button,
          displayConfigOption: false
        });
  }
  calculatorsClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: "Calculators",
      bodyText: "Calculators",
      buttonText: this.state.lang.instruction_modal_button,
      displayConfigOption: false
    });
  }
  disclaimerClicked = () => {
    let userInfo = getUserInfo();

    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.state.lang.side_nav_disclaimer,
      bodyText: userInfo.patient_provider === "patient" ? DisclaimerText.patientDisclaimer : DisclaimerText.providerDisclaimer,
      buttonText: this.state.lang.instruction_modal_button,
      displayConfigOption: false
    });
  }
  aboutClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.state.lang.side_nav_about,
      bodyText: this.state.lang.about,
      buttonText: this.state.lang.instruction_modal_button,
      displayConfigOption: false
    });
  }
  settingsClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: "Settings",
      bodyText: "Settings",
      buttonText: this.state.lang.instruction_modal_button,
      displayConfigOption: false
    });
  }

  render() {

    var userInfo = getUserInfo();
    var DataToDisplay = this.state.data;

    const fixedStyle = {
      position: 'fixed',
      bottom: 0,
      right: 0,
      border:0
    };

    var spanStyle = {
      cursor: 'pointer',
      color: '#808080',
      fontSize: 30
    };

    var langSelectorStyle = {
      position: 'absolute',
      cursor: 'pointer',
      color: '#f2f2f2',
      fontSize: 30,
      top: 0,
      right: 0
    };

    return (
      <div>

        <div>
          {/*This is your sidenav stuff*/}
          <div id="mySidenav" className="sidenav">
            <a className="closebtn" onClick={this.closeNav}>&times;</a>
            <a onClick={this.suggestedAppsClicked}>{this.state.lang.side_nav_suggested_apps}</a>
            <a onClick={this.calculatorsClicked}>{this.state.lang.side_nav_calculators}</a>
            <a onClick={this.disclaimerClicked}>{this.state.lang.side_nav_disclaimer}</a>
            <a onClick={this.aboutClicked}>{this.state.lang.side_nav_about}</a>
            <a onClick={this.settingsClicked}>{this.state.lang.side_nav_settings}</a>
          </div>
          <div className="header" style={spanStyle}>
            <span onClick={this.openNav}> &#9776;</span>
            {/*<span onClick={(userLang) => this.selectLanguage("english")}>En/</span>
            <span onClick={(userLang) => this.selectLanguage("french")}>Fr</span>*/}
          </div>
        </div>

        {/*this is your header tab*/}
        <div className="topnav">
          <a id="body" onClick={this.bodyClicked}>{this.state.lang.top_nav_body}</a>
          <a id="topic" onClick={this.topicsClicked}>{this.state.lang.top_nav_topics}</a>
          <a id="test" onClick={this.testsClicked}>{this.state.lang.top_nav_tests}</a>
        </div>

        {/*display user's info*/}
        <div onClick={this.genderIconClicked} className="userInfoStyle">
          <h1>
            {this.state.lang.i_am_an}: {userInfo.patient_provider}<br/>
            {this.state.lang.gender}: {userInfo.gender}<br/>
            {this.state.lang.age}: {userInfo.age}
          </h1>
        </div>

        <div>
          <MyBody showBody={this.state.bodyView} userConfig={userInfo} getText={this.state.data.getTopic}></MyBody>
          <Tests showTests={this.state.testsView} userConfig={userInfo} data={DataToDisplay.getListOfTests}></Tests>
          <Topics showTopics={this.state.topicsView} userConfig={userInfo} data={DataToDisplay.getListOfTopics}></Topics>
        </div>

        <button style={fixedStyle}>
          <img id="genderIcon" src={IconGender} className="drop-down" alt="IconGender" onClick={this.genderIconClicked} width="75" height="75"/>
        </button>

        <MyModal show={this.state.isOpen}
          onClose={this.toggleModal}
          header={this.state.headerText}
          button={this.state.buttonText}
          lang = {this.state.lang}>
        </MyModal>

        <InstructionModal show={this.state.instructionIsOpen}
          onClose={this.toggleIntrutionModal}
          onSelectLang ={this.selectLanguage}
          lang = {this.state.lang}>
        </InstructionModal>

      </div>

    );
  }
}

export default App;
