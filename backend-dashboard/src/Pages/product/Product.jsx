import React, { useState } from 'react'
import Main_pan from '../../componants/main-panel/main_pan'
import Header from '../../componants/header/Header'
import { Select, DatePicker, Table, Tag, Input } from "antd"
import dayjs from "dayjs"
import "antd/dist/reset.css"
import "./product.scss"
import { Link } from 'react-router-dom'

const { Search } = Input;
const { RangePicker } = DatePicker;

const Product = (props) => {

    const [searchText, setSearchText] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateRange, setDateRange] = useState(null);

    const paymentOptions = [
        { value: "all", label: "All Payments" },
        { value: "pending", label: "Pending" },
        { value: "paid", label: "Paid" },
        { value: "failed", label: "Failed" },
        { value: "refunded", label: "Refunded" },
        { value: "cancelled", label: "Cancelled" },
    ];

    const statusOptions = [
        { value: "all", label: "All Statuses" },
        { value: "processing", label: "Processing" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" },
        { value: "returned", label: "Returned" },
    ];

    const columns = [
        {
            title: "Order ID",
            dataIndex: "orderId",
        },
        {
            title: "Customer",
            dataIndex: "customer",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Payment",
            dataIndex: "payment",
            render: (payment) => (
                <Tag color={payment === "Paid" ? "green" : payment === "Pending" ? "orange" : "red"}>
                    {payment}
                </Tag>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <Tag color="blue">{status}</Tag>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
        },
          {
        title: "Action",
        render: (_, record) => (
            <Link to={`/product/${record.orderId.replace("#","")}`}>
                View
            </Link>
        ),
    },
    ];

    const data = [
        {
            key: "1",
            orderId: "#1021",
            customer: "Rahul Sharma",
            email: "rahul@gmail.com",
            amount: "₹1200",
            payment: "Paid",
            status: "Delivered",
            date: "2026-03-07",
        },
        {
            key: "2",
            orderId: "#1022",
            customer: "Amit Patil",
            email: "amit@gmail.com",
            amount: "₹850",
            payment: "Pending",
            status: "Processing",
            date: "2026-03-06",
        },
        {
            key: "3",
            orderId: "#1023",
            customer: "Sneha Joshi",
            email: "sneha@gmail.com",
            amount: "₹1500",
            payment: "Failed",
            status: "Cancelled",
            date: "2026-03-05",
        },
    ];

    const filteredData = data.filter((item) => {

        const searchMatch =
            item.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email.toLowerCase().includes(searchText.toLowerCase());

        const paymentMatch =
            paymentFilter === "all" ||
            item.payment.toLowerCase() === paymentFilter;

        const statusMatch =
            statusFilter === "all" ||
            item.status.toLowerCase() === statusFilter;

        const dateMatch =
            !dateRange ||
            (
                dayjs(item.date).isAfter(dateRange[0].startOf("day")) &&
                dayjs(item.date).isBefore(dateRange[1].endOf("day"))
            );

        return searchMatch && paymentMatch && statusMatch && dateMatch;
    });

    return (
        <>
            <Main_pan active={props.active} setActive={props.setActive}>
                <Header />

                <div className="product">

                    <h1 className='main-heading'>Orders</h1>
                    <p className='desc'>{filteredData.length} orders Found</p>

                    <div className="main-product-box">

                        <div className="top-box">

                            <Search
                                placeholder="Search order ID or email..."
                                allowClear
                                enterButton
                                style={{ width: 250 }}
                                onSearch={(value) => setSearchText(value)}
                            />

                            <Select
                                defaultValue="all"
                                style={{ width: 180 }}
                                options={paymentOptions}
                                onChange={(value) => setPaymentFilter(value)}
                            />

                            <Select
                                defaultValue="all"
                                style={{ width: 180 }}
                                options={statusOptions}
                                onChange={(value) => setStatusFilter(value)}
                            />

                            <RangePicker
                                style={{ width: 260 }}
                                onChange={(dates) => setDateRange(dates)}
                            />

                        </div>

                        <div className="bottom-box">
                            <Table
                                columns={columns}
                                dataSource={filteredData}
                                pagination={{ pageSize: 5 }}
                            />
                        </div>

                    </div>

                </div>

            </Main_pan>
        </>
    )
}

export default Product