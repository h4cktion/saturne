import React from 'react';
import './App.css';
import SATURN from './asset/saturn2.png';
import ETH from './asset/ethereum.png';
import axios from 'axios';
import { ethers } from "ethers";

class App extends React.Component {

    constructor() {
      super();
      
      this.state = {
        ethereum : "",
        account : null,
        yourBalance : 0,
        yourStaked : 0.00,
        totalValueLocked: 13819372.24,
        currentBlockNumber : null,
        jars : [
          {name :'pJar 0a', depositToken :'sCRV',apy:'17.36%'},
          {name :'pJar 0b', depositToken :'renBTCCRV',apy:'3.71%'},
          {name :'pJar 0c', depositToken :'3poolCRV',apy:'10.44%'},
          {name :'pJar 0.69a', depositToken :'UNI USDC/ETH',apy:'14.11%'},
          {name :'pJar 0.69c', depositToken :'UNI USDT/ETH',apy:'8.11%'},
        ],
        farms : [
          {name :'Saturne', depositToken :'UNI Saturne/ETH',apy:'98.2%'},
          {name :'pUNIUSDC v2', depositToken :'pUNIUSDC v2',apy:'39.68%'},
          {name :'pUNIUSDT v2', depositToken :'pUNIUSDT v2',apy:'30.48%'},
          {name :'p3CRV', depositToken :'p3CRV',apy:'19.43%'},
        ]
      }

      this.connectWallet = this.connectWallet.bind(this);
    }
    
    componentDidMount(){
      this.init();
      this.getAccount();

  }

  connectWallet(){
    window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // if (typeof window.ethereum !== 'undefined') {
  //   console.log('MetaMask is installed!');
  // }

  async getAccount() {
    let self = this;
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log("accounts : ",accounts)
    console.log("account", account)
    this.setState({ account })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();


     provider.getBlockNumber()
        .then((currentBlockNumber)=>{
       console.log("currentBlockNumber ", currentBlockNumber)
        self.setState({ currentBlockNumber })
     })

      signer.getBalance().then((data)=>{
        let yourBalance =  (parseFloat(data) * 1e-18).toFixed(3) ;
        self.setState({ yourBalance })
      })


      signer.getGasPrice().then((data)=>{
        console.log("signer.getGasPrice() : ",data)
      })
  }

  init(){
    axios
      .get('https://api.coingecko.com/api/v3/simple/price?ids=pickle-finance%2Cethereum%2Cdai%2Cusd-coin%2Ccompound-governance-token%2Ccurve-dao-token%2Ctether%2Cuniswap%2Chavven%2Cnusd%2Cwrapped-bitcoin&vs_currencies=usd')
      .then(response => {
        console.log(response.data)
        this.setState({ ethereum : response.data.ethereum.usd})
    })


    

  }
  
  render(){
    return (
      <div className="App">
        <div className="row">
          <div className="col-1-of-2">
            <img src={SATURN} className='logo'/>
            <h1>Saturne finance</h1>
          </div>
          <div className="col-1-of-2">
            { !this.state.account &&
              <button className="btn" onClick={this.connectWallet}>Connect wallet</button>
            }
            { this.state.account &&
              <div>
                <div className="account" title={this.state.account} >{this.state.account.substring(0,5) + '...' + this.state.account.substring(this.state.account.length-4,this.state.account.length)}</div>
                <a href={"https://etherscan.io/block/" + this.state.currentBlockNumber}><div className="blockNumber" title="This is the current block number. Click to view on Etherscan." >{this.state.currentBlockNumber}</div></a>
              </div>
            }
          </div>
        </div>
        
        <div className="content">
          <div className="row">
            <div className="col-1">
              <h2>The Future of Finance is in space</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-2-of-3">

              <div className="col-1-of-2">
                <div className="cadre">
                  <h3>Your balance</h3>
                  <span className="balance">{this.state.yourBalance} <img src={SATURN} style={{ height : "24px"}}/> = ${(this.state.yourBalance * this.state.ethereum).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="col-1-of-2">
                <div className="cadre litle-margin-left">
                  <h3>Staked</h3>
                  <span className="balance">{this.state.yourStaked.toFixed(2)} <img src={SATURN} style={{ height : "24px"}}/></span>
                </div>
              </div>

              <div className="col-1-of-2">
                <div className="cadre">
                  <h3>Market Cap</h3>
                  <span className="balance">{this.state.yourBalance} <img src={SATURN} style={{ height : "24px"}}/> = ${(this.state.yourBalance * this.state.ethereum).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="col-1-of-2">
                <div className="cadre litle-margin-left">
                  <h3>Total Value Locked</h3>
                  <span className="balance">${this.state.totalValueLocked.toFixed(2)} </span>
                </div>
              </div>

            </div>
            <div className="col-1-of-3">
              <div className="cadre cadre__prices">
                <h3>Prices</h3>
                <ul>
                  <li><img className="moneyIcon" src={ETH}/><span className="name">ETH : </span><span className="price">${this.state.ethereum}</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-1-of-2">
              <div className="cadre cadre__auto-size">
                <h3>Jars</h3>
                <p className="total-locked">Total locked: ${this.state.totalValueLocked.toFixed(2)}</p>
                  <div className="header">
                    <div className="col-1-of-3 ">NAME</div>
                    <div className="col-1-of-3 ">DEPOSIT TOKEN</div>
                    <div className="col-1-of-3 ">APY</div>
                  </div>
                  {this.state.jars.map( jar => {
                    return <div className="jars">
                        <div className="col-1-of-3 ">{jar.name}</div>
                        <div className="col-1-of-3 ">{jar.depositToken}</div>
                        <div className="col-1-of-3 ">{jar.apy}</div>
                    </div>
                  })}
              </div>
            </div>
              
            <div className="col-1-of-2">
              <div className="cadre cadre__auto-size litle-margin-left">
                <h3>Farms (active)</h3>
                <p className="total-locked">Total locked: ${this.state.totalValueLocked.toFixed(2)}</p>
                  <div className="header">
                    <div className="col-1-of-3 ">NAME</div>
                    <div className="col-1-of-3 ">DEPOSIT TOKEN</div>
                    <div className="col-1-of-3 ">APY</div>
                  </div>
                  {this.state.farms.map( jar => {
                    return <div className="jars">
                        <div className="col-1-of-3 ">{jar.name}</div>
                        <div className="col-1-of-3 ">{jar.depositToken}</div>
                        <div className="col-1-of-3 ">{jar.apy}</div>
                    </div>
                  })}
              </div>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-1">
              <ul className="footer__list">
                <li className="footer__list__item">DISORD</li>
                <li className="footer__list__item">TWITTER</li>
                <li className="footer__list__item">TELEGRAM</li>
              </ul>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
