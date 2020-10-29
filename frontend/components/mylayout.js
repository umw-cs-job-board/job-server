//This component is used as the basic layout for every page
//global CSS file can be found at ./css/jobboard.css. It is loaded using ./pages/_app.js

import Nav from 'react-bootstrap/Nav';



const MyLayout = (props) => (


	<div>
		

        {/* This is the navbar. If you want a nav link highlighted bold, it needs a className that is passed as a "current" prop from the page it is highlighted on. So on the home page it would be <MyLayout current="home"> */}

		<Nav style={{padding:"5px"}} 
		  activeKey="./"
		  onSelect={(selectedKey) => console.log(`selected ${selectedKey}`)}
		  className="fixed-top bgdarkblue1">

		  <Nav.Item>
		    <Nav.Link href="/" eventKey="link-1"><span className="navspan home">
		    	Home 
		    </span></Nav.Link>
		  </Nav.Item>

		  <Nav.Item>
		    <Nav.Link href="/post_job" eventKey="link-2"><span className="navspan post_job">
			    Post a job 
		    </span></Nav.Link>
		  </Nav.Item>

		  <Nav.Item>
		    <Nav.Link href="/login" eventKey="link-2"><span className="navspan login">
			    Log in 
		    </span></Nav.Link>
		  </Nav.Item>

		
		</Nav>





        {/* This is the banner that shows the name of the website. */}


		<div className="jumbotron" style={{padding:"30px", backgroundImage:"url('images/bgtrinkle.jpg')", backgroundColor:"#000000", backgroundSize:"cover", borderRadius:"0"}} >
		<br /><br />
			<h1 className="display-4" style={{color:"#FFFFFF"}}>Job / Internship Board</h1>
			<p className="lead" style={{color:"white"}}>University of Mary Washington Computer Science Department</p>
		</div>





        {/* This is where the content from the child component is displayed. */}


		<div className="container-fluid pl-5 pr-5">

			<div className="row">

				<div className="col">


					{props.children}


				</div>

			</div>

		</div>




			<style jsx>{`


				span.navspan {
					color:#DDDDDD;
				}

				span.navspan:hover {
					color:#FFFFFF;
				}

				span.navspan:active {
					color:#9999FF;
				}

				span.${props.current} {
					color:#DDDDDD;
					font-weight:bold;
				}



			`}</style> 
	</div>
);

export default MyLayout;
