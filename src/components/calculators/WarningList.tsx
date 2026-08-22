interface WarningListProps {
  avisos: string[];
}

export function WarningList({ avisos }: WarningListProps) {
  if (avisos.length === 0) return null;

  return (
    <ul className="flex flex-col gap-1 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
      {avisos.map((aviso) => (
        <li key={aviso} className="flex gap-2">
          <span aria-hidden="true">⚠</span>
          <span>{aviso}</span>
        </li>
      ))}
    </ul>
  );
}
