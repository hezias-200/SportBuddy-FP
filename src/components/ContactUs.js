import title from '../../src/title.png'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const ContactUs = ({auth}) => {
    if (!auth) return <Redirect to='/' />
    return (
        <div className='container' style={{ marginTop: "6%", direction: 'rtl' }}  >
            <div className="card" style={{ margin: 'auto', height: '470px' }}>
                <img src={title} class="card-img-top" alt="contactImage" />
                <div class="card-body">
                    <p class="card-text" style={{ color: 'white' }}>צור קשר
                        שירות הלקוחות של SportBuddies פעיל בין הימים א עד ה בין השעות 09:00 עד 16:00
                        ניתן להשיג אותנו  בטלפון: 03-3769663 או בדואר אלקטרוני: contactus@sportbuddies.co.il.
                        אנחנו כאן, בכל שאלה ועניין</p>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth.uid,
    }
}
export default
    connect(mapStateToProps)(ContactUs)
