"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

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

const presets = [
  { n: 3, label: "3 meses" },
  { n: 6, label: "6 meses" },
];

type Range = { sm: string; sy: string; em: string; ey: string };

function presetRange(n: number): Range {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - (n - 1), 1);

  return {
    sm: String(start.getMonth() + 1),
    sy: String(start.getFullYear()),
    em: String(today.getMonth() + 1),
    ey: String(today.getFullYear()),
  };
}

function sameRange(a: Range, b: Range) {
  return a.sm === b.sm && a.sy === b.sy && a.em === b.em && a.ey === b.ey;
}

function monthsBetween(r: Range) {
  return (Number(r.ey) - Number(r.sy)) * 12 + (Number(r.em) - Number(r.sm));
}

function yearOptions(selected: string[]) {
  const current = new Date().getFullYear();
  const base = Array.from({ length: 7 }, (_, i) => current - 5 + i);
  const extra = selected.map(Number).filter((y) => y && !base.includes(y));

  return [...base, ...extra].sort((a, b) => a - b);
}

export default function ReportFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fallback = presetRange(1);

  // período que está aplicado na URL
  const applied: Range = {
    sm: searchParams.get("startMonth") ?? fallback.sm,
    sy: searchParams.get("startYear") ?? fallback.sy,
    em: searchParams.get("endMonth") ?? fallback.em,
    ey: searchParams.get("endYear") ?? fallback.ey,
  };

  const [draft, setDraft] = useState<Range>(applied);

  function change(field: keyof Range, value: string) {
    setDraft((d) => ({ ...d, [field]: value }));
  }

  function apply(range: Range) {
    const params = new URLSearchParams({
      startMonth: range.sm,
      startYear: range.sy,
      endMonth: range.em,
      endYear: range.ey,
    });
    router.replace(`${pathname}?${params.toString()}`);
  }

  function applyPreset(n: number) {
    const range = presetRange(n);
    setDraft(range);
    apply(range);
  }

  const diff = monthsBetween(draft);
  const error =
    diff < 0
      ? "A data inicial deve ser anterior à final."
      : diff > 5
        ? "O período máximo é de 6 meses."
        : "";
  const dirty = !sameRange(draft, applied);

  const years = yearOptions([draft.sy, draft.ey]);

  return (
    <div className="box box-primary">
      <div className="box-body">
        <div className="report-filters-top">
          <div className="report-presets">
            {presets.map((p) => {
              const isActive = sameRange(applied, presetRange(p.n));

              return (
                <button
                  key={p.n}
                  type="button"
                  aria-pressed={isActive}
                  className={`btn btn-default btn-sm ${isActive ? "preset-active" : ""}`}
                  onClick={() => applyPreset(p.n)}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="report-filters">
          <div className="range">
            <label>De</label>
            <div className="pair">
              <select
                className="form-control"
                value={draft.sm}
                onChange={(e) => change("sm", e.target.value)}
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              <select
                className="form-control"
                value={draft.sy}
                onChange={(e) => change("sy", e.target.value)}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="range">
            <label>Até</label>
            <div className="pair">
              <select
                className="form-control"
                value={draft.em}
                onChange={(e) => change("em", e.target.value)}
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              <select
                className="form-control"
                value={draft.ey}
                onChange={(e) => change("ey", e.target.value)}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            disabled={!!error || !dirty}
            onClick={() => apply(draft)}
          >
            <i className="fa fa-refresh"></i> Atualizar
          </button>
        </div>

        {error && <div className="report-error">{error}</div>}
      </div>
    </div>
  );
}
