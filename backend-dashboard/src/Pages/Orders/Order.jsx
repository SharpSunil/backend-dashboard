import React, { useState } from "react";
import { Card, Table, Tag, Select, Input, Button, Timeline } from "antd";
import Main_pan from "../../componants/main-panel/main_pan";
import Header from "../../componants/header/Header";
import "./order.scss"
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const { TextArea } = Input;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Order = (props) => {
const [order, setOrder] = useState();
const { id } = useParams();
    const [orderStatus, setOrderStatus] = useState("Processing");
    const [paymentStatus, setPaymentStatus] = useState("Paid");
    const [note, setNote] = useState("");

    const itemsColumns = [
        {
            title: "Product",
            dataIndex: "product",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Qty",
            dataIndex: "qty",
        },
        {
            title: "Total",
            dataIndex: "total",
        },
    ];

    const itemsData = [
        {
            key: "1",
            product: "Packaging Box",
            price: "₹200",
            qty: 2,
            total: "₹400",
        },
        {
            key: "2",
            product: "Paper Cup",
            price: "₹100",
            qty: 5,
            total: "₹500",
        },
    ];

    //api call
    useEffect(() =>{
        const getorder = async() =>{
            try {
                const res = await axios.get(`${API_BASE_URL}/admin/orders/${id}`);
                console.log(res.data.data, "product data with id wise ;jkdfsjkdsfjklsdfjkljklsdff");
                
            } catch (error) {
                console.log(error);
            }
        }
        getorder();

    }, [id]);

    return (
        <Main_pan active={props.active} setActive={props.setActive}>
            <Header />

            <div className="order-details">

                <h1 className="order-id">Order ID  -  <span>#5058</span></h1>

                {/* Order information --- data for order */}
                <Card title="Order Information" className=" ord-information" >
                    <p><b>Customer:</b> Rahul Sharma</p>
                    <p><b>Email:</b> rahul@gmail.com</p>
                    <p><b>Amount:</b> ₹900</p>
                    <p><b>Date:</b> 07 Mar 2026</p>
                </Card>

                {/* Ordered Items */}
                <Card title="Ordered Items" style={{ marginBottom: 20 }}>
                    <Table
                        columns={itemsColumns}
                        dataSource={itemsData}
                        pagination={false}
                    />
                </Card>

                {/* Payment Info */}
                <Card title="Payment Information" className=" pay-information">
                    <p><b>Payment Method:</b> UPI</p>
                    <p>
                        <b>Payment Status:</b>{" "}
                        <Tag color="green">{paymentStatus}</Tag>
                    </p>
                </Card>

                {/* Update Status */}
                <Card title="Update Order Status" className="ord-status" >

                    <div className="ord-child">
                        <p>Order Status</p>
                        <Select
                            value={orderStatus}
                            style={{ width: 200 }}
                            onChange={(value) => setOrderStatus(value)}
                            options={[
                                { value: "Processing", label: "Processing" },
                                { value: "Shipped", label: "Shipped" },
                                { value: "Delivered", label: "Delivered" },
                                { value: "Cancelled", label: "Cancelled" },
                            ]}
                        />
                    </div>

                    <div>
                        <p>Payment Status</p>
                        <Select
                            value={paymentStatus}
                            style={{ width: 200 }}
                            onChange={(value) => setPaymentStatus(value)}
                            options={[
                                { value: "Pending", label: "Pending" },
                                { value: "Paid", label: "Paid" },
                                { value: "Failed", label: "Failed" },
                                { value: "Refunded", label: "Refunded" },
                            ]}
                        />
                    </div>

                </Card>

                {/* Internal Notes */}
                <Card title="Internal Notes" style={{ marginBottom: 20 }}>
                    <TextArea
                        rows={4}
                        placeholder="Add admin note..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <Button type="primary" style={{ marginTop: 10 }}>
                        Save Note
                    </Button>
                </Card>

                {/* Activity Log */}
                <Card title="Activity Log">
                    <Timeline
                        items={[
                            { children: "Order created - 07 Mar 10:30 AM" },
                            { children: "Payment received - 07 Mar 10:35 AM" },
                            { children: "Order status updated to Processing - 07 Mar 11:00 AM" },
                        ]}
                    />
                </Card>

            </div>
        </Main_pan>
    );
};

export default Order;