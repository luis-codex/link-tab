import { useContext } from "react";
import { useStore } from "zustand";
import { StadisticsContext } from "./store-Stadistics";
import { StadisticsStoreState } from "./types";

export default function useStadisticsStore<TSelected>(
    selector: (state: StadisticsStoreState) => TSelected
) {
    const store = useContext(StadisticsContext);
    if (!store)
        throw new Error(
            'Missing StadisticsProvider, did you forget to wrap your component tree with it?'
        );
    return useStore(store, selector);
}
