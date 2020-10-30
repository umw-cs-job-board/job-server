import React from 'react'
import Router from "next/router";
import jsCookie from "js-cookie";

import MyLayout from '../components/mylayout.js';


class Logout extends React.Component {




constructor(props) {
    super(props);
    this.state = { name:"", email :"", password:"", location:"", industry:"", description: "", user_type:"" };
    jsCookie.remove('name');
    jsCookie.remove('email');
    jsCookie.remove('password');
    jsCookie.remove('location');
    jsCookie.remove('industry');
    jsCookie.remove('description');
    jsCookie.remove('user_type');
    jsCookie.remove('admin');
    jsCookie.remove('employer');  
  }

//componentDidMount executes as soon as you render the page. In this case it replaes the page with the search page.  
componentDidMount(){
     Router.replace("/");
  }

render() {

	const that = this;
	return (
		<MyLayout current="logout">You are now logged out.</MyLayout>
	)

}

}


export default Logout;