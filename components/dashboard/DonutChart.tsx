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
  color: string;
};

type Props = {
  data: ExpenseByCategory[];
};

export default function ExpensesDonutChart({ data }: Props) {
  const total = data.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="col-md-6">
      <div className="box box-primary">
        <div className="box-header with-border">
          <h3 className="box-title">Gastos por Categoria</h3>
        </div>

        <div className="box-body">
          {data.length === 0 || total === 0 ? (
            <p style={{ textAlign: "center", margin: "40px 0" }}>
              Nenhum gasto neste período.
            </p>
          ) : (
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius="45%"
                    outerRadius="70%"
                    paddingAngle={2}
                    label={({ percent }) =>
                      percent! >= 0.01 ? `${(percent! * 100).toFixed(0)}%` : ""
                    }
                  >
                    {data.map((category) => (
                      <Cell key={category.category} fill={category.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => {
                      const amount = Number(value ?? 0);
                      const percentage = ((amount / total) * 100).toFixed(1);
                      return [
                        `${currencyFormatter.format(amount)} (${percentage}%)`,
                        name,
                      ];
                    }}
                  />

                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
