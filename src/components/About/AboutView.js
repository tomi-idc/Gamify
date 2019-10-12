import React from 'react'
import {observer} from 'mobx-react'
import '../../css/style.css';
import BaseView from '../BaseView';


@observer
class AboutView extends BaseView {

    getContent() {
        return (
            <div className={'aboutScreen'}>
                <p className={'abouttext'}>Gamify was founded by Ido and Tomer as<br/>part of the Web-Application
                Development<br/>Course at IDC Herzliya taught<br/>by Mr. Ohad Assulin. <br/><br/> We hope our work will help you
                    in<br/>your journey of searching for your next<br/> gaming adventure, and of course with<br/> a reachable price. <br/><br/>
                    We thank you for using our services <br/> for your game provider and <br/>wish to see you again soon!<br/><br/><br/>
                    All rights reserved &copy;Gamify
                </p>
            </div>
        )
    }
}

export default AboutView;