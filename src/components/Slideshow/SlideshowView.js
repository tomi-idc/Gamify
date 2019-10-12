import React from "react";
import {observer} from 'mobx-react'
import '../../css/style.css';
import {Slide, CurrentSlide} from '../Accessories.js';
import {SlideImg, SlideRow, LeftArrow, RightArrow, viewPrice} from "../Accessories";
import BaseView from "../BaseView";
import KeyboardEventHandler from 'react-keyboard-event-handler';

@observer
class SlideshowView extends BaseView {

    constructor(props) {
        super(props);
        this.proceed = setInterval(this.nextIndex, 7000);
    }

    nextIndex = () => {
        this.props.viewModel.nextIndex();
        this.resetInterval()
    };

    prevIndex = () => {
        this.props.viewModel.prevIndex();
        this.resetInterval()

    };

    setIndex = (n) => {
        this.props.viewModel.setIndex(n);
        this.resetInterval()
    };

    resetInterval = () => {
        clearInterval(this.proceed);
        this.proceed = setInterval(this.nextIndex, 7000);
    };

    viewCurrentProduct = () => {
        clearInterval(this.proceed);
        this.props.viewModel.viewCurrentProduct();
    };

    getContent() {
        const {viewModel} = this.props;
        let slideImg = <br/>;
        if (viewModel.getSrc() != null) {
            slideImg = <SlideImg src={viewModel.getSrc()} alt={viewModel.getName()} name={viewModel.getName()}
                                 desc={viewModel.getDesc()} price={viewModel.getPrice()}
                                 onClick={this.viewCurrentProduct}/>
        }
        return (

            <div className={'container'}>
                <KeyboardEventHandler
                    handleKeys={['left', 'right', 'enter']}
                    onKeyEvent={(key, e) => {
                        switch (key) {
                            case 'left':
                                this.prevIndex();
                                break;
                            case 'right':
                                this.nextIndex();
                                break;
                            case 'enter':
                                this.viewCurrentProduct();
                                break;
                        }
                    }}/>

                <p className={'name'}>On Sale Now :</p>
                <div className={'slide'}>
                    {slideImg}
                    <button className={'prev'} onClick={this.prevIndex}> ❮</button>
                    <button className={'next'} onClick={this.nextIndex}> ❯</button>
                </div>
                <div className={'row1'}>
                    {
                        viewModel.getArray().map((n) => (
                            <SlideRow key={viewModel.getNameAt(n)} src={viewModel.getSrcAt(n)}
                                      onClick={() => this.setIndex(n)}
                                      alt={viewModel.getNameAt(n)} current={n === viewModel.getIndex()}
                                      first={n === 0} last={n === (viewModel.getSize() - 1)}/>
                        ))
                    }
                </div>
                <div className={'numbertext'}> {viewModel.getIndex() + 1} / {viewModel.getSize()}</div>
            </div>


        )
    }
}


export default SlideshowView