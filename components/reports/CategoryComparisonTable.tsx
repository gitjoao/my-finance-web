import { currencyFormatter } from "@/app/utils/currency";
import { ReportData } from "@/app/reports/page";
import { formatMonth } from "@/app/utils/date";

export default function CategoryComparationTable({
  data,
}: {
  data: ReportData[];
}) {
  const months = Array.from(
    new Set(data.flatMap((item) => Object.keys(item.months))),
  ).sort();

  function getVariation(current: number, previous: number) {
    if (previous === 0) return null;

    return ((current - previous) / previous) * 100;
  }

  return (
    <div className="box box-primary">
      <div className="box-header">
        <h3 className="box-title">Comparativo por Categoria</h3>
      </div>

      <div className="box-body table-responsive no-padding">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Categoria</th>

              {months.map((month) => (
                <th key={month}>{formatMonth(month)}</th>
              ))}

              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.category}>
                <td
                  style={{
                    backgroundColor: item.color,
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: 20,
                    display: "inline-block",
                    fontWeight: "bold",
                  }}
                >
                  <strong>{item.category}</strong>
                </td>

                {months.map((month, index) => {
                  const current = item.months[month] ?? 0;

                  const previous =
                    index > 0 ? (item.months[months[index - 1]] ?? 0) : 0;

                  const variation = getVariation(current, previous);

                  return (
                    <td key={month}>
                      <div>{currencyFormatter.format(current)}</div>

                      {variation !== null && (
                        <small
                          style={{
                            color:
                              variation > 0
                                ? "#dd4b39"
                                : variation < 0
                                  ? "#00a65a"
                                  : "#666",
                          }}
                        >
                          {variation > 0 ? "↑" : variation < 0 ? "↓" : "="}{" "}
                          {Math.abs(variation).toFixed(1)}%
                        </small>
                      )}
                    </td>
                  );
                })}

                <td>{currencyFormatter.format(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
