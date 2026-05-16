"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory, updateCategory } from "@/services/categoriesService";
import { currencyFormatter } from "@/app/utils/currency";
import { ApiError } from "@/services/errors";
import { toast } from "react-toastify";

type TransactionFormProps = {
  initialData?: {
    id: string;
    name: string;
    limit?: number;
    type: string;
    color: string;
  };
};

export default function CategoryForm({ initialData }: TransactionFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    type: initialData?.type ?? "expense",
    name: initialData?.name,
    limit: initialData?.limit ?? undefined,
    color: initialData?.color,
  });

  const isEdit = !!initialData;

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEdit) {
        await updateCategory(initialData.id, {
          ...form,
          limit: form.limit !== undefined ? Number(form.limit) : undefined,
        });
      } else {
        console.log(form);
        await createCategory({
          ...form,
          limit: form.limit !== undefined ? Number(form.limit) : undefined,
        });
      }
      toast.success(
        `Categoria ${isEdit ? "atualizada" : "criada"} com sucesso!`,
      );
      router.push("/categories");
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

  function handleLimitChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, "");

    const limit = Number(value) / 100;
    console.log(value, limit);
    setForm({
      ...form,
      limit,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="box box-primary">
        <div className="box-header">
          <h3 className="box-title">{isEdit ? "Editar" : "Criar"} Categoria</h3>
        </div>

        <div className="box-body">
          <div className="form-group">
            <label>Nome</label>

            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Limite</label>
            <input
              type="text"
              name="limit"
              className="form-control"
              value={
                form.limit ? currencyFormatter.format(form.limit) : undefined
              }
              onChange={handleLimitChange}
            />
          </div>

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
            <label>Cor</label>

            <input
              type="color"
              name="color"
              className="form-control"
              value={form.color}
              onChange={handleChange}
              style={{
                height: 40,
                padding: 5,
              }}
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
