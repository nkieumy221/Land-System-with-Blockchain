import React, { Component } from 'react';
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import { Line, Bar } from "react-chartjs-2";
import '../index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { Spinner } from 'react-bootstrap'
import {
    AccountData,
    ContractData,
    ContractForm,
    LoadingContainer
} from "@drizzle/react-components";

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    UncontrolledTooltip,
} from "reactstrap";

import "../card.css";


const drizzleOptions = {
    contracts: [Land]
}


var verified;
var row = [];
var buyerarr = [];
var sellerarr = [];
var reqsarr = [];

class LIDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            verified: '',
        }
    }

    componentDidMount = async () => {
        //For refreshing page only once
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        try {
            //Get network provider and web3 instance
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();

            const currentAddress = await web3.currentProvider.selectedAddress;
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Land.networks[networkId];
            const instance = new web3.eth.Contract(
                Land.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });

            var verified = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            this.setState({ verified: verified });

            sellerarr.push(<ContractData contract="Land" method="getSellersCount" />);
            buyerarr.push(<ContractData contract="Land" method="getBuyersCount" />);
            reqsarr.push(<ContractData contract="Land" method="getRequestsCount" />);


        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };



    render() {
        if (!this.state.web3) {
            return (
                <div>
                    <div>
                        <h1>
                            <Spinner animation="border" variant="primary" />
                        </h1>
                    </div>

                </div>
            );
        }

        if (!this.state.verified) {
            return (
                <div className="content">
                    <div>
                        <Row>
                            <Col xs="6">
                                <Card className="card-chart">
                                    <CardBody>
                                        <h1>
                                            Tài khoản cần được xác minh để xem được nội dung này
                                        </h1>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                </div>
            );
        }

        return (
            <DrizzleProvider options={drizzleOptions}>
                <LoadingContainer>
                    <div className="content">
                        <div className="main-section" style={{ marginLeft: "-10px" }}>
                            <Row>
                                <Col lg="4">
                                    <div className="dashbord dashbord-skyblue" >
                                        <div className="icon-section">
                                            <i className="fa fa-users" aria-hidden="true"></i><br />
                                            <medium>Số lượng Người bán</medium><br />
                                            <p> {buyerarr} </p>
                                            <small style={{ fontSize: "1rem" }}>đăng ký</small>
                                        </div>
                                        <div className="detail-section"><br />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div className="dashbord dashbord-blue" style={{ height: "200px" }}>
                                        <div className="icon-section" style={{ paddingBottom: "32px" }}>
                                            <i className="fa fa-bell" aria-hidden="true"></i><br />
                                            <medium>Yêu cầu giao dịch</medium><br />
                                            <p>{reqsarr}</p>
                                        </div>
                                        <div className="detail-section">
                                            <br />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div className="dashbord dashbord-orange">
                                        <div className="icon-section">
                                            <i className="fa fa-users" aria-hidden="true"></i><br />
                                            <medium>Tổng Người mua</medium><br />
                                            <p>{sellerarr}</p>
                                            <small style={{ fontSize: "1rem" }}>đăng ký</small>
                                        </div>
                                        <div className="detail-section"><br />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <Col lg="4">
                                <Card>
                                    <CardHeader>
                                        <h5 className="title">Thông tin Người bán</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="chart-area">

                                            <Button href="/LI/BuyerInfo" className="btn-fill" color="primary">
                                                Xác minh
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="4">
                                <Card>
                                    <CardHeader>
                                        <h5 className="title">Yêu cầu giao dịch đất</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="chart-area">

                                            <Button href="/LI/TransactionInfo" className="btn-fill" color="primary">
                                                Phê duyệt
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="4">
                                <Card>
                                    <CardHeader>
                                        <h5 className="title">Thông tin Người bán</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="chart-area">

                                            <Button href="/LI/SellerInfo" className="btn-fill" color="primary">
                                                Xác minh
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>


                        </Row>
                    </div>
                </LoadingContainer>
            </DrizzleProvider>
        );

    }
}

export default LIDashboard;
