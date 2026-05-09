"use client";

import { useState } from "react";
import { createTransaction, updateTransaction } from "@/services/api";
import { useRouter } from "next/navigation";
import { currencyFormatter } from "@/app/utils/currency";

type TransactionFormProps = {
  initialData?: {
    id: string;
    type: string;
    amount: number;
    category: string;
    paymentMethod?: string;
    installmentTotal?: number;
    owner: string;
    description?: string;
    date?: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
};

export default function TransactionForm({
  initialData,
  categories,
}: TransactionFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    type: initialData?.type ?? "expense",
    amount: Number(initialData?.amount) ?? "",
    category: initialData?.category ?? "",
    paymentMethod: initialData?.paymentMethod ?? "credit",
    installmentTotal: initialData?.installmentTotal ?? 1,
    owner: initialData?.owner ?? "me",
    description: initialData?.description ?? "",
    date: initialData?.date ? initialData.date.split("T")[0] : "",
  });

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, "");

    const amount = Number(value) / 100;

    setForm({
      ...form,
      amount,
    });
  }

  const isEdit = !!initialData;

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const amount = Number(form.amount);
      const paymentMethod =
        form.type === "expense" ? form.paymentMethod : undefined;
      if (isEdit) {
        await updateTransaction(initialData.id, {
          ...form,
          amount,
          paymentMethod,
        });
      } else {
        await createTransaction({
          ...form,
          amount,
          paymentMethod,
          installmentTotal: Number(form.installmentTotal),
        });
      }

      router.push("/transactions");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar transação");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="box box-primary">
        <div className="box-header">
          <h3 className="box-title">{isEdit ? "Editar" : "Criar"} Transação</h3>
        </div>

        <div className="box-body">
          <div className="form-group">
            <label>Tipo</label>

            <select
              name="type"
              className="form-control"
              value={form.type}
              onChange={handleChange}
              disabled={isEdit}
            >
              <option value="income">Receita</option>

              <option value="expense">Despesa</option>
            </select>
          </div>

          <div className="form-group">
            <label>Valor</label>

            <input
              type="text"
              name="amount"
              className="form-control"
              value={form.amount ? currencyFormatter.format(form.amount) : ""}
              onChange={handleAmountChange}
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>

            <select
              className="form-control"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              <option value="">Selecione</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {form.type === "expense" && (
            <>
              <div className="form-group">
                <label>Pagamento</label>

                <select
                  name="paymentMethod"
                  className="form-control"
                  value={form.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="debit">Débito</option>

                  <option value="credit">Crédito</option>
                </select>
              </div>
              {form.paymentMethod === "credit" && (
                <div className="form-group">
                  <label>Parcelas</label>

                  <input
                    type="number"
                    name="installmentTotal"
                    className="form-control"
                    min={1}
                    value={form.installmentTotal}
                    onChange={handleChange}
                    disabled={isEdit}
                  />
                </div>
              )}
            </>
          )}

          <div className="form-group">
            <label>Dono</label>

            <select
              name="owner"
              className="form-control"
              value={form.owner}
              onChange={handleChange}
              disabled={isEdit}
            >
              <option value="me">Eu</option>

              <option value="father_in_law">Sogro</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição</label>

            <input
              type="text"
              name="description"
              className="form-control"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Data</label>

            <input
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="box-footer">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Salvando..." : isEdit ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
}
