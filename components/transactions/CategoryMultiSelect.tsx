"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Option = { id: string; name: string };

export default function CategoryMultiSelect({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term
      ? options.filter((o) => o.name.toLowerCase().includes(term))
      : options;
  }, [options, search]);

  function toggle(id: string) {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    );
  }

  const label =
    value.length === 0
      ? "Todas"
      : value.length === 1
        ? (options.find((o) => o.id === value[0])?.name ?? "1 selecionada")
        : `${value.length} selecionadas`;

  return (
    <div className="ms-wrap" ref={ref}>
      <button
        type="button"
        className="form-control ms-button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="ms-label">{label}</span>
        <i className={`fa fa-caret-${open ? "up" : "down"}`} />
      </button>

      {open && (
        <div className="ms-panel">
          {options.length > 6 && (
            <input
              type="text"
              className="form-control ms-search"
              placeholder="Buscar categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          )}

          <div className="ms-list">
            {filtered.length === 0 ? (
              <div className="ms-empty">Nenhuma categoria</div>
            ) : (
              filtered.map((option) => (
                <label key={option.id} className="ms-item">
                  <input
                    type="checkbox"
                    checked={value.includes(option.id)}
                    onChange={() => toggle(option.id)}
                  />
                  <span>{option.name}</span>
                </label>
              ))
            )}
          </div>

          {value.length > 0 && (
            <button
              type="button"
              className="btn btn-link ms-clear"
              onClick={() => onChange([])}
            >
              Limpar seleção
            </button>
          )}
        </div>
      )}
    </div>
  );
}
