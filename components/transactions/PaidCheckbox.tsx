"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updateTransaction } from "@/services/transactionsService";

type Props = {
  id: string;
  paid: boolean;
};

export default function PaidCheckbox({ id, paid: initialPaid }: Props) {
  const router = useRouter();

  const [paid, setPaid] = useState(initialPaid);
  const [loading, setLoading] = useState(false);

  async function handleChange() {
    try {
      setLoading(true);

      await updateTransaction(id, {
        paid: !paid,
      });

      setPaid(!paid);

      toast.success(
        !paid ? "Conta marcada como paga" : "Conta marcada como pendente",
      );

      router.refresh();
    } catch {
      toast.error("Erro ao atualizar pagamento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <input
      type="checkbox"
      checked={paid}
      disabled={loading}
      onChange={handleChange}
    />
  );
}
