
import { UserClient, GuestClient } from './ApiServiceClientPb'
import * as empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import { useState, createContext } from 'react'
import * as CONST from '../settings/constants'

export type TApiCtx = {
    getMetadata: (session_id: string) => { [key: string]: string }
    guestClient: GuestClient
    userClient: UserClient
    pbEmpty: any
}

export const ApiCtx = createContext<TApiCtx | undefined>(undefined)

export function ApiProvider({ children }: any) {
    const guestClient = new GuestClient(CONST.HOST, null, null)
    const userClient = new UserClient(CONST.HOST, null, null)
    const pbEmpty = new empty_pb.Empty()

    function getMetadata(session_id: string): { [key: string]: string } {
        return { 'authorization': 'Bearer ' + session_id }
    }


    return (
        <ApiCtx.Provider value={{ guestClient, userClient, getMetadata, pbEmpty }}>
            {children}
        </ApiCtx.Provider>
    )
}