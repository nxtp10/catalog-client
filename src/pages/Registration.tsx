
import { useState, useEffect, useContext } from "react";
/*import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { TApiCtx, ApiCtx } from "../api/ApiProvider";
import { TAuthReq, TNewUserReq, TUser } from '../api/api_pb'
import { AuthCtx, TAuthCtx } from "../hoc/AuthProvider";
import { RequireAuth } from "../hoc/RequireAuth";
import * as Input from '../components/input'
import * as Valid from '../components/Validations'
import * as style from '../components/styles'


export function RegForm(): JSX.Element {
    const authCtx = useContext(AuthCtx) as TAuthCtx
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const [Request, setRequest] = useState<TNewUserReq.AsObject>({ email: "", pwd: "", name: '' })
    //const [checkPWD, setCheckPWD] = useState('')
    const navigate = useNavigate()

    const name = Input.Text('text',
        { value: Request, setValue: setRequest, field: 'name' },
        [Valid.Input.IsEmpty],
        { className: 'm-1 p-1 border', required: true, readonly: false }
    )
    const email = Input.Text('email',
        { value: Request, setValue: setRequest, field: 'email' },
        [Valid.Input.MinLen5],
        { className: 'm-1 p-1 border', required: true, readonly: false }
    )
    const password = Input.Text('password',
        { value: Request, setValue: setRequest, field: 'pwd' },
        [Valid.Input.MinLen3],
        { className: 'm-1 p-1 border', required: true, readonly: false }
    )
    const password1 = Input.Text('password',
        undefined,
        [Valid.Input.MinLen3, (v) => { return Valid.Input.PWDEqual(password.value, v) }],
        { className: 'm-1 p-1 border', required: true, readonly: false }
    )
    const btnOK = Input.Submit(
        'OK',
        [],
        { className: [style.Btn.Size1, style.Btn.Green1].join(' ') }
    )
    const btnCancel = Input.Button(
        'Отмена',
        () => { navigate(-1) },
        [],
        { className: [style.Btn.Size1, style.Btn.Red1].join(' ') }
    )

    //------------- PRIVATE ----------------------------------------------------------------------

    function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (password1.IsValid) {
            authCtx.IsAuthorized = false
            return
        }
        const req = new TNewUserReq()
        req.setEmail(Request.email)
        req.setPwd(password1.value)
        req.setName(Request.name)

        apiCtx.guestClient.newUser(req, null)
            .then((resp) => {
                authCtx.signin(Request, null)
            }).catch((err) => {
                authCtx.signout()
            })
    };

    //------------- return ----------------------------------------------------------------------

    return (
        <>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{name.render()}</td>
                        </tr>
                        <tr>
                            <td>E-mail</td>
                            <td>{email.render()}</td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>{password.render()}</td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>{password1.render()}</td>
                        </tr>
                        {btnOK.render()}
                        {btnCancel.render()}
                    </tbody>
                </table>
            </form>
        </>
    )
}

*/