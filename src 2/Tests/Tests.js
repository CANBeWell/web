import React from 'react';
import PropTypes from 'prop-types';
import '../Button.css';
import TestsModal from './TestsModal';
import TestList from '../JSONFolder/29Augtesthtml.json';


class Tests extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  helpClicked = () => {
        this.setState({
          isOpen: !this.state.isOpen,
          headerText: "Help",
          bodyText: "Here what you need to do on page Tests",
          buttonText: "Got It?",
        });
  }

  render() {

    if(!this.props.showTests) {
      return null;
    }

    return (

      <div>
        <button className="button button2" onClick={this.helpClicked}>?</button>

        <FilterableTestTable tests={this.props.data(TestList)} />

        <TestsModal show={this.state.isOpen}
          onClose={this.toggleModal}
          header={this.state.headerText}
          body={this.state.bodyText}
          button={this.state.buttonText}
          displayConfig={this.state.displayConfigOption}>>
        </TestsModal>
      </div>
    );
  }
}

Tests.propTypes = {
  showTests: PropTypes.bool,
  userConfig: PropTypes.object,
  data: PropTypes.func.isRequired,
};

class TestRow extends React.Component {

  openDetails = (id) => {
    console.log(id);
    var details = document.getElementById(id);
    details.open = true;
  }

  render() {

    const Image = "http://quickforms2.eecs.uottawa.ca/canbewell/";
    var sujectArray = [];
    var bodys = this.props.test.body;
    bodys.forEach((body) => {


      var bodyArray = body.text.split(/(\[\[|\]\]|\n)/g);
      var bodyArrayToDisplay = [];

      for(var i = 0; i < bodyArray.length; i++){
        if(bodyArray[i] == '[['){
          var link = bodyArray[i+1].split(';');

          try{
            if(link[0] === "image" || link[0] === "images"){
              var adress = Image.concat(link[1].trim());
              bodyArrayToDisplay.push(<div><img className="imageFromFolder" src={adress} alt="photo"/></div>);
            }
            else if(link[1].indexOf("topic") === 0 || link[1].indexOf("topic") === 1){
              link[1] = link[1].replace('topic://', '').trim();
              bodyArrayToDisplay.push(<span onClick={(id) => this.openDetails(link[1])}><font color="Yellow">{link[0]}</font></span>);;
            }
            else if(link[1].indexOf("test") === 0 || link[1].indexOf("test") === 1){
              link[1] = link[1].replace('test://', '').trim();
              bodyArrayToDisplay.push.push(<span onClick={(id) => this.openDetails(link[1])}><font color="Yellow">{link[0]}</font></span>);
            }
            else{
              bodyArrayToDisplay.push(<a href={link[1]} target="_blank"><font color="Yellow">{link[0]}</font></a>);
            }
            i++;
          }catch(err){}
        }
        else if(bodyArray[i] == '\n'){
          bodyArrayToDisplay.push(<br/>);
        }
        else if ( bodyArray[i] !== ']]' ){
          bodyArrayToDisplay.push(bodyArray[i]);
        }

      }
      sujectArray.push(<div>{bodyArrayToDisplay}</div>);
    });


    return (
      <details id={this.props.test.name}>
        <summary><font size="+1"><b>{this.props.test.name}</b></font></summary>
        <div>{sujectArray}</div>
      </details>
    );
  }
}

class TestTable extends React.Component {
  render() {

    const backdroplistItemStyle = {
      padding: 5
    };

    const blueist = '#27AAE1';

    const listItemStyle = {
      backgroundColor: blueist,
      fontWeight: 300,
      borderRadius: 15,
      width: '99%',
      minHeight: 50,
      margin: '0 auto',
      textAlign:'center',
      padding: 10,
      color: 'white'
    };

    var rows = [];
    this.props.tests.forEach((test) => {
      if (test.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }
      rows.push(<div style={backdroplistItemStyle}>
                  <div style={listItemStyle}>
                    <TestRow test={test}/>
                  </div>
                </div>);
    });
    return (
      <table className='table'>
        {rows}
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          className="form-control searchbar"
          type="text"
          placeholder="Search tests..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

class FilterableTestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);

  }

  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <TestTable
          tests={this.props.tests}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

export default Tests;
