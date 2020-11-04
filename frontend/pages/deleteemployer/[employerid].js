import { findemployerbyid, removeEmployer } from '../../lib/utils.js';
import Link from 'next/link';
import MyLayout from '../../components/mylayout.js';
import Button from 'react-bootstrap/Button';
import jsCookie from "js-cookie";


const Post = props => { 

    return (

      <MyLayout>

    <div>
        <h1>{props.result.name}</h1>
        <p>Industry: {props.result.industry}</p>
        <p>Location: {props.result.location}</p>
        <p>Description: {props.result.description}</p>
        





        <p>ARE YOU SURE YOU WANT TO DELETE THIS EMPLOYER?           
            &nbsp;
            <Link href="../indexemployers" as={`../indeximployers`} >
            <Button onClick={() => {removeEmployer({id:props.result.id}); alert("Employer deleted.");}}>DELETE</Button>
            </Link>
            &nbsp;
            <Link href="../viewemployer/[props.result.id]" as={`../viewemployer/${props.result.id}`} >
            <Button>CANCEL</Button>
            </Link>

        </p>
    
    </div>
  </MyLayout>


    )

}

//this is used to preload the search to find the employer so it doesn't have problems trying to read an unfullfilled promise
Post.getInitialProps = async ({ query }) => {

    console.log("query.employerid ");
    console.log(query.employerid);
    const employertofind =  await findemployerbyid(query.employerid);

    console.log("employertofind ");

    console.log(employertofind);
    console.log(employertofind.rows[0]);

    if (employertofind.rows[0])
        return { result: employertofind.rows[0] } ;
    else
        return { result: "not found" } ;
};

export default Post;