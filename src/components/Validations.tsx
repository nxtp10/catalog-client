

export namespace Input {

    export function IsEmpty(value: string): string {
        if (value.length <= 0) {
            return 'Поле не заполнено'
        }
        return ''
    }

    export function MinLength(value: string, len: number): string {
        if (len > 0) {
            if (value.length < len) {
                return `Длина строки меньше ${len}`
            }
        }
        return ''
    }
    export function MaxLength(value: string, len: number): string {
        if (len >= 0) {
            if (value.length > len) {
                return `Длина строки больше ${len}`
            }
        }
        return ''
    }

    export function MinLen1(value: string): string {
        return MinLength(value, 1)
    }
    export function MinLen3(value: string): string {
        return MinLength(value, 3)
    }
    export function MinLen5(value: string): string {
        return MinLength(value, 5)
    }

    export function MaxLen8(value: string): string {
        return MaxLength(value, 8)
    }

    export function PWDEqual(pwd1: string, pwd2: string): string {
        if (pwd1 != pwd2) {
            return 'Пароли не совпадают'
        }
        return ''
    }
}
export namespace Btn {
    export function NoChange(flag:boolean) {
        if(flag){
            return ''
        }else{
            return 'Нет изменений'
        }
    }
}