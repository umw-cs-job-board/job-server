import { remove_review } from '../lib/utils.js';
import { find_flagged_reviews } from '../lib/utils.js';
import Link from 'next/link';
import MyLayout from '../components/mylayout.js';
import jsCookie from "js-cookie";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import React, { useState } from "react";


const Flagged = props => { 

    const deleteReview = (evt) => {
        console.log("idnum  " + evt);
        const Delete = remove_review({
            id: evt
        });
    }

    return (

    <MyLayout>

    {props.reviews ? 
        <div>
        <br />

            <Table>
                <thead>
                    <tr>
                    <th>FLAGGED REVIEWS</th>
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
                                   <Link href="../flaggedreviews" as={`../flaggedreviews`} >
                                     <Button size="sm" variant="dark" value={item.id} onClick={e => {deleteReview(e.target.value); alert("Review deleted.");}}>DELETE REVIEW</Button>
                                   </Link>

                               </p>
                            : null
                            }
                        </td>

                    </tr>
                    )}
                </tbody>
            </Table>
        </div> : null}

    </MyLayout>

)}

//this is used to preload the search to find the employer so it doesn't have problems trying to read an unfullfilled promise
Flagged.getInitialProps = async () => {

    const flaggedreviews = await find_flagged_reviews();

    console.log("flaggedreviews ---------------------------------------" + flaggedreviews);
    console.log("-----------------end---------------------");
    console.log("flaggedreviews.rows[0] ---" + flaggedreviews.rows[0]);

    if (flaggedreviews.rows[0])
        return { reviews: flaggedreviews } ;
    else
        return { reviews: "not found" } ;
};

export default Flagged;