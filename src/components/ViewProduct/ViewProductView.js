import React from "react";
import { observer } from 'mobx-react'
import '../../css/style.css';
import { ProductImg, SlideImg, SubmitButton } from "../Accessories";
import BaseView from "../BaseView";
import NotFoundPic from "../../css/NotFound404.PNG";

@observer
class ViewProductView extends BaseView {

    constructor(props) {
        super(props)
    }

    getContent() {
        const { viewModel } = this.props;

        let productImg = <br />
        if (viewModel.getItem()) {
            productImg = <ProductImg src={viewModel.getItem().src} alt={viewModel.getItem().name} name={viewModel.getItem().name}
                desc={viewModel.getItem().description} price={viewModel.getItem().price} onClick={viewModel.viewCurrentProduct}
                publisher={viewModel.getItem().publisher} />
        }
        let errorMessage = viewModel.getErrorMessage()
        let content =
            <div>
                <div className={'slide'}>
                    {productImg}
                </div>
                <SubmitButton title={"Buy"} onClick={() => viewModel.buyCurrentProduct()} />
                <SubmitButton title={"Add to Cart"} onClick={() => viewModel.addCurrentProductToCart()} />
                <SubmitButton title={"Add to Wishlist"} onClick={() => viewModel.addCurrentProductToWishlist()} />
            </div>
        if (errorMessage != "") {
            content =
                <div><br /><br /><p className={'listTitle'}>
                    The item you requested does not exist.
                    </p><br/><br/><br/><img className='notFound' src={NotFoundPic} alt={'not_found_404'}/></div>
        }
        return (
            <div className={'container'}>
                {content}
            </div>
        )
    }
}


export default ViewProductView