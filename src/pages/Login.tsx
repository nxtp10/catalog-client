import { useState, useEffect, useContext } from "react";
/*import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { TAuthReq } from '../api/api_pb'
import { AuthCtx, TAuthCtx } from "../hoc/AuthProvider";
import * as Input from '../components/input'
import * as Valid from '../components/Validations'
import * as style from '../components/styles'




export function LoginForm(): JSX.Element {
    const authCtx = useContext(AuthCtx) as TAuthCtx
    const [Request, setRequest] = useState<TAuthReq.AsObject>({ email: "", pwd: "" })
    const email = Input.Text('email',
        { value: Request, setValue: setRequest, field: 'email' },
        [Valid.Input.IsEmpty, Valid.Input.MinLen5],
        { className: ['m-1 p-1 border'].join(' '), required: true }
    )
    const password = Input.Text('password',
        { value: Request, setValue: setRequest, field: 'pwd' },
        [(v) => { return Valid.Input.MinLength(v, 5) }],
        { className: ['m-1 p-1 border'].join(' '), required: true }
    )
    const btnLogin = Input.Submit(
        'Войти',
        [],
        { className: [style.Btn.Size1, style.Btn.Green1].join(' ') }
    )
    const btnReg = Input.Button(
        'Зарегистрироваться',
        () => { navigate('/registration') },
        [],
        { className: [style.Btn.Size1, style.Btn.Red1].join(' ') }
    )
    const btnCancel = Input.Button(
        'Выйти',
        authCtx.signout,
        [],
        { className: [style.Btn.Size1, style.Btn.Red1].join(' ') }
    )
    const navigate = useNavigate()
    const location = useLocation()

    const a = location.state as any
    const fromPage = a?.from.pathname || '/'
    //--------------- useEffect ----------------------------------------------------------------------------
    useEffect(() => {
        //console.log('fromPage: ', fromPage)
    }, [])


    //------------- FUNC ----------------------------------------------------------------------

    const onSubmitLogin = (event: React.FormEvent) => {
        event.preventDefault()
        const req = new TAuthReq()
        req.setEmail(Request.email)
        req.setPwd(Request.pwd)
        authCtx.signin(Request, () => { navigate(fromPage, { replace: true }) })
    };

    function loginForm(): JSX.Element {
        return (
            <>
                <form onSubmit={onSubmitLogin}>
                    <table>
                        <tbody>
                            <tr>
                                <td>E-mail</td>
                                <td>{email.render()}</td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>{password.render()}</td>
                            </tr>
                        </tbody>
                    </table>
                    {btnLogin.render()}
                    {btnReg.render()}
                </form>
            </>
        )
    }
    function alreadyLoginForm(): JSX.Element {
        return (
            <>
                <p>Здравствуйте {Request.email}.</p>
                <p>Вы успешно авторизованы.</p>
                {btnCancel.render()}
            </>
        )
    }

    //------------- return ----------------------------------------------------------------------
    return (
        <>
            {(authCtx.IsAuthorized)
                ? alreadyLoginForm()
                : loginForm()
            }
        </>
    )

}*/