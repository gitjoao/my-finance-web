import Link from "next/link";
import { currencyFormatter } from "@/app/utils/currency";
import { ReportData } from "@/app/reports/page";
import { formatMonth } from "@/app/utils/date";

function Variation({
  current,
  previous,
}: {
  current: number;
  previous: number | null;
}) {
  if (previous === null) return null;

  if (previous === 0) {
    return current > 0 ? <span className="var var-new">novo</span> : null;
  }

  const pct = ((current - previous) / previous) * 100;
  const rounded = Math.round(Math.abs(pct));
  const cls = rounded === 0 ? "var-flat" : pct > 0 ? "var-up" : "var-down";
  const arrow = rounded === 0 ? "=" : pct > 0 ? "↑" : "↓";

  return (
    <span className={`var ${cls}`}>
      {arrow} {rounded}%
    </span>
  );
}

function monthLink(categoryId: string, month: string) {
  const [year, m] = month.split("-");
  return `/transactions?categoryId=${categoryId}&month=${Number(m)}&year=${year}`;
}

export default function CategoryComparisonTable({
  data,
}: {
  data: ReportData[];
}) {
  if (data.length === 0) {
    return (
      <div className="box box-primary">
        <div className="box-body" style={{ textAlign: "center", padding: 40 }}>
          Nenhum dado neste período.
        </div>
      </div>
    );
  }

  const months = Array.from(
    new Set(data.flatMap((item) => Object.keys(item.months))),
  ).sort();

  const rows = [...data].sort((a, b) => b.total - a.total);

  const monthTotals = months.map((m) =>
    data.reduce((acc, item) => acc + (item.months[m] ?? 0), 0),
  );
  const grandTotal = data.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="box box-primary">
      <div className="box-header">
        <h3 className="box-title">Comparativo por Categoria</h3>
      </div>

      <div className="box-body no-padding report-scroll">
        <table className="table table-bordered report-table">
          <thead>
            <tr>
              <th className="sticky-col">Categoria</th>
              {months.map((month) => (
                <th key={month}>{formatMonth(month)}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item) => (
              <tr key={item.category}>
                <td className="sticky-col">
                  <span
                    className="cat-pill"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.category}
                  </span>
                </td>

                {months.map((month, index) => {
                  const current = item.months[month] ?? 0;
                  const previous =
                    index > 0 ? (item.months[months[index - 1]] ?? 0) : null;
                  const amount = currencyFormatter.format(current);

                  return (
                    <td key={month}>
                      {item.categoryId && current > 0 ? (
                        <Link
                          href={monthLink(item.categoryId, month)}
                          className="amount-link"
                        >
                          {amount}
                        </Link>
                      ) : (
                        <span>{amount}</span>
                      )}
                      <Variation current={current} previous={previous} />
                    </td>
                  );
                })}

                <td>
                  <strong>{currencyFormatter.format(item.total)}</strong>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td className="sticky-col">Total</td>
              {monthTotals.map((total, index) => (
                <td key={months[index]}>
                  {currencyFormatter.format(total)}
                  <Variation
                    current={total}
                    previous={index > 0 ? monthTotals[index - 1] : null}
                  />
                </td>
              ))}
              <td>{currencyFormatter.format(grandTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
