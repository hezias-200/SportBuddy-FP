
import Carousel from 'react-bootstrap/Carousel';
import section1 from '../../src/section1.png'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

const AboutUs = ({auth}) => {
    if (!auth) return <Redirect to='/' />

    return (
        <div>
            <Carousel style={{ marginTop: '5.5%', width: '70%',margin:'auto' }}>
                <Carousel.Item  >
                    <img
                        className="d-block w-100"
                        src="https://i.ytimg.com/vi/18DwnpNB2IM/maxresdefault.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption >
                            <h3>Workout With Your Friends</h3>
                            <p>And Meet New Friends</p>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={section1}
                        alt="First slide"
                    />
                    <Carousel.Caption className='u-align-right u-custom-font u-font-roboto-condensed u-text u-text-body-alt-color u-text-1' >
                        <h3>Make Your Class Today</h3>
                        <p>And Get Paid</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/95fd449ca4995ce28e1202ab/ffgff-min.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Get In Shape</h3>
                        <p>And Try New Sports</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth.uid,
    }
}
export default
    connect(mapStateToProps)(AboutUs)
