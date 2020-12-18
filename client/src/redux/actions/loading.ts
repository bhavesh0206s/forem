import { LOADING } from "./types"

export const loading = (load) => ({
    type: LOADING,
    payload: load
})