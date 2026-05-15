import Link from "next/link";
import DeleteTransactionModal from "./DeleteTransactionModal";
import { currencyFormatter } from "@/app/utils/currency";
import { dateFormatter } from "@/app/utils/date";

type Transaction = {
  id: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
  description: string;
  date: string;
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
}: {
  transactions: Transaction[];
  showOptions?: boolean;
}) {
  return (
    <div className="box box-primary">
      <div className="box-header">
        <h3 className="box-title">Transações</h3>
      </div>

      <div className="box-body">
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
              <th></th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
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
                <td>{transaction.type === "income" ? "Receita" : "Despesa"}</td>
                <td>
                  {transaction.paymentMethod === "credit"
                    ? "Crédito"
                    : "Débito"}
                </td>
                <td>
                  {currencyFormatter.format(Number(transaction.amount || 0))}
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
                      <DeleteTransactionModal transactionId={transaction.id} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
