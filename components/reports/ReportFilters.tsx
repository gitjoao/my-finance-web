"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

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

export default function ReportFilters() {
  const now = new Date();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [startMonth, setStartMonth] = useState(
    searchParams.get("startMonth") || "1",
  );

  const [startYear, setStartYear] = useState(
    searchParams.get("startYear") || now.getFullYear().toString(),
  );

  const [endMonth, setEndMonth] = useState(
    searchParams.get("endMonth") || (now.getMonth() + 1).toString(),
  );

  const [endYear, setEndYear] = useState(
    searchParams.get("endYear") || now.getFullYear().toString(),
  );

  function handleApply() {
    const params = new URLSearchParams();

    params.set("startMonth", startMonth);
    params.set("startYear", startYear);
    params.set("endMonth", endMonth);
    params.set("endYear", endYear);

    if (!validatePeriod()) {
      toast.error("O período máximo é de 6 meses");
      return;
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  function validatePeriod() {
    const diff =
      (Number(endYear) - Number(startYear)) * 12 +
      (Number(endMonth) - Number(startMonth));

    return diff >= 0 && diff <= 5;
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
            <label>De:</label>

            <select
              className="form-control"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="number"
              className="form-control"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
          </div>
          <div>
            <label>Até:</label>
            <select
              className="form-control"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="number"
              className="form-control"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleApply}>
            Gerar relatório
          </button>
        </div>
      </div>
    </div>
  );
}
