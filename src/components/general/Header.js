import React from 'react'
import { Container, Image } from 'react-bootstrap'
import pic from './logo.png'

const Header = () => {
    return (
        <Container fluid>
            <Image style={{
                width: '150px'
            }} src={pic} width='250px' className='img' />
        </Container>
    )
}

export default Header
