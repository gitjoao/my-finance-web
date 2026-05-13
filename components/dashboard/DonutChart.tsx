"use client";

import { currencyFormatter } from "@/app/utils/currency";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type ExpenseByCategory = {
  category: string;
  amount: number;
};

type Props = {
  data: ExpenseByCategory[];
};

const COLORS = [
  "#00c0ef",
  "#00a65a",
  "#f39c12",
  "#dd4b39",
  "#605ca8",
  "#39cccc",
  "#ff851b",
  "#d81b60",
];

export default function ExpensesDonutChart({ data }: Props) {
  return (
    <div className="col-md-6">
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">Gastos por Categoria</h3>
        </div>

        <div className="box-body">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                label={({ percent }) => `${(percent! * 100).toFixed(0)}%`}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => {
                  const amount = Number(value ?? 0);

                  const total = data.reduce(
                    (acc, item) => acc + item.amount,
                    0,
                  );

                  const percentage = ((amount / total) * 100).toFixed(1);

                  return [
                    `${currencyFormatter.format(amount)} (${percentage}%)`,
                    name,
                  ];
                }}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
