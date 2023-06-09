import { Col, Row } from 'antd'
import './FooterComponent.css'

const FooterComponent = () => {
    return (
        <footer className="footer-distributed">
            <div className='footerHeadText'>
                <p className='footerHeadText'>If you have any questions or would like to learn more about our private blockchain-based file management and verification system, please don't hesitate to contact us. Our team is standing by to assist you with any inquiries you may have.</p>
            </div>

            <div className="footer-center">

                <div>
                    <i className="fa fa-phone"></i>
                    <p>You can reach us using the following methods:</p>
                </div>

                <div>
                    <i className="fa fa-phone"></i>
                    <p>Email: info@yourcompany.com</p>
                </div>
                <div className='ml'>
                    <p>Phone: +1 (555) 123-4567</p>
                </div>
                <div className='ml'>
                    <p>Address: 123 Main Street, Suite 100, Anytown, USA</p>
                </div>
            </div>



            <div className="footer-center">

                <div>
                    <i className="fa fa-map-marker"></i>
                    <p><span>You can also connect with us on social media:</span></p>
                </div>

                <div>
                    <i className="fa fa-phone"></i>
                    <p>Facebook:@yourcompany</p>
                </div>

                <div className='ml'>
                    <p >Twitter:@yourcompany</p>
                </div>
                <div className='ml'>
                    <p>LinkedIn:@yourcompany</p>
                </div>
            </div>

            <div className="footer-right">

                <p className="footer-company-about">
                    <span>Ger latest Update</span>
                </p>
                <p className="footer-company-about">
                    Subscribe to our newsletter
                </p>
                <div className='subcribe'>
                    <input id='btn' className='btn-footer' type='button' value='SUBSCRIBE'></input>
                    <input id='input' placeholder='Type your mail ID here' type='text'></input>
                </div>
            </div>


            <Row>
                <Col span={24} >
                    <p style={{ textAlign: 'center', marginBottom: 10, padding: 3 }} >We look forward to hearing from you and helping you get the most out of our system!</p>
                </Col>
            </Row>
            <Row className='WebDesign' style={{ backgroundColor: 'black', padding: 10 }}>
                <Col span={20}>
                    <p style={{ textAlign: 'center' }}>All Right Reserved <b>2022-2023</b></p>
                </Col>
                <Col span={4}>
                    <p>Privacy policy  Help & Support</p>
                </Col>
            </Row>


            <Row className='mobile-Design' style={{ backgroundColor: 'black', padding: 10 }}>
                <Col span={24}>
                    <p style={{ textAlign: 'center' }}>All Right Reserved <b>2022-2023</b></p>
                </Col>
                <Col span={24}>
                    <p style={{ textAlign: 'center' }}>Privacy policy  Help & Support</p>
                </Col>
            </Row>


        </footer >
    )
}
export default FooterComponent