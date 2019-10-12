import React from 'react'
import '../../css/style.css';
import BaseView from '../BaseView';
import NotFoundPic from '../../css/NotFound404.PNG'

class NotFoundView extends BaseView {

    getContent() {
        return (
            <div className={'border'}>
                <div ><p className={'listTitle'}>
                    <br/> ~ Knock. Knock.
                    <br/> ~ Who's there?!
                    <br/> ~ A 404 (page-not-found) error sent in despair... </p></div>
                    <img className='notFound' src={NotFoundPic} alt={'not_found_404'}/>
            </div>
        )
    }
}

export default NotFoundView