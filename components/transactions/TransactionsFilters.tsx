"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

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

export default function TransactionsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [type, setType] = useState(searchParams.get("type") || "");

  const [month, setMonth] = useState(searchParams.get("month") || "");

  const [year, setYear] = useState(searchParams.get("year") || "");

  const [paymentMethod, setPaymentMethod] = useState(
    searchParams.get("paymentMethod") || "",
  );

  function handleFilter() {
    const params = new URLSearchParams();

    if (type) {
      params.set("type", type);
    }

    if (month) {
      params.set("month", month);
    }

    if (year) {
      params.set("year", year);
    }

    if (paymentMethod) {
      params.set("paymentMethod", paymentMethod);
    }

    router.push(`${pathname}?${params.toString()}`);
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
            <label>Tipo</label>

            <select
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Todos</option>

              <option value="income">Receita</option>

              <option value="expense">Despesa</option>
            </select>
          </div>

          <div>
            <label>Método de Pagamento</label>

            <select
              className="form-control"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Todos</option>

              <option value="debit">Débito</option>

              <option value="credit">Crédito</option>
            </select>
          </div>

          <div>
            <label>Mês</label>

            <select
              className="form-control"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">Todos</option>

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

          <button className="btn btn-primary" onClick={handleFilter}>
            <i className="fa fa-search"></i> Filtrar
          </button>
        </div>
      </div>
    </div>
  );
}
