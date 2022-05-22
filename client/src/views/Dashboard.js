import React, { Component } from 'react';
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import { DrizzleProvider } from '@drizzle/react-plugin';
import { Spinner } from 'react-bootstrap';
import {
  AccountData,
  ContractData,
  ContractForm,
  LoadingContainer
} from "@drizzle/react-components";
import "../index.css";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";


const drizzleOptions = {
  contracts: [Land]
}

var verified;
var row = [];
var rowsIpfs = [];
var indents = [];

class viewImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      LandInstance: undefined,
      account: null,
      web3: null,
      flag: null,
      verified: '',
      registered: '',
      count: 0,
      id: '',
      requested: false,
    };

  }


  requestLand = (seller_address, land_id) => async () => {

    console.log(seller_address)
    console.log(land_id);
    // this.setState({requested: true});
    // requested = true;
    await this.state.LandInstance.methods.requestLand(
      seller_address,
      land_id
    ).send({
      from: this.state.account,
      gas: 2100000
    }).then(response => {
      this.props.history.push("#");
    });

    //Reload
    window.location.reload(false);

  }

  viewImage = (landId) => {
    alert(landId);
    this.props.history.push({
      pathname: '/viewImage',
    })
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

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Land.networks[networkId];
      const instance = new web3.eth.Contract(
        Land.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const currentAddress = await web3.currentProvider.selectedAddress;
      console.log(currentAddress);
      this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
      verified = await this.state.LandInstance.methods.isVerified(currentAddress).call();
      console.log(verified);
      this.setState({ verified: verified });
      var registered = true;
      this.setState({ registered: registered });

      var count = await this.state.LandInstance.methods.getLandsCount().call();
      count = parseInt(count);
      console.log(typeof (count));
      console.log(count);
      //this.setState({count:count});

      var dict = {}
      var count1 = [];
      for (var i = 1; i < count + 1; i++) {
        count1.push(i);
      }

      count1.forEach(async (i) => {
        var address = await this.state.LandInstance.methods.getLandOwner(i).call();
        dict[i] = address;
      })

      var rowsArea = [];
      var rowsCity = [];
      var rowsState = [];
      var rowsSt = [];
      var rowsPrice = [];
      var rowsPID = [];
      var rowsSelected = [];
      var rowsID = [];
      var rowsImg = [];

      for (let i = 1; i < count + 1; i++) {
        rowsID.push(<ContractData contract="Land" method="getIdLand" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsArea.push(<ContractData contract="Land" method="getArea" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsCity.push(<ContractData contract="Land" method="getCity" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsState.push(<ContractData contract="Land" method="getState" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsSt.push(<ContractData contract="Land" method="getStatus" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsPrice.push(<ContractData contract="Land" method="getPrice" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsPID.push(<ContractData contract="Land" method="getPID" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsSelected.push(<ContractData contract="Land" method="isApproved" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
      }
      var data = [];
      for (let i = 0; i < count; i++) {
        data.push(i);
      }


      data.forEach(async (i) => {
        let landImg1 = this.state.LandInstance.methods.getImage(i + 1).call();
        let landImg = await landImg1
        var requested = await this.state.LandInstance.methods.isRequested(i + 1).call();
        console.log(i, requested)
        indents.push(
          <Col xs="6" key={i}>
            <div className="post-module">

              <div className="thumbnail">
                <div className="date">
                  <div className="day">{i + 1}</div>
                </div><img src={`https://ipfs.io/ipfs/${landImg}`} />
              </div>
              <div className="post-content">
                <div className="category">Photos</div>
                <h1 className="sub_title">{rowsCity[i]}, {rowsState[i]}</h1>
                <h2 className="title">{rowsArea[i]} m&sup2;</h2>
                <p className="description">Mã số đất: {rowsPID[i]}</p>
                <div className="post-meta"><span className="timestamp">Giá: {rowsPrice[i]} vnđ</span></div>
                <div className="post-meta">
                  {requested}
                  {!requested
                    ?
                    <Button onClick={this.requestLand(dict[i + 1], i + 1)} className="button-vote">
                      Mua đất
                    </Button>
                    :
                    <b className="">Đang kiểm duyệt </b>
                  }

                </div>
              </div>
            </div>
          </Col>);
      });
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

    if (!this.state.registered || !this.state.verified) {
      return (
        <div className="content">
          <div>
            <Row>
              <Col xs="6">
                <Card>
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
      <>
        <div className="content">
          <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>

              <Row>

                {indents}

              </Row>
            </LoadingContainer>
          </DrizzleProvider>

        </div>
      </>

    );

  }
}

export default viewImage;