import { LOADING } from "./types"

export const loading = (load: boolean) => ({
    type: LOADING,
    payload: load
})