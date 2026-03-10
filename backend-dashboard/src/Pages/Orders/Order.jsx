import React, { useState, useEffect } from "react";
import { Card, Table, Tag, Select, Input, Button, Timeline, message } from "antd";
import Main_pan from "../../componants/main-panel/main_pan";
import Header from "../../componants/header/Header";
import "./order.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const { TextArea } = Input;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Order = (props) => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [note, setNote] = useState("");
  const [statusActive, setStatusActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // table columns
  const itemsColumns = [
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
  ];

  // fetch order
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/orders/${id}`);

        setOrder(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [id]);

  // role check
  useEffect(() => {
    if (user?.role === "admin") {
      setStatusActive(true);
    }
  }, []);

  // update order status
  const handleOrderStatus = async (value) => {
    try {
      if (!value) {
        message.error("Status cannot be empty");
        return;
      }

      await axios.patch(`${API_BASE_URL}/admin/orders/${id}/order-status`, {
        order_status: value,
      });

      setOrder((prev) => ({
        ...prev,
        orderStatus: value,
      }));

      message.success("Order status updated");
    } catch (error) {
      console.log(error);
    }
  };

  // update payment status
  const handlePaymentStatus = async (value) => {
    try {
      if (!value) {
        message.error("Status cannot be empty");
        return;
      }

      await axios.patch(`${API_BASE_URL}/admin/orders/${id}/payment-status`, {
        payment_status: value,
      });

      setOrder((prev) => ({
        ...prev,
        paymentStatus: value,
      }));

      message.success("Payment status updated");
    } catch (error) {
      console.log(error);
    }
  };

  // save note API
  const handleSaveNote = async () => {
    try {
      if (!note) {
        message.error("Note cannot be empty");
        return;
      }

      await axios.post(`${API_BASE_URL}/admin/orders/${id}/notes`, {
        note: note,
      });

      message.success("Note added successfully");

      setNote("");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div style={{ padding: 40 }}>Loading Order...</div>;
  }

  return (
    <Main_pan active={props.active} setActive={props.setActive}>
      <Header />

      <div className="order-details">

        <h1 className="order-id">
          Order ID - <span>{order?.orderId}</span>
        </h1>

        {/* Order Information */}
        <Card title="Order Information" className="ord-information">

          <p><b>Customer:</b> {order?.customer?.name}</p>
          <p><b>Email:</b> {order?.customer?.email}</p>
          <p><b>Phone:</b> {order?.customer?.phone}</p>
          <p><b>Amount:</b> ₹{order?.amount}</p>
          <p>
            <b>Date:</b>{" "}
            {order?.createdAt &&
              new Date(order.createdAt).toLocaleDateString()}
          </p>

        </Card>

        {/* Ordered Items */}
        <Card title="Ordered Items" style={{ marginBottom: 20 }}>

          <Table
            columns={itemsColumns}
            dataSource={order?.items}
            rowKey="_id"
            pagination={false}
          />

        </Card>

        {/* Payment Information */}
        <Card title="Payment Information" className="pay-information">

          <p><b>Payment Method:</b> {order?.paymentMethod}</p>

          <p>
            <b>Payment Status:</b>{" "}
            <Tag color="green">{order?.paymentStatus}</Tag>
          </p>

        </Card>

        {/* Update Status */}
        {statusActive && (
          <Card title="Update Order Status" className="ord-status">

            <div className="ord-child">

              <p>Order Status</p>

              <Select
                value={order?.orderStatus}
                style={{ width: 200 }}
                onChange={(value) => handleOrderStatus(value)}
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "confirmed", label: "Confirmed" },
                  { value: "shipped", label: "Shipped" },
                  { value: "delivered", label: "Delivered" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
              />

            </div>

            <div>

              <p>Payment Status</p>

              <Select
                value={order?.paymentStatus}
                style={{ width: 200 }}
                onChange={(value) => handlePaymentStatus(value)}
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "captured", label: "Captured" },
                  { value: "paid", label: "Paid" },
                  { value: "failed", label: "Failed" },
                  { value: "refunded", label: "Refunded" },
                ]}
              />

            </div>

          </Card>
        )}

        {/* Internal Notes */}
        {statusActive && (
          <Card title="Internal Notes" style={{ marginBottom: 20 }}>

            <TextArea
              rows={4}
              placeholder="Add admin note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <Button
              type="primary"
              style={{ marginTop: 10 }}
              onClick={handleSaveNote}
            >
              Save Note
            </Button>

          </Card>
        )}

        {/* Activity Log */}
        {/* <Card title="Activity Log">

          <Timeline
            items={[
              { children: "Order created - 07 Mar 10:30 AM" },
              { children: "Payment received - 07 Mar 10:35 AM" },
              { children: "Order status updated to Processing - 07 Mar 11:00 AM" },
            ]}
          />

        </Card> */}

      </div>
    </Main_pan>
  );
};

export default Order;