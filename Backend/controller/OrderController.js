import { database } from "../db/Database.js";
import {
  getOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  updatePaymentStatusService,
  addOrderNoteService,
  getOrderAuditService
} from "../services/OrderService.js";

/* GET ALL ORDERS */

export const getOrdersController = async (req, res) => {

  try {

    const orders = await getOrdersService(req.query);

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/* GET ORDER BY ID */

export const getOrderByIdController = async (req, res) => {

  try {

    const { id } = req.params;

    const order = await getOrderByIdService(id);

    const orderdata = order

    
   

    const mappedData = orderdata?.items?.map((item)=>({
      name:item?.name,
      price:item?.price,
      quantity : item?.qty,
      total : item?.price * item?.qty
    }));



    const filertaedata = {
      amount : orderdata?.amount,
      createdAt : orderdata?.createdAt,
      currency: orderdata?.currency,
      customer : orderdata?.customer,
      id:orderdata?.id,
      items:mappedData,
      orderId:orderdata?.orderId,
      paymentMethod:orderdata?.paymentMethod,
      orderStatus:orderdata?.orderStatus,
      paymentStatus:orderdata?.paymentStatus
    }

    

    res.status(200).json({
      success: true,
      data: filertaedata
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message
    });

  }

};

// tracking order Status 
export const updateOrderStatusController = async (req, res) => {

  try {

    const { id } = req.params;
    const { order_status } = req.body;

    const result = await updateOrderStatusService(id, order_status);

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: result
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

//tracking payment status 
export const updatePaymentStatusController = async (req, res) => {

  try {

    const { id } = req.params;
    const { payment_status } = req.body;

    const result = await updatePaymentStatusService(id, payment_status);

    res.status(200).json({
      success: true,
      message: "Payment status updated",
      data: result
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



//Order Notes 
export const addOrderNoteController = async (req, res) => {

  try {

    const { id } = req.params;
    const { note } = req.body;

    const result = await addOrderNoteService(id, note);

    res.status(201).json({
      success: true,
      message: "Note added successfully",
      data: result
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

// controllers/OrderController.js


export const getOrderAuditController = async (req, res) => {
  try {
    const { id } = req.params; // order id
    const logs = await getOrderAuditService(id);
    res.status(200).json({
      success: true,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};