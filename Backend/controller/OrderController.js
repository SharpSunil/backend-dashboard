import { getOrdersService, getOrderByIdService } from "../services/OrderService.js";

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

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message
    });

  }

};