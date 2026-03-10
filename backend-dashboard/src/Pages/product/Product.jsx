import React, { useState, useEffect } from "react";

import { Select, DatePicker, Table, Tag, Input } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "antd/dist/reset.css";
import "./product.scss";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

dayjs.extend(isBetween);

const { Search } = Input;
const { RangePicker } = DatePicker;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Product = (props) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState(null);

  const paymentOptions = [
    { value: "all", label: "All Payments" },
    { value: "captured", label: "Captured" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ];

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "confirmed", label: "Confirmed" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
    },
    {
      title: "Customer",
      render: (_, record) => record.customer?.name,
    },
    {
      title: "Email",
      render: (_, record) => record.customer?.email,
    },
    {
      title: "Amount",
      render: (_, record) => `₹${record.amount}`,
    },
    {
      title: "Payment",
      render: (_, record) => (
        <Tag color={record.paymentStatus === "captured" ? "green" : "orange"}>
          {record.paymentStatus}
        </Tag>
      ),
    },
    {
      title: "Status",
      render: (_, record) => (
        <Tag color="blue">
          {record.orderStatus}
        </Tag>
      ),
    },
    {
      title: "Items",
      render: (_, record) => record.items?.length,
    },
    {
      title: "Date",
      render: (_, record) =>
        dayjs(record.createdAt).format("DD MMM YYYY"),
    },
    {
  title: "Action",
  render: (_, record) => (
    <Link to={`/product/${record.id}`}>
      <EditOutlined style={{ fontSize: "18px", color: "#05233e" }} />
    </Link>
  ),
}
  ];

  // API CALL
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        setLoading(true);

        const res = await axios.get(`${API_BASE_URL}/admin/orders`);

        if (res.data.success) {
          setOrders(res.data.data);
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    };

    fetchOrders();

  }, []);

  const filteredData = orders.filter((item) => {

    const searchMatch =
      item.orderId?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.customer?.email?.toLowerCase().includes(searchText.toLowerCase());

    const paymentMatch =
      paymentFilter === "all" ||
      item.paymentStatus?.toLowerCase() === paymentFilter;

    const statusMatch =
      statusFilter === "all" ||
      item.orderStatus?.toLowerCase() === statusFilter;

    const dateMatch =
      !dateRange ||
      dayjs(item.createdAt).isBetween(
        dateRange[0].startOf("day"),
        dateRange[1].endOf("day"),
        null,
        "[]"
      );

    return searchMatch && paymentMatch && statusMatch && dateMatch;

  });

  return (
    <>
      {/* <Main_pan active={props.active} setActive={props.setActive}>
        <Header /> */}

      <div className="product">

        <h1 className="main-heading">Orders</h1>
        <p className="desc">{filteredData.length} Orders Found</p>

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
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 8}}
              scroll={{ x: 900 }}
            />

          </div>

        </div>

      </div>

      {/* </Main_pan> */}
    </>
  );
};

export default Product;