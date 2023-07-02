import { useCallback } from "react";
import { useIsMounted } from "./useIsMounted";

export function useSafeAsyncOperation() {
  const isMounted = useIsMounted();

  const runSafeAsyncOperation = useCallback(
    (callback) => {
      if (isMounted()) {
        callback();
      }
    },
    [isMounted]
  );

  return runSafeAsyncOperation;
}
