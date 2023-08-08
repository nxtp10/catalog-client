
import { GuestClient } from './ApiServiceClientPb'
import * as empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import { createContext } from 'react'
import * as config from '../settings/config'

export type TApiCtx = {
    getMetadata: (session_id: string) => { [key: string]: string }
    guestClient: GuestClient
    pbEmpty: any
}

export const ApiCtx = createContext<TApiCtx | undefined>(undefined)

export function ApiProvider({ children }: any) {
    const guestClient = new GuestClient(config.API_HOST, null, null)
    const pbEmpty = new empty_pb.Empty()

    function getMetadata(session_id: string): { [key: string]: string } {
        return { 'authorization': 'Bearer ' + session_id }
    }


    return (
        <ApiCtx.Provider value={{ guestClient, getMetadata, pbEmpty }}>
            {children}
        </ApiCtx.Provider>
    )
}