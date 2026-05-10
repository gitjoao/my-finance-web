"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory, updateCategory } from "@/services/categoriesService";

type TransactionFormProps = {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    type: string;
  };
};

export default function CategoryForm({ initialData }: TransactionFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    type: initialData?.type ?? "expense",
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
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
        });
      } else {
        await createCategory(form.name, form.type, form.slug);
      }

      router.push("/categories");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar categoria");
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
            <label>Slug</label>

            <input
              type="text"
              name="slug"
              className="form-control"
              value={form.slug}
              onChange={handleChange}
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
