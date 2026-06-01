"use client";
import Link from "next/link";
import DeleteTransactionModal from "./DeleteTransactionModal";
import { currencyFormatter } from "@/app/utils/currency";
import { dateFormatter } from "@/app/utils/date";
import PaidCheckbox from "./PaidCheckbox";
import PayBillModal from "./PayCreditCardModal";
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

type Transaction = {
  id: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
  description: string;
  date: string;
  paid: boolean;
  amount: number;
  type: string;
  paymentMethod?: string;
  installmentTotal?: number;
  installmentNumber?: number;
  owner: string;
};

export default function TransactionsTable({
  transactions,
  showOptions = false,
  month,
  year,
}: {
  transactions: Transaction[];
  showOptions?: boolean;
  month: number;
  year: number;
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        {" "}
        <Link href={`/transactions/new`} className="btn btn-success">
          <i className="fa fa-plus"></i> Adicionar
        </Link>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="fa fa-credit-card"></i> Pagar Fatura (
          {months[month - 1].label || month}/{year})
        </button>
        {showModal && (
          <PayBillModal
            month={month}
            year={year}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>

      <div className="box box-primary" style={{ marginTop: "20px" }}>
        <div className="box-header">
          <h3 className="box-title">Transações</h3>
        </div>

        <div className="box-body table-responsive no-padding">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Tipo</th>
                <th>Pagamento</th>
                <th>
                  Valor{" "}
                  {currencyFormatter.format(
                    transactions
                      .filter((t) => t.type === "expense")
                      .map((t) => t.amount)
                      .reduce((a, b) => a + b, 0),
                  )}
                </th>
                <th>Pago?</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <div
                        style={{
                          backgroundColor: transaction.category?.color,
                          color: "#fff",
                          padding: "4px 8px",
                          borderRadius: 20,
                          display: "inline-block",
                          fontWeight: "bold",
                        }}
                      >
                        {transaction.category?.name || ""}
                      </div>
                    </td>
                    <td>
                      {transaction.description}{" "}
                      {transaction.installmentTotal! > 1
                        ? `(${transaction.installmentNumber}/${transaction.installmentTotal})`
                        : ""}
                    </td>
                    <td>{dateFormatter.format(new Date(transaction.date))}</td>
                    <td>
                      {transaction.type === "income" ? "Receita" : "Despesa"}
                    </td>
                    <td>
                      {transaction.paymentMethod === "credit"
                        ? "Crédito"
                        : "Débito"}
                    </td>
                    <td>
                      {currencyFormatter.format(
                        Number(transaction.amount || 0),
                      )}
                    </td>
                    <td>
                      <PaidCheckbox
                        id={transaction.id}
                        paid={transaction.paid}
                      />
                    </td>
                    <td>
                      {showOptions && (
                        <div
                          className="btn-group"
                          style={{ display: "flex", gap: "8px" }}
                        >
                          <Link
                            href={`/transactions/${transaction.id}`}
                            className="btn btn-warning btn-sm"
                          >
                            <i className="fa fa-pencil"></i> Editar
                          </Link>
                          <DeleteTransactionModal
                            transactionId={transaction.id}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
