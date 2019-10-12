import React from "react";
import { observer } from 'mobx-react'
import '../../css/style.css';
import { CartButton, Cross, Minus, Plus, SubmitButton, XButton } from "../Accessories";
import BaseView from "../BaseView";

@observer
class CartView extends BaseView {

    constructor(props) {
        super(props);
    }

    getContent() {
        const { viewModel } = this.props;

        let renderDiv = <div><br/><br/><p className={'listTitle'}>
            No items were found in your cart.
        </p></div>

        const cartItems = viewModel.getCartItems()
        if (cartItems.length !== 0) {
            renderDiv =
                <div>
                    <p className={'listTitle'}> Your Cart: </p>
                    <table className={'checkoutTable'}>
                        <tbody>
                            <tr className={'checkoutTrTop'}>
                                <th className={'checkoutTh'}>Item</th>
                                <th className={'checkoutTh'}>Name</th>
                                <th className={'checkoutTh'}>Price</th>
                                <th className={'checkoutTh'}>Quantity</th>
                                <th className={'checkoutTh'}> Add </th>
                                <th className={'checkoutTh'}> Reduce</th>
                                <th className={'checkoutTh'}> Remove </th>
                            </tr>
                            {
                            cartItems.map((item) => (
                                <tr key={item.src} className={'checkoutTrBottom'}>
                                    <td className={'checkoutTd'}><img className="smallImg" src={item.src}
                                        alt={item.name} onClick={() => viewModel.viewCurrentProduct()} /></td>
                                    <td className={'checkoutTd'}>{item.name}</td>
                                    <td className={'checkoutTd'}>{(item.price * item.quantity).toFixed(2)}$</td>
                                    <td className={'checkoutTd'}>{item.quantity}</td>
                                    <td className={'checkoutTd'}><CartButton title={<Plus />} onClick={() => viewModel.increaseQuantity(item)} /></td>
                                    <td><CartButton title={<Minus />} onClick={() => viewModel.decreaseQuantity(item)} /></td>
                                    <td><XButton title={<Cross />} onClick={() => viewModel.removeItem(item)} /></td>
                                </tr>
                            ))
                            }
                            <tr>
                                <td className={'checkoutTdEnd'}> </td>
                                <td className={'checkoutTdEnd'}>Total:</td>
                                <td className={'checkoutTdEnd'}>{viewModel.getTotalBill().toFixed(2)}$</td>
                                <td className={'checkoutTdEnd'}>{viewModel.getTotalItems()}</td>
                                <td className={'checkoutTdEnd'}> </td>
                                <td className={'checkoutTdEnd'}> </td>
                                <td className={'checkoutTdEnd'}> </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <SubmitButton title="Buy Now" onClick={() => viewModel.updateCart()} />
                </div>
        }

        return (
            <div className={'container'}>
                {renderDiv}
            </div>
        )
    }
}


export default CartView