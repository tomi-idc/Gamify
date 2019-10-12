import React from 'react';
import '../css/bootstrap.css';
import '../css/style.css';
import Gamify from '../css/logo.png';
import Favicon from '../css/favicon.png'
import sideLogo from '../css/sideLogo.png';
import Cart from '../css/cart.png'
import CrossfadeImage from 'react-crossfade-image';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { withRouter } from 'react-router-dom';

export class SubmitButton extends React.Component {
    render() {
        const { title, onClick } = this.props;

        return <button className={'submitButton'} onClick={onClick}>
            {title}
        </button>;
    }
}

export class LinkButton extends React.Component {
    render() {
        const { title, onClick } = this.props;

        return <button className={'linkButton'} onClick={onClick}>
            {title}
        </button>;
    }
}

export class Input extends React.Component {
    render() {
        const { value, type, placeholder, onChange } = this.props;

        return <input className={'input'} value={value} type={type} placeholder={placeholder} onChange={onChange} />;
    }
}

export class Logo extends React.Component {
    render() {
        return <img className={'logo'} src={Gamify} alt={'Gamify'} />;
    }
}

export class SideLogo extends React.Component {
    render() {
        return <img className={sideLogo} src={Favicon} alt={'Gamify'} />
    }
}

export class Message extends React.Component {
    render() {
        const { message } = this.props;
        if (message === '') {
            return <label className={'un-message'}>.</label>
        } else {
            return <label className={'message'}> {message} </label>;
        }
    }
}

export class SlideImg extends React.Component {
    render() {
        const { src, alt, name, price, onClick } = this.props;

        return <div>
            <div className={'img'} onClick={onClick}>
                <CrossfadeImage style={{
                    width: '200px', height: '300px', 'borderRadius': '4px',
                    'boxShadow': '0 6px 20px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.15)',
                    delay: '1000'
                }} src={src} alt={alt} />
            </div>
            <div className={'slideWrapper'}>
                <br /><a className={'name'}>{name}</a>
                <br /><span className={'price'}>{parseFloat(price).toFixed(2)}$</span>
            </div>
        </div>

    }
}

export class SlideRow extends React.Component {
    render() {
        const { src, onClick, alt, current, first, last } = this.props;

        if (first) {
            if (current) {
                return <div className="column">
                    <img className={'current_demo_first'} src={src}
                        onClick={onClick} alt={alt} />
                </div>
            } else {
                return <div className="column">
                    <img className={'demo_first'} src={src}
                        onClick={onClick} alt={alt} />
                </div>
            }
        }

        if (last) {
            if (current) {
                return <div className="column">
                    <img className={'current_demo_last'} src={src}
                        onClick={onClick} alt={alt} />
                </div>
            } else {
                return <div className="column">
                    <img className={'demo_last'} src={src}
                        onClick={onClick} alt={alt} />
                </div>
            }
        }

        if (current) {
            return <div className="column">
                <img className={'current_demo'} src={src}
                    onClick={onClick} alt={alt} />
            </div>
        } else {
            return <div className="column">
                <img className={'demo'} src={src}
                    onClick={onClick} alt={alt} />
            </div>
        }
    }
}

export class NavLink extends React.Component {
    render() {
        const { title } = this.props;

        return (
            <button className={'slideButton'}>
                {title}
            </button>
        )
    }
}

export class Bar extends React.Component {
    render() {
        return (
            <div className={'bar'}>
            </div>
        )
    }
}

export class Search extends React.Component {
    render() {
        const { placeholder, onChange } = this.props;

        return <input className={'search'} placeholder={placeholder} onChange={onChange} />;
    }
}

class NavigationBar extends React.Component {

    state = {
        text: ""
    }

