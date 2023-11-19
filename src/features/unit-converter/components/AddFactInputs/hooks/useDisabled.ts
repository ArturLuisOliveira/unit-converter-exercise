import { useMemo } from "react";

export const useDisabled = ({
  from,
  ratio,
  to,
}: {
  from: string;
  to: string;
  ratio: string;
}) => {
  const disabled = useMemo(() => {
    if (!from || !to || !ratio) return true;
    if (Number.isNaN(Number(ratio))) return true;
    return false;
  }, [from, to, ratio]);

  return disabled;
};
