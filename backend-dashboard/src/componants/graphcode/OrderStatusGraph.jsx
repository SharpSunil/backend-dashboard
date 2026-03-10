import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./orderstatus.scss"
const orderStatusData = [
  { name: "Processing", value: 12 },
  { name: "Shipped", value: 8 },
  { name: "Delivered", value: 25 },
  { name: "Cancelled", value: 3 },
];

const COLORS = ["#faad14", "#1890ff", "#52c41a", "#ff4d4f"];

const OrderStatusGraph = () => {
  return (
   <>
      <h3>Order Status</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={orderStatusData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {orderStatusData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default OrderStatusGraph;