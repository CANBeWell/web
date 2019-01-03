import React from 'react';
import PropTypes from 'prop-types';
import {setGender} from './UserInfo';
import {setPatientProvider} from './UserInfo';
import {setAge} from './UserInfo';
import {getUserInfo} from './UserInfo';
import './Style/Modal.css';

class MyModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      selectedPatientProvider: "patient",
      selectedGender: "",
      allAgesSelected: false
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

  handleAllAgesSelected(event){

    this.setState({
      allAgesSelected: !this.state.allAgesSelected
    }, () => {
      this.setState({value: this.state.allAgesSelected ? "all ages" : ""}); //Call back once setState is done
      setAge(this.state.allAgesSelected ? "all ages" : "");
    });
  }

  handlePatientProviderChange(mEvent) {

    setPatientProvider(mEvent.target.value);
    this.setState({
      selectedPatientProvider: mEvent.target.value
    });

  }

  handleGenderChange(changeEvent) {

    setGender(changeEvent.target.value);
    this.setState({
      selectedGender: changeEvent.target.value
    });

  }

  render() {

    // Render info about the user
    if(!this.props.show) {
      return null;
    }


    const myModalStyle = {
      overflow: 'scroll',
    };

    var UserInfo = getUserInfo();
    this.state.selectedPatientProvider = UserInfo.patient_provider;
    this.state.selectedGender = UserInfo.gender;

    return (
      <div className="backdrop" >
        <div className="myModal" style={myModalStyle}>
          {this.props.children}

          <div>

            <h1>{this.props.header}</h1>
            <div className="myModalBody">
              {/*slect patient/provider*/}
              <p>{this.props.lang.i_am_an}:</p>
              <div>
                <form>
                  <div className="radio">
                    <label >
                      <input type="radio" value="patient" checked={this.state.selectedPatientProvider == 'patient'} onChange={this.handlePatientProviderChange}/>{this.props.lang.patient}
                    </label>

                    <label>
                      <input type="radio" value="provider" checked={this.state.selectedPatientProvider == 'provider'} onChange={this.handlePatientProviderChange}/>{this.props.lang.provider}
                    </label>
                  </div>
                </form>
              </div>
              <p>{this.props.lang.patient_gender}:</p>
              {/*select gender*/}
              <div>
                <form>
                  <div className="radio">
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
              {/*select age*/}
              <div>
                <p>{this.props.patient_age}</p>
                <input type="text" value={this.state.value} onChange={this.handleChange} placeholder={this.props.lang.enter_your_age_place_holder}/>
                <label>
                  <input type="checkbox" checked={this.state.allAgesSelected} onChange={this.handleAllAgesSelected}/>{this.props.lang.all_ages}
                </label>
              </div>
              {/*close button*/}
              <div className="myModalButton" >
                <button onClick={this.props.onClose}>{this.props.button}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  header: PropTypes.string,
  button: PropTypes.string,
  lang: PropTypes.object,
};

export default MyModal;
