/**
 * hook criado para resolver o problema do warning de memory leak no console
 * esse ajuste sera util apenas na versao 17 para baixo, pois na versao 18,
 * se o useEffect estiver desmontando o item corretamente, o warning de memory leak
 * nao acontecera
 */

import { useCallback, useEffect, useRef, useState } from "react";

export function useSafeAsyncState(initialState) {
  const [state, setState] = useState(initialState);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const setSafeAsyncState = useCallback((data) => {
    if (isMounted.current) {
      setState(data);
    }
  }, []);

  return [state, setSafeAsyncState];
}
