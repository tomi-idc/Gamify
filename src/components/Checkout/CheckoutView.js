import React from "react";
import {observer} from 'mobx-react'
import '../../css/style.css';
import {Input, Message, CartButton, Cross, Minus, Plus, SubmitButton, XButton} from "../Accessories";
import BaseView from "../BaseView";

@observer
class CheckoutView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            typed: false,
            street: '',
            city: '',
            country: '',
            zipcode: ''
        }
    }

    placeOrder() {
        let infoIsProper = (this.state.street !== '') && (this.state.city !== '') && (this.state.country !== '')
            && (this.state.zipcode !== '');

        if (infoIsProper) {
            let confirm = window.confirm('Are you sure you want to place this order?');
            if (confirm) {
                window.alert('Order is processed to:\n'
                    + this.state.street + ' ' + this.state.city + ', ' + this.state.country + ',  '
                    + this.state.zipcode
                    + '.\nThank you for you business!');
            }
            else{
                return;
            }
        }
        this.props.viewModel.buyProducts(this.state);
    }

    getContent() {
        const {viewModel} = this.props;
        const items = viewModel.getCartItems()

        let renderDiv = <div><br/><br/><p className={'listTitle'}>No items were found in your cart.</p></div>
        if (items.length !== 0) {
            renderDiv =
                <div className={'container'}><br/>
                    <span className={'listTitle'}>Checkout:</span><br/>
                    <span className={'nameProduct'}>Regarding: {viewModel.getEmail()}</span><br/><br/>
                    <span className={'categoryList'}>Fill out your shipment details:</span>
                    <div id={'formInput'}>
                        <Message message={viewModel.getMessage()}/> <br/>
                        <Input value={this.state.street} type={'text'} placeholder={'Street + Number'}
                               onChange={(e) => this.setState({street: e.target.value})}/> <br/>
                        <Input value={this.state.city} type={'text'} placeholder={'City'}
                               onChange={(e) => this.setState({city: e.target.value})}/> <br/>
                        <Input value={this.state.country} type={'text'} placeholder={'Country'}
                               onChange={(e) => this.setState({country: e.target.value})}/> <br/>
                        <Input value={this.state.zipcode} type={'number'} placeholder={'Zip code'}
                               onChange={(e) => this.setState({zipcode: e.target.value})}/> <br/>
                    </div>
                    <br/><br/>
                    <span className={'listTitle'}>Order overview:</span><br/><br/>
                    <table className={'checkoutTable'}>
                        <tbody>
                        <tr className={'checkoutTrTop'}>
                            <th className={'checkoutTh'}>Item</th>
                            <th className={'checkoutTh'}>Name</th>
                            <th className={'checkoutTh'}>Price</th>
                            <th className={'checkoutTh'}>Quantity</th>
                        </tr>
                        {
                            items.map((item) => (
                                <tr key={item.src} className={'checkoutTrBottom'}>
                                    <td className={'checkoutTd'}><img className="smallImg" src={item.src}
                                                                      alt={item.name} onClick={() => {
                                    }}/></td>
                                    <td className={'checkoutTd'}>{item.name}</td>
                                    <td className={'checkoutTd'}>{(item.price * item.quantity).toFixed(2)}$</td>
                                    <td className={'checkoutTd'}>{item.quantity}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td className={'checkoutTdEnd'}></td>
                            <td className={'checkoutTdEnd'}>Total:</td>
                            <td className={'checkoutTdEnd'}>{viewModel.getTotalBill().toFixed(2)}$</td>
                            <td className={'checkoutTdEnd'}>{viewModel.getTotalItems()}</td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <SubmitButton title="Place your Order" onClick={() => this.placeOrder()}/>
                </div>
        }
        return (
            <div>
                {renderDiv}
            </div>
        )
    }
}


export default CheckoutView