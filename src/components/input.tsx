import { useEffect, useState } from 'react'
import * as style from '../components/styles'


//------------- TYPE -----------------------------------------------
type TInputText = {
    value: string
    render: () => JSX.Element
    IsValid: boolean
}
type TInputButton = {
    render: () => JSX.Element
    IsValid: boolean
}

//--------------- FUNC -----------------------------------------------------

//Text ------------------------------------------------------------------
export function Text(
    type: string,
    state: { value: any, setValue: React.Dispatch<React.SetStateAction<any>> | undefined, field: string | undefined } | undefined,
    validations: ((value: string) => string)[],
    props: any): TInputText {

    const [Value, setValue] = useState('')
    const [IsValid, setIsValid] = useState(true)
    const [IsBlur, setIsBlur] = useState(false)
    const [Errors, setErrors] = useState<string[]>([])
    let bgColor: string = ''
    if (Errors.length > 0) {
        bgColor = 'bg-red-200'
    } else {
        bgColor = ''
    }

    let V: string = ''
    if (state) {
        if (state.field) {
            V = String(state.value[state.field])
        } else {
            V = String(state.value)
        }
    } else {
        V = Value
        state = {
            value: Value,
            setValue: setValue,
            field: undefined,
        }
    }

    useEffect(() => {
        if (IsBlur) {
            validate()
        }
    }, [V])

    function validate() {
        let errors: string[] = []
        for (const f of validations) {
            const err = f(V)
            if (err != '') {
                errors.push(err)
            }
        }
        setErrors(errors)
        if (errors.length > 0) {
            setIsValid(false)
            return false
        }
        setIsValid(true)
        return true
    }

    function onchange(e: React.ChangeEvent<HTMLInputElement>) {
        if (state?.setValue != undefined) {
            if (state.field) {
                state.setValue({ ...state.value, [state.field]: e.target.value })
            } else {
                state.setValue(e.target.value)
            }
        }
    }
    function onBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
        setIsBlur(true)
        validate()
    }

    function render() {
        props.className = [props.className, bgColor].join(' ')
        return (
            <>
                <input
                    type={type}
                    value={V}
                    onChange={onchange}
                    onBlur={onBlur}
                    title={Errors.join('\n')}
                    {...props}
                />
            </>
        )
    }

    //className={[props.className, bgColor].join(' ')}
    //required={(props.required) ? props.required : false}
    //readOnly={(props.readonly) ? props.readonly : false}

    return { value: V, render, IsValid }
}

//Button ------------------------------------------------------------
export function Button(
    value: string,
    onClick: () => void,
    validations: (() => string)[],
    props: any): TInputButton {

    const [IsValid, setIsValid] = useState(true)
    const [Errors, setErrors] = useState<string[]>([])

    let bgColor: string = ''

    function validate() {        
        if(btnValidate(validations)){
            props.disabled = false
            bgColor = ''
        }else{
            props.disabled = true
            bgColor = style.Btn.Gray1
        }
    }

    function render() {
        validate()
        props.className = [props.className, bgColor].join(' ')
        return (
            <>
                <button
                    onClick={onClick}
                    title={Errors.join('\n')}
                    {...props}>
                    {value}
                </button>
            </>
        )
    }

    return { render, IsValid }
}
export function Submit(
    value: string,
    validations: (() => string)[],
    props: any): TInputButton {

    const [IsValid, setIsValid] = useState(true)
    let bgColor: string = ''

    function validate() {        
        if(btnValidate(validations)){
            props.disabled = false
            bgColor = ''
        }else{
            props.disabled = true
            bgColor = style.Btn.Gray1
        }
    }

    function render() {
        validate()
        props.className = [props.className, bgColor].join(' ')
        return (
            <>
                <button
                    type="submit"
                    {...props}>
                    {value}
                </button>
            </>
        )
    }

    return { render, IsValid }
}

function btnValidate(funcs: (() => string)[]): boolean {
    for (const f of funcs) {
        const err = f()
        if (err != '') {
            return false
        }
    }
    return true
}





