"use client";

import { useState } from "react";
import {
  createTransaction,
  updateTransaction,
} from "@/services/transactionsService";
import { useRouter } from "next/navigation";
import { currencyFormatter } from "@/app/utils/currency";
import { toast } from "react-toastify";
import { ApiError } from "@/services/errors";

type TransactionFormProps = {
  initialData?: {
    id: string;
    type: string;
    amount: number;
    categoryId: string;
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
    amount: initialData?.amount != null ? Number(initialData.amount) : 0,
    categoryId: initialData?.categoryId ?? "",
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
      toast.success(
        `Transação ${isEdit ? "atualizada" : "criada"} com sucesso!`,
      );
      router.back();
    } catch (error) {
      if (error instanceof ApiError) {
        if (Array.isArray(error.details)) {
          error.details.forEach((item: { message: string }) => {
            toast.error(item.message, { autoClose: 5000 });
          });
        } else {
          toast.error(error.message);
        }
      }
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
    <form onSubmit={handleSubmit} className="tx-form">
      <div className="box box-primary">
        <div className="box-header">
          <h3 className="box-title">{isEdit ? "Editar" : "Criar"} Transação</h3>
        </div>

        <div className="box-body">
          <div className="form-grid">
            {/* Tipo */}
            <div className="form-group">
              <label>Tipo</label>
              <div className="type-toggle">
                <button
                  type="button"
                  disabled={isEdit}
                  className={`type-btn expense ${form.type === "expense" ? "active" : ""}`}
                  onClick={() => setForm({ ...form, type: "expense" })}
                >
                  Despesa
                </button>
                <button
                  type="button"
                  disabled={isEdit}
                  className={`type-btn income ${form.type === "income" ? "active" : ""}`}
                  onClick={() => setForm({ ...form, type: "income" })}
                >
                  Receita
                </button>
              </div>
            </div>

            {/* Valor */}
            <div className="form-group">
              <label>Valor</label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                name="amount"
                className="form-control amount-input"
                placeholder="R$ 0,00"
                value={form.amount ? currencyFormatter.format(form.amount) : ""}
                onChange={handleAmountChange}
              />
            </div>

            {/* Descrição */}
            <div className="form-group full">
              <label>Descrição</label>
              <input
                type="text"
                name="description"
                autoComplete="off"
                className="form-control"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {/* Categoria */}
            <div className="form-group">
              <label>Categoria</label>
              <select
                className="form-control"
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
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

            {/* Data */}
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

            {/* Pagamento e Parcelas (só despesa) */}
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
              </>
            )}

            {/* Dono */}
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
          </div>
        </div>

        <div className="box-footer">
          <button
            type="button"
            className="btn btn-default"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Salvando..." : isEdit ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
}
