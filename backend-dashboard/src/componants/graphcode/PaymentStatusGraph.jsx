import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from "recharts";

import "./paymentstatus.scss";

const paymentData = [
    { status: "Pending", value: 6 },
    { status: "Paid", value: 28 },
    { status: "Failed", value: 2 },
    { status: "Refunded", value: 3 },
];

const COLORS = ["#faad14", "#52c41a", "#ff4d4f", "#1890ff"];

const PaymentStatusGraph = () => {
    return (
        <>
            <h3>Payment Status</h3>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={paymentData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="status" />
                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="value">
                        {paymentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default PaymentStatusGraph;