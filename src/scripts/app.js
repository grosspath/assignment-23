import $ from 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
let appContainerEl = document.querySelector('#app-container')

const AllTheSenatorsGetProps = React.createClass({

  render: function(){
    return (
      <div>
        <h1>Senators List</h1>
        <hr/>
        <ListOfSenators someSenators={this.props.theSenators}/>
      </div>
    )
  }
})

const ListOfSenators = React.createClass({

  _createSenatorsJSX: function(arrayOfData) {

    let jsxArray = arrayOfData.map(function(stringOfSenators) {

      if (stringOfSenators.oc_email === null ) {stringOfSenators.oc_email = 'undefined'}
      if (stringOfSenators.website === null ) {stringOfSenators.website = 'undefined'}
      if (stringOfSenators.facebook_id === null) {stringOfSenators.facebook_id = 'undefined'}
      if (stringOfSenators.twitter_id === null) {stringOfSenators.twitter_id = 'undefined'}
      return (
        <div className = "container">
           <h3>{stringOfSenators.first_name} {stringOfSenators.last_name}</h3>
           <h4>{stringOfSenators.title}--{stringOfSenators.party} {stringOfSenators.state_name}</h4>
           <ul>
             <li>email: {stringOfSenators.oc_email}</li>
             <li>website: {stringOfSenators.website}</li>
             <li>facebook: {stringOfSenators.facebook_id}</li>
             <li>twitter: {stringOfSenators.twitter_id}</li>
           </ul>
           <h5>term end: {stringOfSenators.term_end}</h5>
         </div>
     )
    })

    return jsxArray
  },

  render: function(){
    let senatorList = this.props.someSenators;

    return (
      <ul>
        { this._createSenatorsJSX(senatorList) }
      </ul>
    )
  }
})

$.getJSON("https://congress.api.sunlightfoundation.com/legislators?callback=?").then(function(serverRes){
    let information = serverRes.results
    ReactDOM.render (
      <AllTheSenatorsGetProps theSenators={information}/>, appContainerEl)

console.log(serverRes.results);
})
