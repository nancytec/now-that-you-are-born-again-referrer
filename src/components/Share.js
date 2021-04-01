import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'react-share'

const Share = ({ share, setShare }) => {
    return (
        <div>
            <Modal
                show={share}
                onHide={() => setShare(false)}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Share Video</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='text-center'>
                        <TwitterShareButton title={'Twitter'} style={{ marginLeft: '10px' }} url={window.location.href}>
                            <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>

                        <WhatsappShareButton style={{ marginLeft: '10px' }} url={window.location.href}>
                            <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>

                        <FacebookShareButton style={{ marginLeft: '10px' }} url={window.location.href}>
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShare(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Share
