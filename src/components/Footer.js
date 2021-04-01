import React from 'react'
import { Container, Row, Col }  from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <Row>
                    <Col className='text-center py-5' style={{'color': 'white', 'fontSize': '1rem'}}>
                        Copyright &copy; Loveworld Publishing
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
