interface ResultRow {
  label: string;
  value: string;
}

interface ResultCardProps {
  rows: ResultRow[];
  title?: string;
}

export function ResultCard({ rows, title = "Resultado" }: ResultCardProps) {
  return (
    <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-5">
      <h3 className="text-sm font-semibold tracking-wide text-violet-800 uppercase">
        {title}
      </h3>
      <dl className="mt-3 flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-slate-600">{row.label}</dt>
            <dd className="text-lg font-bold text-slate-900">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
