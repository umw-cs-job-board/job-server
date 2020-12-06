import { findemployerbyid2, editEmployer } from '../../lib/utils.js';
import Link from 'next/link';
import MyLayout from '../../components/mylayout.js';
import Button from 'react-bootstrap/Button';
import jsCookie from "js-cookie";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useState } from "react";

const Post = props => {
    const [email, setEmail] = useState(props.result.email);
    const [password, setPassword] = useState(props.result.password);
    const [name, setName] = useState(props.result.name);
    const [industry, setIndustry] = useState(props.result.industry);
    const [location, setLocation] = useState(props.result.location);
    const [description, setDescription] = useState(props.result.description);

    const handleSubmit = (evt) => {
        const info = editEmployer({
            id: props.result.id,
            email: email,
            password: password,
            name: name,
            industry: industry,
            location: location,
            description: description
        });
    }
    return (
        <MyLayout>
        <div className="bglightblue boxsmall col">
            <div className="bgwhite box col">
                <div>
                <h1>Update employer profile</h1>

                <Form>

                    <Row>
                        <Col>
                            <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formName">
                            <Form.Label>Company / organization name</Form.Label>
                            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)}/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formIndustry">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control type="text" value={industry} onChange={e => setIndustry(e.target.value)}/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Link href="../viewemployer/[props.result.id]" as={`../viewemployer/${props.result.id}`} >
                        <Button onClick={d => handleSubmit()}>SUBMIT</Button>
                    </Link>

                </Form>
                </div>
            </div>
        </div>
        </MyLayout>
    )
}

//this is used to preload the search to find the employer so it doesn't have problems trying to read an unfullfilled promise
Post.getInitialProps = async ({ query }) => {

    console.log("query.employerid ");
    console.log(query.employerid);
    const employertofind =  await findemployerbyid2(query.employerid);

    console.log("employertofind ");

    console.log(employertofind);
    console.log(employertofind.rows[0]);

    if (employertofind.rows[0])
        return { result: employertofind.rows[0] } ;
    else
        return { result: "not found" } ;
};

export default Post;