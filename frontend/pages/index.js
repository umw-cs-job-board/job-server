import React from "react";
import {getjobs} from '../lib/utils.js'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={search: ""};
  }

  async componentDidMount() {
    const jobs = await getjobs();
    this.setState({jobs});
  }

  async handleSearch(evt){
    this.setState({search: evt.target.value});
    const jobs = await getjobs();
    this.setState({jobs});
  }

  render() {
    return (
        <div>
            <div style={{ margin: "auto auto", width: "100%", textAlign: "center", padding: "0 px" }}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1>Job Board</h1>

              </div>

              <p><input type='text' value={this.state.search} onChange={this.handleSearch.bind(this)}/></p>

              {this.state.jobs ? <div>

                  <br />

                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Employer</th> 
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Description</th>
                      </tr>
                      </thead>
                    <tbody>
                      {this.state.jobs.rows.map((item, key) =>
                        <tr key={item.title}>
                          <td>{item.title}</td>
                          <td>{item.employer_name}</td>
                          <td>{item.location}</td>
                          <td>{item.start_date}</td>
                          <td>{item.end_date}</td>
                          <td>{item.description}</td>
                        </tr>
                        )}
                      
                    </tbody>
                  </table>


              </div> : null}

              

<div>
              <style jsx>{`
                  h1{
                    color:black; 
                    font-family: "Arial";
                    margin: "auto auto"; 
                    width: 100%;
                    display: inline; 
                    textAlign: "center";
                    padding: "0 px";
                  }
                  h2,
                  a{
                    font-family: "Arial";
                    textAlign: "center";
                    color: black;
                    margin:"auto auto";
                    padding:"9px";
                  }
                  .h3{
                    font-family: "Arial";
                    textAlign: center;
                    color: black;
                  }
                  .p{
                    font-family: "Arial";
                    textAlign: center;
                    color: black;
                  }
                  .button-style{
                    margin: auto auto;
                    cursor: pointer;
                    background-color: green;
                    color: #ffffff;
                    width: 100px;
                    font-family: "Arial";
                  }
                  .description {
                    font-family: "Arial";
                    font-size: "10px";
                  }
                  
                  a {
                    text-decoration: underline;
                    color: green;
                  }
                  a:hover {
                    opacity: 0.6;
                  }
                  table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                  }
                  td, th {
                    border: 1px solid #ffffff;
                    text-align: left;
                    padding: 8px;
                  }
                  tr:nth-child(even) {
                    background-color: #dddddd;
                  }
              `}</style>
              </div>
              </div>
    );
  }
}

export default Home;