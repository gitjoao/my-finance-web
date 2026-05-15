"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const [month, setMonth] = useState(searchParams.get("month") || "");
  const [year, setYear] = useState(searchParams.get("year") || "");

  useEffect(() => {
    const params = new URLSearchParams();

    if (month) {
      params.set("month", month);
    }

    if (year) {
      params.set("year", year);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [month, year, pathname, router]);

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
              onChange={(e) => setMonth(e.target.value)}
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
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
