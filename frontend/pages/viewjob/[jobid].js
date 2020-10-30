import { findjobbyid } from '../../lib/utils.js';
import Link from 'next/link';
import MyLayout from '../../components/mylayout.js';
import Button from 'react-bootstrap/Button';
import jsCookie from "js-cookie";


const Post = props => { 

    return (

      <MyLayout>

    <div>
        <h1>Job title: {props.result.title}</h1>
        <p>Company: {props.result.employer_name}</p>
        <p>Location: {props.result.location}</p>
        <p>Post date: {props.result.start_date}</p>
        <p>Expiration date: {props.result.end_date}</p>
        <p>Job description: {props.result.description}</p>
        
        { jsCookie.get("admin") || (jsCookie.get("employer") && jsCookie.get("id") == props.result.employer_id) ?
            <p>
                <Link href="../deletejob/[props.result.id]" as={`../deletejob/${props.result.id}`} >
                    <Button>DELETE THIS JOB</Button>
                </Link>
            </p>
        : null}
    </div>
  </MyLayout>


    )

}

//this is used to preload the search to find the job so it doesn't have problems trying to read an unfullfilled promise
Post.getInitialProps = async ({ query }) => {

    console.log("query.jobid ");
    console.log(query.jobid);
    const jobtofind =  await findjobbyid(query.jobid);

    console.log("jobtofind ");

    console.log(jobtofind);
    console.log(jobtofind.rows[0]);

    if (jobtofind.rows[0])
        return { result: jobtofind.rows[0] } ;
    else
        return { result: "not found" } ;
};

export default Post;