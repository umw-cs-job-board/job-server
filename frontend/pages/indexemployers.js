import React from "react";
import {getemployers} from '../lib/utils.js'
import {searchEmployers} from '../lib/utils.js'
import {removeEmployer} from '../lib/utils.js'
import Link from 'next/link';

import MyLayout from '../components/mylayout.js';

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={search: ""};
  }

  async componentDidMount() {
    const employers = await getemployers();
    this.setState({employers});
  }

  async componentWillRender() {
    const employers = await getemployers();
    this.setState({employers});
  }


  async handleSearch(evt){
    this.setState({search: evt.target.value});
    const employers = await searchEmployers(evt.target.value);
    this.setState({employers});
  }

  async delete(evt){
    const deleted = await removeEmployer({id: this.state.id});
    console.log("delete employer_id " + deleted);
    this.setState({deleted});
  }

  render() {
    return (
      <MyLayout current="home">
        


		<span className="bglightblueshaded boxsmall">
			<b>&nbsp;&nbsp;<a href="/">SEARCH JOBS / INTERNSHIPS</a>&nbsp;&nbsp;</b>
		</span>&nbsp;&nbsp;
		<span href="#" className="bglightblue boxsmall">
			<b>&nbsp;&nbsp;SEARCH EMPLOYERS&nbsp;&nbsp;</b>
		</span>

		<div className="bglightblue boxsmall col">
			<div className="bgwhite box col">
		        <div>




	        <div>
               
              <Form> 

                <InputGroup className="mb-2 mr-sm-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>SEARCH</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type='text' size="70" value={this.state.search} onChange={this.handleSearch.bind(this)}/>
                </InputGroup>

              </Form>




              {this.state.employers ? <div>

                  <br />

                  <Table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Industry</th> 
                        <th>Location</th>
                        <th>Description</th>
                      </tr>
                      </thead>
                    <tbody>
                      {this.state.employers.rows.map((item, key) =>
                        <tr key={item.id}>
                          <td>

                          <Link href="/viewemployer/[item.id]" as={`/viewemployer/${item.id}`} >
                            <a>{item.name}</a>
                          </Link>



                          </td>
                          <td>{item.industry}</td>
                          <td>{item.location}</td>
                          <td>{item.description}</td>

                        </tr>
                        )}
                      
                    </tbody>
                  </Table>


              </div> : null}
	          <div>
	              <style jsx>{`
                  


	              `}</style>
              </div>
              </div>
          </div>
          </div>
        </div>
    </MyLayout>

    );
  }
}

export default Home;
