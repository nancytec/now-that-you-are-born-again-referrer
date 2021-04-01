import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Comment } from 'semantic-ui-react'
import { formatDistanceToNow } from 'date-fns' 

const Comments = ({ comments}) => {
    return (
        <Container>
            <Row>
                <Col md={12} sm={12}>
                    { comments.map(({name, message, created_at}, i) => (
                        <Comment.Group size='small'>
                        <Comment>
                            <Comment.Avatar as='span' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                            <Comment.Content>
                                <Comment.Author as='span'>{name}</Comment.Author>
                                <Comment.Metadata>
                                    <span>{formatDistanceToNow(new Date(created_at))}</span>
                                </Comment.Metadata>
                                <Comment.Text>{message}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                    )) }   
                </Col>
            </Row>
        </Container>
    )
}

export default Comments
