import { findemployerbyid } from '../../lib/utils.js';
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
        
        { jsCookie.get("admin") || (jsCookie.get("employer") && jsCookie.get("id") == props.result.id) ?
            <p>
                <Link href="../deleteemployer/[props.result.id]" as={`../deleteemployer/${props.result.id}`} >
                    <Button>DELETE THIS EMPLOYER</Button>
                </Link>
            </p>
        : null}
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