"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { payCreditCardBill } from "@/services/transactionsService";

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

type Props = {
  month: number;
  year: number;
  onClose: () => void;
};

export default function PayBillModal({ month, year, onClose }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    try {
      setLoading(true);

      await payCreditCardBill(month, year);

      toast.success("Fatura paga com sucesso");

      router.refresh();

      onClose();
    } catch {
      toast.error("Erro ao pagar fatura");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal fade in" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={onClose}>
              ×
            </button>

            <h4 className="modal-title">Confirmar pagamento</h4>
          </div>

          <div className="modal-body">
            <p>
              Deseja marcar todas as compras no crédito de{" "}
              <strong>
                {months[month - 1].label}/{year}
              </strong>{" "}
              como pagas?
            </p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-default" onClick={onClose}>
              Cancelar
            </button>

            <button
              className="btn btn-primary"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? "Processando..." : "Confirmar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
