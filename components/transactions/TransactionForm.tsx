"use client";

import { useState } from "react";
import { createTransaction } from "@/services/api";
import { useRouter } from "next/navigation";

export default function TransactionForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    paymentMethod: "debit",
    owner: "me",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await createTransaction({
        ...form,
        amount: Number(form.amount),
      });

      router.push("/dashboard");
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
          <h3 className="box-title">Nova Transação</h3>
        </div>

        <div className="box-body">
          <div className="form-group">
            <label>Tipo</label>

            <select
              name="type"
              className="form-control"
              value={form.type}
              onChange={handleChange}
            >
              <option value="income">Receita</option>

              <option value="expense">Despesa</option>
            </select>
          </div>

          <div className="form-group">
            <label>Valor</label>

            <input
              type="number"
              name="amount"
              className="form-control"
              value={form.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>

            <input
              type="text"
              name="category"
              className="form-control"
              value={form.category}
              onChange={handleChange}
            />
          </div>

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
            <label>Dono</label>

            <select
              name="owner"
              className="form-control"
              value={form.owner}
              onChange={handleChange}
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
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
}
