import { useState, useEffect, useContext } from "react";
import { TShop, TUser } from '../../api/api_pb'
//import { AuthCtx, TAuthCtx } from '../../hoc/AuthProvider'
import { TApiCtx, ApiCtx } from '../../api/ApiProvider'
import * as Input from '../../components/input'
import * as Valid from '../../components/Validations'
import * as style from '../../components/styles'

//------------- CONST -------------------------------------------------------------------
const DEFAULT_SHOP = new TShop().toObject()
//-------- TYPES ---------------------------------------------------------------------------------
/*
//--------------- FUNC ----------------------------------------------------------------------------
export function ProfileForm(): JSX.Element {
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const authCtx = useContext(AuthCtx) as TAuthCtx
    const [User, setUser] = useState<TUser.AsObject>({ email: '', id: 0, name: '' })
    const [Message, setMessage] = useState('')
    const [isChanged, setIsChanged] = useState(false)
    const inpEmail = Input.Text('email',
        { value: User, setValue: undefined, field: 'email' },
        [],
        { className: [style.Inp.v1].join(' ') }
    )
    const inpName = Input.Text('text',
        { value: User, setValue: setUser, field: 'name' },
        [Valid.Input.IsEmpty],
        { className: [style.Inp.v1].join(' '), required: true }
    )
    const btnSave = Input.Submit(
        'Сохранить',
        [() => { return Valid.Btn.NoChange(isChanged) }],
        { className: [style.Btn.Size1, style.Btn.Green1].join(' ') }
    )
    //--------------- useEffect ----------------------------------------------------------------------------   
    useEffect(() => {
        ////console.log('ProfileForm: useEffect: update()',)
        update()
    }, [])


    //--------------- PUBLIC ----------------------------------------------------------------------------

    function update() {
        apiCtx.userClient.getUser(apiCtx.pbEmpty, apiCtx.getMetadata(authCtx.SessionId))
            .then((resp) => {
                setUser({
                    id: resp.getId(),
                    email: resp.getEmail(),
                    name: resp.getName(),
                })
            })
            .catch((err) => {
                setMessage('Ошибка получения данных пользователя: ' + err)
            })
    }


    //------------- PRIVATE ----------------------------------------------------------------------
    function onSubmitChangeProfile(event: React.FormEvent) {
        event.preventDefault()
        if (!isChanged) {//если небыло изменений, то выходим
            return
        }
        const req = new TUser()
        req.setId(User.id)
        req.setEmail(User.email)
        req.setName(User.name)

        apiCtx.userClient.editUser(req, apiCtx.getMetadata(authCtx.SessionId))
            .then(() => {
                setMessage('Данные успешно сохранены')
                setIsChanged(false)
            })
            .catch(() => {
                setMessage('Ошибка сохранения данных')
            })
    }
    //------------- return ----------------------------------------------------------------------
    return (
        <form onSubmit={onSubmitChangeProfile} onChange={() => { setIsChanged(true) }}>
            <table>
                <tbody>
                    <tr>
                        <td>E-mail</td>
                        <td>{inpEmail.render()}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{inpName.render()}</td>
                    </tr>
                </tbody>
            </table>
            {(Message != '') && <p>{Message}</p>}
            {btnSave.render()}
        </form>
    )
}
*/