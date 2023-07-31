import { createContext, useContext, useEffect, useState } from 'react';
import { TAuthReq, TAuthStatus, TUser } from '../api/api_pb';
import { UserClient, GuestClient } from '../api/ApiServiceClientPb'
import { ApiCtx, TApiCtx } from '../api/ApiProvider'
/*
export type TAuthCtx = {
    IsAuthorized: boolean
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
    User: TUser.AsObject | undefined
    setUser: React.Dispatch<React.SetStateAction<TUser.AsObject | undefined>>
    signin: (req: TAuthReq.AsObject, cb: any) => void
    signout: () => void
    isauth:()=>boolean
    SessionId: string
}


export const AuthCtx = createContext<TAuthCtx | undefined>(undefined)

export function AuthProvider({ children }: any) {
    const [User, setUser] = useState<TUser.AsObject>()
    const [IsAuthorized, setIsAuthorized] = useState(false)
    const [SessionId, setSessionId] = useState(GetSessionIdLS())
    let value: TAuthCtx = { IsAuthorized, setIsAuthorized, User, setUser, signin, signout,isauth, SessionId }
    const apiCtx = useContext(ApiCtx) as TApiCtx

    useEffect(() => {
        ////console.log('IsAuthorized: ', value.IsAuthorized)
    }, [value.IsAuthorized])
    useEffect(() => {
        isauth()
    }, [])

    function isauth(): boolean {
        let isAuth = false
        apiCtx.userClient.isAuthorized(apiCtx.pbEmpty, apiCtx.getMetadata(SessionId))
            .then((resp) => {
                isAuth = resp.getValue()
                setIsAuthorized(isAuth)
                if (isAuth) {
                    setUser(new TUser().toObject())
                } else {
                    setUser(undefined)
                    setSessionId('')
                    SetSessionIdLS('')
                }
            })
            .catch(() => {
                setIsAuthorized(false)
                setUser(undefined)
            })
        return isAuth
    }
    function signin(request: TAuthReq.AsObject, cb: any) {
        const req = new TAuthReq()
        req.setEmail(request.email)
        req.setPwd(request.pwd)
        apiCtx.guestClient.login(req, null)
            .then((resp) => {
                setIsAuthorized(true)
                setSessionId(resp.getSessionid())
                SetSessionIdLS(resp.getSessionid())
                cb()
            })
            .catch(() => {
                setIsAuthorized(false)
            })
    }
    function signout() {
        setIsAuthorized(false)
        setSessionId('')
        SetSessionIdLS('')
    }



    function GetSessionIdLS(): string {
        const session_id = localStorage.getItem('session_id')
        if (session_id != null) {
            ////console.log("GetSessionIdLS:", session_id)
            return session_id
        } else {
            ////console.log("GetSessionIdLS: null")
            return ''
        }
    }
    function SetSessionIdLS(session_id: string) {
        if (session_id != undefined) {
            ////console.log("SetSessionIdLS:", session_id)
            localStorage.setItem('session_id', session_id)
        }
    }
    //-------- return ---------------------------------------------------------------------------
    return (
        <AuthCtx.Provider value={value}>
            {children}
        </AuthCtx.Provider>
    )

}*/