    render() {
        const { email, cartItemsCount, showActivities, logOut, history } = this.props;

        let cartCount = ""
        if (cartItemsCount > 0) {
            cartCount = '(' + cartItemsCount + ')'
        }
        let activitiesLink = <div/>
        if(showActivities) {
            activitiesLink = <NavDropdown.Item href='/activities'>Activities</NavDropdown.Item>
        }
        return <Navbar bg="light" variant="light"
            style={{ fontSize: '16px', letterSpacing: '1.5px', wordSpacing: '3px', width: '100%' }}>
            <Navbar.Brand href="/" style={{ color: '#16D7B5' }}><SideLogo /></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/action">Action</Nav.Link>
                <Nav.Link href="/adventure">Adventure</Nav.Link>
                <Nav.Link href="/combat">Combat</Nav.Link>
                <Nav.Link href="/sports">Sports</Nav.Link>
                <Nav.Link href="/strategy">Strategy</Nav.Link>
                <Nav.Link href="/other">Other</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" onChange={(e) => this.setState({ text: e.target.value })}
                    placeholder="Search Games" className="mr-sm-2" />
                <Button variant="outline-primary"
                    onClick={() => {
                        if (this.state.text !== "") {
                            history.push('/search/' + encodeURIComponent(this.state.text))
                        }
                    }
                    }>Search</Button>
                <Nav className="mr-auto">
                    <Nav.Link href="/cart">{cartCount}<CartImg /></Nav.Link>
                </Nav>
                <NavDropdown title={email} id="basic-nav-dropdown">
                    <NavDropdown.Item href='/wishlist'>Wishlist</NavDropdown.Item>
                    <NavDropdown.Item href='/password'>Settings</NavDropdown.Item>
                    {activitiesLink}
                    <NavDropdown.Item href='/about'>About</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                </NavDropdown>
            </Form>
        </Navbar>

    }
}

export default withRouter(NavigationBar)

export class CartImg extends React.Component {
    render() {
        return <img className='cart' src={Cart} alt={'Cart'} />;
    }
}

export class CategoryUnit extends React.Component {
    render() {
        const { name, src, price, onClick } = this.props;
        return (
            <div className={'categoryRow'} onClick={onClick}>
                <div className="categoryColumn">
                    <img className={'smallImg'} src={src} alt={name} />
                </div>
                <div className="categoryColumn">
                    <span className={'name'}>{name}</span>
                </div>
                <div className="categoryColumn">
                    <span className={'priceProduct'}>{parseFloat(price).toFixed(2)}$</span>
                </div>
            </div>
        )
    }
}

export class ProductImg extends React.Component {
    render() {
        const { src, alt, name, desc, price, onClick, publisher } = this.props;

        return <div onClick={onClick}>
            <p className={'nameProduct'}>{name}</p>
            <div className={'img'}>
                <img className={'productImg'} src={src} onClick={onClick} alt={alt} />
            </div>
            <div className={'slideWrapper'}>
                <br /><span className={'descProduct'}>{desc}</span>
                <br /><span className={'desc'}>{publisher}</span>
                <br /><span className={'priceProduct'}>{parseFloat(price).toFixed(2)}$</span>
            </div>
        </div>

    }
}

export class XButton extends React.Component {
    render() {
        const { title, onClick } = this.props;

        return <button className={'xButton'} onClick={onClick}>
            {title}
        </button>;
    }
}

export class Plus extends React.Component {
    render() {
        return (
            <span className="plus">&#8896;</span>
        )
    }
}

export class Minus extends React.Component {
    render() {
        return (
            <span className="plus">&#8897;</span>
        )
    }
}

export class Cross extends React.Component {
    render() {
        return (
            <span className="plus">&#9747;</span>
        )
    }
}

export class CartButton extends React.Component {
    render() {
        const { title, onClick } = this.props;

        return <button className={'cartButton'} onClick={onClick}>
            {title}
        </button>;
    }
}

export class CheckButton extends React.Component {
    render() {
        const { title, onClick } = this.props;
        return (
            <div className={'border'}>
                <div className="custom-control custom-checkbox">
                    <input type={'checkbox'} className="custom-control-input" id="defaultUnchecked"
                        value={'remember_me'} onClick={onClick} />
                    <label className="custom-control-label" htmlFor="defaultUnchecked">Remember Me</label>

                </div>
            </div>)
    }
}