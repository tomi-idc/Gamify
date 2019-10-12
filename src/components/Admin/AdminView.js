import React from "react";
import { observer } from 'mobx-react'
import '../../css/style.css';
import FormControl from "react-bootstrap/FormControl";
import BaseView from "../BaseView";
import {Bar} from '../Accessories';

@observer
class AdminView extends BaseView {

    constructor(props) {
        super(props);
    }

    getContent() {
        const { viewModel } = this.props;


        const items = viewModel.getItems()
        let renderDiv =
            <div>
                <table className={'checkoutTable'}>
                    <tbody>
                        <tr className={'checkoutTrTop'}>
                            <th className={'checkoutTh'}>User ID</th>
                            <th className={'checkoutTh'}>Action</th>
                            <th className={'checkoutTh'}>Game ID</th>
                            <th className={'checkoutTh'}>Time</th>
                        </tr>
                        {
                            items.map(item =>
                                <tr key={item.id} className={'checkoutTrBottom'}>
                                    <td className={'checkoutTd'}>{item.email}</td>
                                    <td className={'checkoutTd'}>{viewModel.getDescription(item)}</td>
                                    <td className={'checkoutTd'}>{item.game}</td>
                                    <td className={'checkoutTd'}>{item.date}</td>
                                </tr>
                            )
                        }
                        <tr>
                            <td className={'checkoutTdEnd'}> </td>
                            <td className={'checkoutTdEnd'}> </td>
                            <td className={'checkoutTdEnd'}> </td>
                            <td className={'checkoutTdEnd'}> </td>
                        </tr>
                    </tbody>
                </table>
                <br />
            </div>

        return (
            <div className={'container'}>
                <div className={'list'}>
                    <p className={'listTitle'}>{'Activities'}</p>
                </div>
                {renderDiv}<br/>
                <div className={'border'}>
                <FormControl style={{width: '30%'}} type="text" onChange={(e) => viewModel.filterByEmail(e.target.value)}
                    placeholder="Filter by Email" className="mr-sm-2" />
                    <br/><br/><br/><Bar/>
                </div>
            </div>
        )
    }
}


export default AdminView