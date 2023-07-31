
import { useState } from "react";

//-------- TYPES ---------------------------------------------------------------------------------
type ShopsFormResp = {
    render: () => JSX.Element
}

//--------------- FUNC ----------------------------------------------------------------------------
/*export function ShopsForm(): ShopsFormResp {
    const [Message, setMessage] = useState('')

    //--------------- PUBLIC ----------------------------------------------------------------------------
    function render() {
        return (
            <input type="text"
                value={Message}
                key="inputMessage"
                onChange={e => { setMessage(e.target.value) }}
            />
        )
    }
    //------------- PRIVATE ----------------------------------------------------------------------

    //------------- return ----------------------------------------------------------------------
    return { render }
}*/