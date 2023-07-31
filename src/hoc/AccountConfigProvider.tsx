import { createContext, useContext, useEffect, useState } from 'react';
import { TAuthReq, TAuthStatus, TUser, TAccountConfig, TUniqueCondition, TProductField } from '../api/api_pb';
import { UserClient, GuestClient } from '../api/ApiServiceClientPb'
import { ApiCtx, TApiCtx } from '../api/ApiProvider'
//import { AuthCtx, TAuthCtx } from './AuthProvider';
/*

export type TAccountConfigCtx = {
    UniqueConditionList: TUniqueCondition[]
    ProductFields: TProductField[]
}


export const AccountConfigCtx = createContext<TAccountConfigCtx | undefined>(undefined)

export function AcountConfigProvider({ children }: any) {
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const authCtx = useContext(AuthCtx) as TAuthCtx
    const [UniqueConditionList, setUniqueConditionList] = useState<TUniqueCondition[]>([])
    const [ProductFields, setProductFields] = useState<TProductField[]>([])
    let value: TAccountConfigCtx = { UniqueConditionList, ProductFields }

    useEffect(() => {
        updateConfig()
    }, [])
    useEffect(() => {
        //console.log("UniqueConditionList: ",UniqueConditionList)
        //console.log("ProductFields: ",ProductFields)
    }, [UniqueConditionList,ProductFields])


    function updateConfig() {
        apiCtx.userClient.getAccountConfig(apiCtx.pbEmpty, apiCtx.getMetadata(authCtx.SessionId))
            .then((resp) => {                
                setUniqueConditionList(resp.getUniqueconditionlistList())
                setProductFields(resp.getProductfieldsList())
            })
            .catch((err) => {
                //console.log("updateConfig: ",err)
            })
    }

    //-------- return ---------------------------------------------------------------------------
    return (
        <AccountConfigCtx.Provider value={value}>
            {children}
        </AccountConfigCtx.Provider>
    )

}*/