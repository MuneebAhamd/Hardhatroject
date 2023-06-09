import './faq.css';
import FooterComponent from '../Footer/FooterComponent';
import { Col, Row } from 'antd';
import AsideBarComponent from '../AsideBar/AsideBarComponent';

const Faq = () => {


    return (
        <div>
            <AsideBarComponent />

            <Row>
                <Col span={18} push={5}>
                    <div className='FaqsQA'>
                        <div className='mar'>
                            <div className='faqsHeading'>
                                <h1 className='faqsHeading'>
                                    FAQS
                                </h1>
                            </div>

                            <div className='questionAnswers'>
                                <p className='question'>
                                    Q: What is a private blockchain-based file management and verification system?
                                </p>
                                <p className='answer'>
                                    A private blockchain-based file management and verification system is a digital platform that allows users to securely store, manage, and share files using blockchain technology. This system provides users with the ability to verify the authenticity of their files, control access to their files, and ensure that their files remain tamper-proof and unmodified.
                                </p>
                            </div>

                            <div className='questionAnswers'>
                                <p className='question'>
                                    Q: How does this system work?
                                </p>
                                <p className='answer'>
                                    This system uses blockchain technology to create a secure and decentralized network for storing and managing files. When a user uploads a file to the system, it is encrypted and stored on the blockchain, making it tamper-proof and verifiable. Users can control who has access to their files and can verify the authenticity of their files using a unique cryptographic signature.                    </p>
                            </div>

                            <div className='questionAnswers'>
                                <p className='question'>
                                    Q: How secure is this system?
                                </p>
                                <p className='answer'>
                                    This system uses advanced encryption and blockchain technology to ensure that files are stored securely and cannot be tampered with. Additionally, users have control over who has access to their files, and all file access is logged and auditable. Our system is designed to meet the highest security standards, and we work tirelessly to ensure that our platform remains secure and reliable.                    </p>
                            </div>

                            <div className='questionAnswers'>
                                <p className='question'>
                                    Q: What types of files can I store on this system?
                                </p>
                                <p className='answer'>
                                    You can store any type of file on this system, including .pdf, .docx, .xlsx files. Our system is designed to handle files of any size, and you can easily manage and organize your files using our intuitive user interface.                    </p>
                            </div>

                            <div className='questionAnswers'>
                                <p className='question'>
                                    Q: Can I share files with other users?
                                </p>
                                <p className='answer'>
                                    Yes, you can share files with other users on our system. You can control who has access to your files and can grant or revoke access at any time. This makes it easy to collaborate with others and share files securely and efficiently.                    </p>
                            </div>

                            <div className='questionAnswers'>
                                <p className='question'>
                                    Q: How much does this system cost?
                                </p>
                                <p className='answer'>
                                    Our pricing plans vary depending on the size of your organization and your specific needs. We offer a range of pricing options to fit any budget, and our team can work with you to find the best plan for your organization. Contact us to learn more about our pricing and plans.                    </p>
                            </div>

                            <div className='questionAnswers'>
                                <p className='question'>
                                    Q: What kind of customer support do you offer?
                                </p>
                                <p className='answer'>
                                    We offer comprehensive customer support to ensure that our users have the best possible experience with our platform. Our support team is available via email, phone, and live chat to answer any questions and address any issues that may arise. We also provide extensive documentation and resources to help you get the most out of our system.                    </p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <FooterComponent />
        </div>
    );
}

export default Faq;
