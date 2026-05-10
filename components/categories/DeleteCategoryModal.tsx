"use client";

import { deleteCategory } from "@/services/categoriesService";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  categoryId: string;
};

export default function DeleteCategoryModal({ categoryId }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteCategory(categoryId);

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button className="btn btn-sm btn-danger" onClick={() => setOpen(true)}>
        <i className="fa fa-trash"></i> Excluir
      </button>

      {open && (
        <div
          className="modal fade in"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={() => setOpen(false)}
                >
                  ×
                </button>

                <h4 className="modal-title">Confirmar exclusão</h4>
              </div>

              <div className="modal-body">
                <p>Tem certeza que deseja excluir esta categoria?</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-default"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </button>

                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
