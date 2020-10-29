import React from "react";
import {getjobs} from '../lib/utils.js'
import {search} from '../lib/utils.js'
import {removeJob} from '../lib/utils.js'
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
    const jobs = await getjobs();
    this.setState({jobs});
  }

  async componentWillRender() {
    const jobs = await getjobs();
    this.setState({jobs});
  }


  async handleSearch(evt){
    this.setState({search: evt.target.value});
    const jobs = await search(evt.target.value);
    this.setState({jobs});
  }

  async delete(evt){
    const deleted = await removeJob({id: this.state.id});
    console.log("delete job_id " + deleted);
    this.setState({deleted});
  }

  render() {
    return (
      <MyLayout current="home">
        
        <div>
              <br />
               


              <Form> 

                <InputGroup className="mb-2 mr-sm-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>SEARCH</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type='text' size="70" value={this.state.search} onChange={this.handleSearch.bind(this)}/>
                </InputGroup>

              </Form>




              {this.state.jobs ? <div>

                  <br />

                  <Table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Employer</th> 
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                      </tr>
                      </thead>
                    <tbody>
                      {this.state.jobs.rows.map((item, key) =>
                        <tr key={item.id}>
                          <td>

                          <Link href="/viewjob/[item.id]" as={`/viewjob/${item.id}`} >
                            <a>{item.title}</a>
                          </Link>



                          </td>
                          <td>{item.employer_name}</td>
                          <td>{item.location}</td>
                          <td>{item.start_date}</td>
                          <td>{item.end_date}</td>

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
                    </MyLayout>

    );
  }
}

export default Home;
