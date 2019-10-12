import React from 'react'
import {observer} from 'mobx-react'
import '../../css/style.css';
import {CategoryUnit} from '../Accessories.js';
import BaseView from '../BaseView';


@observer
class BaseCategoryView extends BaseView {

    constructor(props) {
        super(props);
    }

    getContent() {
        const {viewModel} = this.props;
        const category = viewModel.getCategory();
        let title = <p className={'listTitle'}>Search Results</p>
        if (category != null) {
            title = <p className={'listTitle'}>{category + ' Games'}</p>
        }
        let itemsArr = <br/>;
        if (viewModel.getArray() !== undefined) {
            itemsArr = viewModel.getArray().map((item) => (
                <CategoryUnit key={item.src} name={item.name} src={item.src}
                              price={item.price} onClick={() => viewModel.viewProduct(item)}/>
            ))
        }
        if (itemsArr.length === 0) {
            return (<div>
                <div className={'list'}>
                    {title}
                </div>
                No results found.
            </div>);
        }
        return (
            <div className={'list'}>
                {title}
                <div className={'categoryHead'}>
                    <div className="categoryColumn">
                        <span className={'categoryList'}>Cover</span>
                    </div>
                    <div className="categoryColumn">
                        <span className={'categoryList'}>Name</span>
                    </div>
                    <div className="categoryColumn">
                        <span className={'categoryList'}>Price</span>
                    </div>
                </div>
                {itemsArr}
            </div>
        )
    }
}

export default BaseCategoryView