"use client";

import { deleteTransaction } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  transactionId: string;
};

export default function DeleteTransactionModal({ transactionId }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteTransaction(transactionId);

      setOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir");
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
          className="modal modal-danger fade in"
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
                <p>Tem certeza que deseja excluir esta transação?</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-outline"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </button>

                <button
                  className="btn btn-outline"
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
