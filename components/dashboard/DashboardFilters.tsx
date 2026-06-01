"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const months = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

export default function DashboardFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const month = searchParams.get("month") || "";
  const year = searchParams.get("year") || "";

  function updateFilters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="box box-primary">
      <div className="box-body">
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "end",
            justifyContent: "center",
          }}
        >
          <div>
            <label>Mês</label>

            <select
              className="form-control"
              value={month}
              onChange={(e) => updateFilters("month", e.target.value)}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Ano</label>

            <input
              type="number"
              className="form-control"
              value={year}
              onChange={(e) => updateFilters("year", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
