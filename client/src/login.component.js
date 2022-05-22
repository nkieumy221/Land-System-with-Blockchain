import React, { Component } from "react";
import './index.css';
import history from './history';
import { Redirect } from 'react-router-dom';
import getWeb3 from "./getWeb3"
import LandContract from "./artifacts/Land.json"
import { Button } from "reactstrap";
import logo from "./triangle-logo.png";
 
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            role: null,
            redirect: null,
            landInspector: '',
            seller: '',
            buyer: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount = async () => {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        try {
            //Get network provider and web3 instance
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LandContract.networks[networkId];
            const instance = new web3.eth.Contract(
                LandContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            const currentAddress = await web3.currentProvider.selectedAddress;
            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
            var seller = await this.state.LandInstance.methods.isSeller(currentAddress).call();
            console.log(seller);
            this.setState({ seller: seller });
            var buyer = await this.state.LandInstance.methods.isBuyer(currentAddress).call();
            console.log(buyer);
            this.setState({ buyer: buyer });
            var landInspector = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            console.log(landInspector);
            this.setState({ landInspector: landInspector });

        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    handleInputChange(event) {
        this.setState({
            role: event.target.value,
            redirect: "/Register" + event.target.value
            
        });
    }

    submit() {
        this.props.history.push(this.state.redirect);
        window.location.reload(false);
    }

    render() {
        if (this.state.seller || this.state.buyer || this.state.landInspector) {
            return (

                <div className="bodyC" >
                    <div className="img-wrapper">
                        <img src={logo}  alt="" className="logo" />
                        <div className="wine-text-container">
                            <div className="site-title wood-text">The Land</div>
                        </div>
                    </div>
                    <div className="auth-wrapper"  >
                        <div className="auth-inner" style={ {marginBottom: "190px"}}>
                            <h3>Bạn đã đăng ký tài khoản</h3>
                            <Button href="/Seller/SellerDashboard" disabled={!this.state.seller} className="btn-block" style={{margin: "2px", backgroundColor: "peru"}} >Tài khoản Người bán</Button>
                            <br/><Button href="/admin/dashboard" disabled={!this.state.buyer} className="btn-block" style={{margin: "2px", backgroundColor: "peru"}}>Tài khoản Người mua</Button>
                            <br/><Button href="/LI/LIdashboard" disabled={!this.state.landInspector} className="btn-block" style={{margin: "2px", backgroundColor: "peru"}}>Tài khoản Quản trị viên</Button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="bodyC">
                 <a href ="/Help" className="faq" style={{borderRadius: "10%", textDecoration: "none", fontWeight: "bolder"}} >
                 <h3 style={{color: "wheat"}}>Help?</h3>
                                    </a>
                <div className="img-wrapper">
                    <img src={logo} alt="" className="logo" />
                    <div className="wine-text-container">
                        <div className="site-title wood-text">The Land</div>
                    </div>
                </div>
                <div className="auth-wrapper" >
                    <div className="auth-inner"  style={ {marginBottom: "160px"}}>
                        <div>
                            <h4 style={{ letterSpacing: "2px", color: 'black' }}>Hệ thống đất đai điện tử đầu tiên tại Việt Nam</h4>
                            <hr
                                style={{
                                    color: "#696969",
                                    height: 1
                                }}
                            />

                            <div className="form-group" style={{ color: "black" }}>
                                <p>Bạn cần đăng nhập Metamask để truy cập hệ thống</p>
                                <label className="control-label" htmlFor="Company" style={{ fontSize: "18px", padding: "2px" }}>Bạn muốn trở thành</label>
                                <select id="Company" className="form-control" name="Company" onChange={this.handleInputChange} defaultValue="">
                                    <option value="disabled">Chọn một vai trò ...</option>
                                    <option value="Buyer">Trở thành Người mua</option>
                                    <option value="Seller">Trở thành Người bán</option>
                                </select>
                            </div>

                            <div>
                                <button onClick={() => this.submit()} className="btn btn-primary btn-block" style={{ marginBottom: "10px", marginTop: "10px" }}>Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

