import { useState } from 'react'

/*
type TPagination = {
    renderPages: (count: number) => JSX.Element
    renderArr: () => JSX.Element
}


export function Pagination<T>(arr: T[], limit: number, func: (row: T, rowIndex: number) => JSX.Element): TPagination {
    const [PageNum, setPageNum] = useState(0)
    const len = arr.length
    const TotalPages = Math.ceil(len / limit)

    function renderPages(range: number) {
        let pages_arr: number[] = []
        for (let i = 0; i < TotalPages; i++) {
            if (i >= (PageNum - range) && i <= (PageNum + range)){
                pages_arr.push(i)
            }else if ( PageNum >= TotalPages-range-1 && i >= TotalPages - (range*2)-1){
                pages_arr.push(i)
            }else if( PageNum <= range && i <= range*2){                
                pages_arr.push(i)
            }else if(range == 0){        
                pages_arr.push(i)
            }
        }

        return (
            <>
                {pages_arr.map((num) => {
                    if (num == PageNum) {
                        return (
                            <span className="font-bold text-3xl cursor-pointer">
                                {(num+1) + ' '}
                            </span>)
                    } else {
                        return (
                            <span
                                className="font-normal text-xl cursor-pointer"
                                onClick={() => setPageNum(num)}>
                                {(num+1) + ' '}
                            </span>)
                    }
                })}
            </>
        )

    }
    function renderArr() {
        return (
            <>
                <br />
                {arr.map((row, rowIndex) => {
                    if (rowIndex >= PageNum * limit && rowIndex < (PageNum + 1) * limit) {
                        return func(row, rowIndex)
                    }
                    return (<></>)
                })
                }
            </>
        )

    }
    return { renderPages, renderArr }


}
*/