//this is just to demonstrate dynamic routes

import React from 'react'
import Link from 'next/link';


const jobnumber1 = 123456;
const jobnumber2 = 345678;
const jobnumber3 = 567890;
	

class ViewJobExample extends React.Component{

	render(){
		return(
			<div>
				<p>Here is a couple links to jobs:</p>

				<p>
					<Link href="/viewjobexample/[jobnumber1]" as={`/viewjobexample/${jobnumber1}`} >

						<a>Job number {jobnumber1}</a>
					</Link>
	        	</p>

				<p>
					<Link href="/viewjobexample/[jobnumber2]" as={`/viewjobexample/${jobnumber2}`} >
						<a>Job number {jobnumber2}</a>
					</Link>
	        	</p>

				<p>
					<Link href="/viewjobexample/[jobnumber3]" as={`/viewjobexample/${jobnumber3}`} >
						<a>Job number {jobnumber3}</a>
					</Link>
	        	</p>


			</div>
		);
		
	}
}
export default ViewJobExample;