import React from 'react'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'react-share'
import {rootLink} from "../../helpers/utils";

const updateShare = () => {
    const path_name = window.location.pathname;
    const { data } = axios.post(`${rootLink()}/api/share_link`, {
        path_name,
    });
    return data;
    // axios.get(`${rootLink()}/api/share_link`);
}

const Share = ({ share, setShare }) => {
    return (
        <div>
            <Modal
                show={share}
                onHide={() => setShare(false)}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Share Now</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='text-center'>
                        <TwitterShareButton title={'Twitter'} style={{ marginLeft: '10px' }} url={window.location.href}>
                            <TwitterIcon onClick={() => updateShare()} size={40} round={true} />
                        </TwitterShareButton>

                        <WhatsappShareButton style={{ marginLeft: '10px' }} url={window.location.href}>
                            <WhatsappIcon onClick={() => updateShare()} size={40} round={true} />
                        </WhatsappShareButton>

                        <FacebookShareButton style={{ marginLeft: '10px' }} url={window.location.href}>
                            <FacebookIcon onClick={() => updateShare()} size={40} round={true} />
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
