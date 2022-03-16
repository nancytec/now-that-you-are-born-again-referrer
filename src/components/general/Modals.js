import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const Modals = ({ show, handleClose, name, email, phone, purpose, country, setPhone, setPurpose, setCountry,  setEmail, setName}) => {
    return (
        <div>
             <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Please Provide Your Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleClose}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='phone'>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter mobile number'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='country'>
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter country'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='purpose'>
                            <Form.Label>Purpose</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Purpose of use'
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                required
                            />
                        </Form.Group>


                        <Button type="submit" variant="secondary">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Modals;
