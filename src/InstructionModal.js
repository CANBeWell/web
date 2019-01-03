import React from 'react';
import PropTypes from 'prop-types';
import {setGender} from './UserInfo';
import {setPatientProvider} from './UserInfo';
import {setAge} from './UserInfo';
import DisclaimerText from './Disclaimer.json';
import './Style/checkbox.css';

class InstructionModal extends React.Component {

  constructor(props) {
    super(props);

    setPatientProvider('patient');
    this.state = {
      selectedPatientProvider: 'patient',
      iAgree: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handlePatientProviderChange = this.handlePatientProviderChange.bind(this);
    this.handleAllAgesSelected = this.handleAllAgesSelected.bind(this);
  }

  handleChange(event){

    this.setState({value: event.target.value});
    setAge(Number(event.target.value));

  }

  goBack(){
    window.location.href='http://quickforms2.eecs.uottawa.ca/canbewell/';
  }

  handlePatientProviderChange(event) {

    if(event.target.value == "patient"){
      document.getElementById("disclaimer").innerHTML = DisclaimerText.patientDisclaimer;
      document.getElementById("genderSelector").style.display = "block";
    }
    else if(event.target.value == "provider"){
      document.getElementById("disclaimer").innerHTML = DisclaimerText.providerDisclaimer;
      document.getElementById("genderSelector").style.display = "none";
    }
    setPatientProvider(event.target.value);

    this.setState({
      selectedPatientProvider: event.target.value,
    });

  }

  handleAllAgesSelected(event){

    this.setState({
      allAgesSelected: !this.state.allAgesSelected
    }, () => {
      this.setState({value: this.state.allAgesSelected ? "all ages" : ""}); //Call back once setState is done
      setAge(this.state.allAgesSelected ? "all ages" : "");
    });
  }

  handleGenderChange(changeEvent) {

    setGender(changeEvent.target.value);
    this.setState({
      selectedGender: changeEvent.target.value
    });

  }

  render() {

    // Render intruction view
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: '10px'
    };

    // The modal "window"
    const myModalStyle = {
      backgroundColor: '#fff',
      maxWidth: '99%',
      minHeight: '95%',
      margin: '0 auto',
      textAlign:'center',
      padding: 10,
      fontSize: '20px',
      overflow: 'scroll',
    };

    const myAboutStyle = {
      maxWidth: '90%',
      textAlign:'center',
      margin: '0 auto',
      //padding: 10,
      background: '#f2f2f2',
      fontSize: '15px'
    };

    // The modal "window"
    const myDisclaimerStyle = {
      maxWidth: '90%',
      maxHeight: '150px',
      margin: '0 auto',
      textAlign:'center',
      padding: 10,
      overflowY: 'scroll',
      overflowX: 'hidden',
      background: '#f2f2f2',
      fontSize: '15px'
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="myModal" style={myModalStyle}>

          <div className="footer">
            <h1>{this.props.lang.instruction_modal_header}</h1>
            <div style={myAboutStyle}>
              <p>{this.props.lang.about}</p>
            </div>
            {/*<span onClick={(userLang) => this.props.onSelectLang("english")}>En/</span>
            <span onClick={(userLang) => this.props.onSelectLang("french")}>Fr</span>*/}
            <p>{this.props.lang.i_am_an}:</p>
            <div>
              <form>
                <div className="radio">
                  <label>
                    <input type="radio" value="patient" checked={this.state.selectedPatientProvider === 'patient'} onChange={this.handlePatientProviderChange} />
                    Patient
                  </label>

                  <label>
                    <input type="radio" value="provider" checked={this.state.selectedPatientProvider === 'provider'} onChange={this.handlePatientProviderChange} />
                    Provider
                  </label>
                </div>
              </form>
            </div>
            <div>
              <form>
                <div id="genderSelector"className="radio">
                  <label>
                    <input type="radio" value="male" checked={this.state.selectedGender == 'male'} onChange={this.handleGenderChange}/>{this.props.lang.male}
                  </label>

                  <label>
                    <input type="radio" value="female" checked={this.state.selectedGender == 'female'} onChange={this.handleGenderChange} />
                    {this.props.lang.female}
                  </label>

                  <label>
                    <input type="radio" value="all genders" checked={this.state.selectedGender == 'all genders'} onChange={this.handleGenderChange}/>{this.props.lang.other}
                  </label>
                </div>
              </form>
            </div>

            <b>{this.props.lang.disclaimer_header}</b>
            <div style={myDisclaimerStyle}>
              <p id="disclaimer">{DisclaimerText.patientDisclaimer}</p>
            </div>

            {/*<form>
              <label className="container">
                <input
                  type="checkbox"
                  onChange={this.props.giveThePermissionToClose} />
                  I Agree
              </label>
            </form>*/}

            <div>
              <button onClick={this.props.onClose}>{this.props.lang.i_agree}</button>
              <button onClick={this.goBack} type="button">{this.props.lang.go_back}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InstructionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  //permision: PropTypes.bool,
  //giveThePermissionToClose: PropTypes.func.isRequired,
  onSelectLang: PropTypes.func.isRequired,
  lang: PropTypes.object
};

export default InstructionModal;
