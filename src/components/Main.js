import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShareIcon from '@material-ui/icons/Share';
import GetAppIcon from '@material-ui/icons/GetApp';
import { getMediaObject, postComment, recordMediaStat, getComments, getLatestPdf } from '../helpers/Helper';
import Comments from './Comments';
import swal from '@sweetalert/with-react';
import { toHumanString } from 'human-readable-numbers'
import { formatDistanceToNow } from 'date-fns'
import { Carousel } from 'react-responsive-carousel';
import Share from './Share';
import Modals from './Modals';

const Main = ({ match, }) => {
    const [like, setLike] = useState(false)
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [data, setData] = useState({})
    const [played, setPlayed] = useState(false)
    const [share, setShare] = useState(false)
    const [pdf, setPdf] = useState({})

    const { media_id, user_id } = match.params

    const nameFromState = localStorage.getItem('userDetails') && JSON.parse(localStorage.getItem('userDetails')).name


    useEffect(() => {
        localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : setShow(true)

        setName(nameFromState)

        const liked = localStorage.getItem(`likes:${media_id}`) === 'true';
        if (liked) {
            setLike(true);
        }

        getMediaObject(media_id, user_id)
            .then((d) => {
                const media_title = d?.name || document.title;
                setData(d)
                document.title = media_title;
            })
            .catch(({ message }) => swal("Error", message, 'error'));

        getComments(media_id)
            .then((comments) => setComments(comments))
            .catch((error) => console.error(error));

        getLatestPdf()
            .then((pdf) => setPdf(pdf))
            .catch((error) => console.error(error))

        window.addEventListener('unload', onUserLeave)
        return () => {
            window.removeEventListener('unload', onUserLeave)
        }
    }, [media_id, nameFromState, user_id])


    const onUserLeave = () => {
        !played && recordMediaStat(media_id, 'bounce')
    }

    const handleIcon = () => {
        const liked = localStorage.getItem(`likes:${media_id}`) === 'true';
        if (liked) return;
        setLike(true);
        localStorage.setItem(`likes:${media_id}`, 'true');
        recordMediaStat(media_id, 'like')
    }

    const handleClose = (e) => {
        e.preventDefault()
        localStorage.setItem('userDetails', JSON.stringify({ name, email }))
        setShow(false)
    }

    const submitComment = (e) => {
        e.preventDefault()
        postComment(media_id, comment)
        setComments([{ name, message: comment, created_at: new Date() }, ...comments])
        setComment('')
    }

    const handleDownload = () => {
        window.location.href = `/storage/${data?.path}`
    }

    const recordPlay = () => {
        recordMediaStat(media_id, 'open')
        setPlayed(true)
    }

    return (
        <Container fluid className='main'>
            <Modals
                show={show}
                handleClose={handleClose}
                name={name} email={email}
                setEmail={setEmail}
                setName={setName}
            />

            <Share setShare={setShare} share={share} />

            <div className="row justify-content-md-center">
                <div className="divv col-12 col-md-8 col-lg-8 col-xl-6 col-sm-12 m-auto">
                    <Row>
                        <Col md={12} className='video'>
                            <ReactPlayer
                                className='justify-content-md-center'
                                onPlay={recordPlay}
                                width='100%'
                                height='50vh'
                                controls={true}
                                url='https://www.youtube.com/watch?v=3LOEGS4qcRM&list=PLDlWc9AfQBfZGZXFb_1tcRKwtCavR7AfT'
                            />
                        </Col>
                    </Row>

                    <Row className='my-2'>
                        <Col>
                            <h2>{data?.name}</h2>

                        </Col>
                    </Row>

                    <Row>
                        <Col md={5}><p className='text-muted two my-2'>{formatDistanceToNow(new Date())}</p></Col>
                        <Col className='icons my-2' md={7}>
                            <div className='icon'>
                                <VisibilityIcon style={{ "cursor": "pointer", }} /> <span>{toHumanString(data?.views)}</span>
                            </div>
                            <div className='icon'>
                                <span onClick={handleIcon}>
                                    <ThumbUpAltIcon style={{ "cursor": "pointer", color: like ? "blue" : '' }} /> <span>{toHumanString(data?.likes)}</span>
                                </span>
                            </div>
                            <div className='icon'>
                                <span onClick={() => setShare(true)}>
                                    <ShareIcon style={{ "cursor": "pointer" }} /> <span>Share</span>
                                </span>
                            </div>
                            <div className='icon'>
                                <span onClick={handleDownload}>
                                    <GetAppIcon style={{ "cursor": "pointer" }} /> <span>Download</span>
                                </span>
                            </div>
                        </Col>
                    </Row>

                    <hr />

                    <Row className='my-4'>
                        <h4>Comments & Testimonies</h4>
                        <Col className='comment-field'>
                            <Col className='comments'>
                                <Form onSubmit={submitComment}>
                                    <Form.Group controlId='comment' className='input mr-3'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Post a comment'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="primary" className='button' type='submit'>
                                        Post
                                    </Button>
                                </Form>
                            </Col>
                            <div style={{ clear: "both" }}></div>
                            {/* <hr /> */}
                            <Col>
                                <Comments
                                    comments={comments}
                                />
                            </Col>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col md={6}>
                            <Card style={{width: "80%", height: "fill"}} className='card mx-auto my-3'>
                                <Card.Img variant="top" src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/28163447/36C3-PDF-encryption-featured2.jpg" />
                                <Card.Body>
                                    <Card.Title>{pdf?.name || "Loading..."}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card style={{width: "80%"}} className=' mx-auto my-3'>
                            <Carousel style={{width: "80%"}} showStatus={false} showThumbs={false}>
                                <div>
                                    <img src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/28163447/36C3-PDF-encryption-featured2.jpg" />
                                    <p className="legend">Legend 1</p>
                                </div>
                                <div>
                                    <img src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/28163447/36C3-PDF-encryption-featured2.jpg" />
                                    <p className="legend">Legend 2</p>
                                </div>
                                <div>
                                    <img src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/28163447/36C3-PDF-encryption-featured2.jpg" />
                                    <p className="legend">Legend 3</p>
                                </div>
                            </Carousel>
                            <Card.Footer>
                                <p>Flyer</p>
                            </Card.Footer>
                            </Card>
                        </Col>
                    </Row>

                    <hr />
                </div>
            </div>
        </Container>
    )
}

export default Main
