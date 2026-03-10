import React from 'react'
import "./dashboard.scss"

import Header from '../../componants/header/Header'
import { LuShoppingCart } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { MdCurrencyRupee } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import OrderStatusGraph from '../../componants/graphcode/OrderStatusGraph';
import PaymentStatusGraph from '../../componants/graphcode/PaymentStatusGraph';
import Product from '../product/Product';
import Main_pan from '../../componants/main-panel/Mainpan';

const Dashboard = (props) => {
  return (
    <>
      <Main_pan active={props.active} setActive={props.setActive}>
        <Header />
        <div className="dash">
          <h1 className='main-heading'>Dashboard</h1>
          <p className='desc'>Welcome to the Dashboard!</p>
          <div className="main-box">
            <div className="box">
              <div className="text">
                <p className='sub-title'>Users</p>
                <h2 className='titles'>150</h2>
                <p className='sub-desc'>last month increate 10 users</p>
              </div>
              <div className="dash-icon"><CiUser /></div>

            </div>
            <div className="box">
              <div className="text">
                <p className='sub-title'>Total Orders</p>
                <h2 className='titles'>75</h2>
                <p className='sub-desc'>last month increate +10 users</p>
              </div>
              <div className="dash-icon"><LuShoppingCart /></div>
            </div>
            <div className="box">
              <div className="text">
                <p className='sub-title'>Revenue</p>
                <h2 className='titles'>$10,000</h2>
                <p className='sub-desc'>Last Month we increase +1000 revenue</p>
              </div>

              <div className="dash-icon"><MdCurrencyRupee /></div>
            </div>
            <div className="box">
              <div className="text">
                <p className='sub-title'>Feedback</p>
                <h2 className='titles'>20</h2>
                <p className='sub-desc'>last month we collect +20 positive feedback.</p>
              </div>
              <div className="dash-icon"><CiEdit /></div>
            </div>
          </div>
          <div className="second-box">
            <div className="order-table">
              <Product />
            </div>
            <div className="main_graph">
              <div className="graph-box-order-status">

                <OrderStatusGraph />

              </div>
              <div className="graph-box-payment-status">
                <PaymentStatusGraph />
              </div>
            </div>

          </div>




        </div>
      </Main_pan>
    </>
  )
}

export default Dashboard
