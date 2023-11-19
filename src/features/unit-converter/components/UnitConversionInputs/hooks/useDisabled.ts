import { useMemo } from "react";

export const useDisabled = ({
  from,
  to,
  value,
}: {
  from: string;
  to: string;
  value: string;
}) => {
  const disabled = useMemo(() => {
    if (!from || !to || !value) return true;
    if (Number.isNaN(Number(value))) return true;
    return false;
  }, [from, to, value]);

  return disabled;
};
