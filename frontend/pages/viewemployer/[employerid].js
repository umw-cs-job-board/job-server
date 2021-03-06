import { remove_review } from '../../lib/utils.js';
import { findemployerbyid } from '../../lib/utils.js';
import { get_reviews } from '../../lib/utils.js';
import { create_reviews } from '../../lib/utils.js';
import { flag_review } from '../../lib/utils.js';
import Link from 'next/link';
import MyLayout from '../../components/mylayout.js';
import jsCookie from "js-cookie";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import React, { useState } from "react";


const Post = props => { 

    const [reviewer, setReviewer] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [affiliation, setAffiliation] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("No");
    const [show, setShow] = useState(false);

    const handleSubmit = (evt) => {
        var today = new Date();
        var todayDate = (today.getFullYear() + '-' + (today.getMonth()+1) + '-' +  today.getDate());
        const Review = create_reviews({
            employer_id: props.result.id,
            reviewer: reviewer,
            title: title,
            description: description,
            posted_date: todayDate,
            affiliation: affiliation,
            rating: rating
        });
        setReview("Yes");
        window.location.reload(true);
    }

    const flagReview = (evt) => {
        console.log("flagReview, evt: " + evt);
        const Flag = flag_review({
            id: evt
        });
        setShow(true);
    }

    const deleteReview = (evt) => {
        console.log("idnum  " + evt);
        const Delete = remove_review({
            id: evt
        });
    }

    return (

    <MyLayout>

    <div>

        {show==true ?
            <Alert variant="danger" onClose={() => setShow(false)}>
                <Alert.Heading>The review has been flagged</Alert.Heading>
                <p>The review will be sent to an administrator for evaluation</p>
                <div className="d-flex justify-content-end">
                  <Button onClick={() => setShow(false)} variant="outline-danger">Close</Button>
                </div>
            </Alert> 
          : null
        }

        <h1>{props.result.name}</h1>
        <p>Industry: {props.result.industry}</p>
        <p>Location: {props.result.location}</p>
        <p>Description: {props.result.description}</p>
        
        { jsCookie.get("admin") || (jsCookie.get("employer") && jsCookie.get("id") == props.result.id) ?
            <p>
                <Link href="../deleteemployer/[props.result.id]" as={`../deleteemployer/${props.result.id}` } >
                    <Button >DELETE THIS EMPLOYER</Button>
                </Link>
                <a> </a>
                <Link href="../updateemployer/[props.result.id]" as={`../updateemployer/${props.result.id}`} >
                    <Button >UPDATE THIS EMPLOYER</Button>
                </Link>
            </p>
        : null}
    </div>

    {props.reviews ? 
        <div>
        <br />

            <Table>
                <thead>
                    <tr>
                    <th>EMPLOYER REVIEWS</th>
                    </tr>
                </thead>
                <tbody>
                    {props.reviews.rows.map((item, key) =>
                    <tr key={item.id}>
                        <td>
                            <tr><b>{item.title} ({item.rating} stars)</b></tr>
                            <tr>{item.reviewer} ({item.affiliation})</tr>
                            <tr>{item.posted_date}: {item.description}</tr>
                            {jsCookie.get("admin") ?

                               <p>
                                   {item.flagged == true ?
                                      <Button size="sm" variant="warning" disabled>FLAGGED</Button>
                                   :null}
                                   {' '}
                                   <Link href="../viewemployer/[props.result.id]" as={`../viewemployer/${props.result.id}`} >
                                     <Button size="sm" variant="dark" value={item.id} onClick={e => {deleteReview(e.target.value); alert("Review deleted.");}}>DELETE REVIEW</Button>
                                   </Link>

                               </p>
                            : <p><Button size="sm" variant="dark" value={item.id} onClick={e => flagReview(e.target.value)}>FLAG REVIEW</Button><br /></p>
                            }
                        </td>

                    </tr>
                    )}
                </tbody>
            </Table>
        </div> : null}
    
    <br/>
    <span className="bglightblue boxsmall">
        <b>&nbsp;&nbsp;Write a Review&nbsp;&nbsp;</b>
    </span>&nbsp;&nbsp;

    <div className="bglightblue boxsmall col">
        <div className="bgwhite box col">
            <div>
                <Form> 
                
                <Row>
                    <Col>
                        <Form.Group controlId="formReviewReviewer">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={reviewer} onChange={e => setReviewer(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="formReviewTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="formReviewRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="text" value={rating} onChange={e => setRating(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="formReviewAffiliation">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control type="text" placeholder = 'e.g. software developer, intern etc.' value={affiliation} onChange={e => setAffiliation(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="formReviewDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder = 'Describe your experience at this company' type="text" value={description} onChange={e => setDescription(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                { ( (reviewer=="") || (title=="") || (description=="") || (affiliation=="") || (rating=="") || (isNaN(rating)) || (parseInt(rating)>5) || (parseInt(rating)<0) )  ?
                    <p>All fields must be filled out and rating must be an integer 0-5!<br /></p>
                :
                <p>
                    <Link href="../viewemployer/[props.result.id]" as={`../viewemployer/${props.result.id}`} >
                        <Button onClick={d => {handleSubmit(); alert("Review added.");}}>Submit</Button>
                    </Link>
                <br /></p>
                }



                
                {({review} == "Yes")?
                    <p>Review successfully submitted!<br /></p>
                    : null
                }

                {({review} && ({review} == "No"))?
                    <p>Review not submitted!<br /></p>
                    : null
                }

                </Form>
            </div>
        </div>
    </div>

    </MyLayout>

)}

//this is used to preload the search to find the employer so it doesn't have problems trying to read an unfullfilled promise
Post.getInitialProps = async ({ query }) => {

    console.log("query.employerid ");
    console.log(query.employerid);
    const employertofind =  await findemployerbyid(query.employerid);

    const reviews = await get_reviews(query.employerid);

    console.log("employertofind ");

    console.log(employertofind);
    console.log(employertofind.rows[0]);

    console.log("reviews: " + reviews);

    if (employertofind.rows[0])
        return { result: employertofind.rows[0], reviews: reviews } ;
    else
        return { result: "not found" } ;
};

export default Post;