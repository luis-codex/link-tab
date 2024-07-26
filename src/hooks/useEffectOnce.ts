import { type EffectCallback, useEffect, useLayoutEffect } from 'react';

const useEffectOnce = (effect: EffectCallback) => {
  useEffect(() => {
    // Se ejecuta el efecto solo una vez al montar el componente
    effect();

    // Cleanup: no es necesario limpiar nada, ya que solo se ejecuta una vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // El segundo argumento del useEffect es un array de dependencias vacío
};

export default useEffectOnce;

export const useLayoutEffectOnce = (effect: EffectCallback) => {
  useLayoutEffect(() => {
    // Se ejecuta el efecto solo una vez al montar el componente
    effect();

    // Cleanup: no es necesario limpiar nada, ya que solo se ejecuta una vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // El segundo argumento del useEffect es un array de dependencias vacío
};


