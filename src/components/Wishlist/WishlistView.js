import React from "react";
import { observer } from 'mobx-react'
import '../../css/style.css';
import { CartButton, Cross, Minus, Plus, SubmitButton, XButton } from "../Accessories";
import BaseView from "../BaseView";

@observer
class WishlistView extends BaseView {

    constructor(props) {
        super(props);
    }

    getContent() {
        const { viewModel } = this.props;

        let renderDiv = <div><br/><br/><p className={'listTitle'}>
            No items were found in your wishlist.
        </p></div>

        const items = viewModel.getArray()
        if (items.length !== 0) {
            renderDiv =
                <div>
                    <p className={'listTitle'}> Your Wishlist: </p>
                    <table className={'checkoutTable'}>
                        <tbody>
                            <tr className={'checkoutTrTop'}>
                                <th className={'checkoutTh'}>Cover</th>
                                <th className={'checkoutTh'}>Name</th>
                                <th className={'checkoutTh'}>Price</th>
                                <th className={'checkoutTh'}> Remove </th>
                            </tr>
                            {
                                items.map((item) => (
                                    <tr key={item.src} className={'checkoutTrBottom'}>
                                        <td className={'checkoutTd'}><img className="smallImg" src={item.src}
                                            alt={item.name} onClick={() => viewModel.viewProduct(item)} /></td>
                                        <td className={'checkoutTd'}>{item.name}</td>
                                        <td className={'checkoutTd'}>{(item.price).toFixed(2)}$</td>
                                        <td><XButton title={<Cross />} onClick={() => viewModel.removeItem(item)} /></td>
                                    </tr>
                                ))
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
        }

        return (
            <div className={'container'}>
                {renderDiv}
            </div>
        )
    }
}


export default WishlistView