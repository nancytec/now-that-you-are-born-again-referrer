import React, {useState} from 'react'
import axios from 'axios';
import {Modal, Button, Form} from 'react-bootstrap'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'react-share'
import {rootLink} from "../../helpers/utils";
import swal from "@sweetalert/with-react";
import {updateMediaLinkDownloads} from "../../helpers/Helper";

const updateShare = () => {
    const path_name = window.location.pathname;
    const { data } = axios.post(`${rootLink()}/api/share_link`, {
        path_name,
    });
    return data;
    // axios.get(`${rootLink()}/api/share_link`);
}


const Gift = ({ gift, setGift }) => {

    const userDetails = JSON.parse(localStorage.getItem('userDetails') || "{}")
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const media_name = 'Now That You Are Born Again';
    const sender_name = userDetails.name;
    const sender_email = userDetails.email;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {sender_name, sender_email, email, name, phone, country, media_name};

        // Mail the download link to the beneficiary
        //Save Beneficiary's information to database
      axios.post(`${rootLink()}/api/gift_link`, data);
        // Increament Downloads by +1 with pathName
        const res = updateMediaLinkDownloads();
       swal("Download link sent to beneficiary email");
       setName('');
       setEmail('');
       setCountry('');
       setPhone('');
       setGift(false);

    }


    return (
        <div>
            <Modal
                show={gift}
                onHide={() => setGift(false)}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Gift Someone Now</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='name'>
                            <Form.Label>Beneficiary Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter beneficiary name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Beneficiary Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter beneficiary email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='phone'>
                            <Form.Label>Beneficiary Phone</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter beneficiary mobile number'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='country'>
                            <Form.Label>Beneficiary Country</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter beneficiary country'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" variant="secondary">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setGift(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Gift
