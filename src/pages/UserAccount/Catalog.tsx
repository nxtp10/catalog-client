import { useState, useEffect, useContext } from "react"
import { TCatalogData, TCatalogTemplate, TProduct, TShop, TTplCell, TTplReferences } from "../../api/api_pb";
import * as wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';
//import { AuthCtx, TAuthCtx } from '../../hoc/AuthProvider'
import { TApiCtx, ApiCtx } from '../../api/ApiProvider'
import { useParams } from 'react-router-dom';
//import { Pagination } from '../../components/Pagination'
//import { AccountConfigCtx, TAccountConfigCtx } from "../../hoc/AccountConfigProvider";
import * as inp from '../../components/input'
import * as Styles from '../../components/styles'

//------------- CONST -------------------------------------------------------------------
const RED = "bg-red-300"
const GREEN = "bg-green-300"
const GRAY = "bg-gray-300"
const BLUE = "bg-blue-300"
const DEFAULT_SHOP = new TShop().toObject()
const NULL_CELL: TTplCell.AsObject = { name: "", col: -1, row: -1, enable: false, notnull: false }
const DEFAULT_TPL = new TCatalogTemplate().toObject()
DEFAULT_TPL.references = new TTplReferences().toObject()
const NEW = 'new'
const EDIT = 'edit'
const OPEN = 'open'
const DUPLICATE = 'duplicate'

//-------- TYPES ---------------------------------------------------------------------------------
type ChooseTemplateResult = {
    Tpl: TCatalogTemplate.AsObject | undefined
    reset: () => void
    render: () => JSX.Element
    update: () => void
}

type EditorResp = {
    SelectedTpl: TCatalogTemplate.AsObject | undefined
    setSelectedTpl: React.Dispatch<React.SetStateAction<TCatalogTemplate.AsObject | undefined>>
    setSelectedCell: React.Dispatch<React.SetStateAction<TTplCell.AsObject>>
    render: () => JSX.Element
}
type TableFormResult = {
    Table: string[][]
    SelectedCell: TTplCell.AsObject
    render: () => JSX.Element
}
type TableUploaderResult = {
    upload: () => void
    renderProgressForm: () => JSX.Element
}
/*

//Catalog --------------------------------------------------------------------------------
export function Catalog() {
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const authCtx = useContext(AuthCtx) as TAuthCtx
    const { shopid } = useParams()
    const [Table, setTable] = useState<string[][]>([])
    // const [SelectedCell, setSelectedCell] = useState<UserApi.Cell_t>(NULL_COLROW)
    const [Shop, setShop] = useState(DEFAULT_SHOP)
    const shop_id = Number(shopid)

    const chooseForm = ChooseForm(shop_id)
    const TemplateEditor = Editor(chooseForm, shop_id)
    const tableForm = TableForm(TemplateEditor.SelectedTpl || DEFAULT_TPL)

    useEffect(() => {
        TemplateEditor.setSelectedCell(tableForm.SelectedCell)
    }, [tableForm.SelectedCell])

    return (
        <div className="p-2 m-2">
            <h1>Загрузка каталога</h1>
            <h2>{Shop.name}</h2>
            {chooseForm.render()
            }
            {TemplateEditor.render()
            }
            {tableForm.render()
            }
        </div>
    )
}

//TemplateForm --------------------------------------------------------------------------------
export function Editor(ChooseForm: ChooseTemplateResult, shop_id: number): EditorResp {
    //------------- vars --------------------------------------------------------------------------------------------  
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const authCtx = useContext(AuthCtx) as TAuthCtx
    const accountConfigCtx = useContext(AccountConfigCtx) as TAccountConfigCtx

    //const UniqueCondList = [["name"], ["description1"], ["name", "description1"]]
    const [SelectedTpl, setSelectedTpl] = useState<TCatalogTemplate.AsObject>()
    const [NotNullField, setNotNullField] = useState<{ [key: string]: boolean }>({})
    const [SelectedCell, setSelectedCell] = useState(NULL_CELL)
    const [Mode, setMode] = useState('')
    const [Message, setMessage] = useState('')
    const btnNew = inp.Button(
        'Создать',
        () => {
            setMode(NEW)
            setSelectedTpl({ ...DEFAULT_TPL, shopid: shop_id })
            ChooseForm.reset()
        },
        [],
        { className: [Styles.Btn.Green1, Styles.Btn.Size1].join(' ') }
    )
    const btnEdit = inp.Button(
        'Редактировать',
        () => { setMode(EDIT) },
        [],
        { className: [Styles.Btn.Green1, Styles.Btn.Size1].join(' ') }
    )
    const btnDelete = inp.Button(
        'Удалить',
        () => {
            if (window.confirm('Удалить?')) {
                apiDelTpl(SelectedTpl)
                setSelectedTpl(DEFAULT_TPL)
                ChooseForm.reset()
                ChooseForm.update()
            }
        },
        [],
        { className: [Styles.Btn.Red1, Styles.Btn.Size1].join(' ') }
    )
    const btnSaveNew = inp.Button(
        'Сохранить',
        () => {
            apiNewTpl(SelectedTpl)
            setMode('')
        },
        [],
        { className: [Styles.Btn.Green1, Styles.Btn.Size1].join(' ') }
    )
    const btnSaveEdit = inp.Button(
        'Сохранить',
        () => {
            apiEditTpl(SelectedTpl)
            setMode('')
        },
        [],
        { className: [Styles.Btn.Green1, Styles.Btn.Size1].join(' ') }
    )
    const btnCancel = inp.Button(
        'Отмена',
        () => {
            if (Mode == NEW) {
                setSelectedTpl(undefined)
            }
            setMode('')
        },
        [],
        { className: [Styles.Btn.Red1, Styles.Btn.Size1].join(' ') }
    )



    //------------- useEffect -----------------------------------------------------------
    useEffect(() => {
        if (ChooseForm.Tpl != undefined) {
            setSelectedTpl(ChooseForm.Tpl)
            setMode('')
        }
    }, [ChooseForm.Tpl])
    useEffect(() => {
        //console.log("Mode:", Mode)
    }, [Mode])
    useEffect(() => {
        //console.log("SelectedTpl: ", SelectedTpl)
    }, [SelectedTpl])
    useEffect(() => {
        //console.log("SelectedCell: ", SelectedCell)
    }, [SelectedCell])


    //---------- PUBLIC -------------------------------------------------------------------
    //отрисовка полей формы шаблона
    function render() {
        return (
            <>
                {(SelectedTpl != undefined) &&
                    <>
                        {Fields(Mode != '')}
                        {(Message != '') && <p>{Message}</p>}
                    </>}
                {Buttons()}
            </>
        )
    }

    //---------- Private -------------------------------------------------------------------------
    function Fields(editable: boolean) {
        const separator = ", "
        //название шаблона
        const NameField = (editable: boolean) => {
            if (SelectedTpl != undefined) {
                return (
                    <tr>
                        <td>
                            Шаблон
                        </td>
                        <td>
                            {editable
                                ? <input type="text"
                                    className={[Styles.Inp.v1].join(' ')}
                                    value={SelectedTpl.name}
                                    onChange={(e) => { setSelectedTpl({ ...SelectedTpl, name: e.target.value }) }} />
                                : <input type="text"
                                    className={[Styles.Inp.v1].join(' ')}
                                    value={SelectedTpl.name}
                                    readOnly />}
                        </td>
                    </tr>
                )
            } else {
                return (
                    <>
                    </>
                )
            }

        }
        //поля references
        const referencesFields = (field: keyof TTplReferences.AsObject, editable: boolean) => {
            if (SelectedTpl != undefined && SelectedTpl.references != undefined) {
                let color = ''
                let name = ''
                for (const key of accountConfigCtx.ProductFields) {
                    if (key.getAsobjectname() == field) {
                        color = key.getColor()
                        name = key.getName()
                        break
                    }
                }
                const col_name = SelectedTpl.references[field]?.name
                const row = SelectedTpl.references[field]?.row
                const col = SelectedTpl.references[field]?.col
                const enable = SelectedTpl.references[field]?.enable
                return (
                    <tr key={field}>
                        <td>
                            {name}
                        </td>
                        <td>
                            <input type="text"
                                className={[Styles.Inp.v1].join(' ')}
                                value={
                                    (enable == true)
                                        ? `${col_name} (${row},${col})`
                                        : ""
                                }
                                onChange={() => { }} />
                        </td>
                        {editable &&
                            <>
                                <td>
                                    <button className={[Styles.Btn.Green1, Styles.Btn.Size1].join(' ')}
                                        onClick={() => {
                                            setSelectedTpl({ ...SelectedTpl, references: { ...SelectedTpl.references, [field]: SelectedCell } })
                                        }}>
                                        Set</button>
                                </td>
                                <td>
                                    <button className={[Styles.Btn.Red1, Styles.Btn.Size1].join(' ')}
                                        onClick={() => { setSelectedTpl({ ...SelectedTpl, references: { ...SelectedTpl.references, [field]: NULL_CELL } }) }}>
                                        X</button>
                                    <br />
                                </td>
                                <td>
                                    <button
                                        className={"m-1 p-1 rounded-sm ".concat((NotNullField[field] == true) ? BLUE : GRAY)}
                                        onClick={() => {
                                            setNotNullField({ ...NotNullField, [field]: !NotNullField[field] })
                                        }}>
                                        Обязательное поле</button>
                                    <br />
                                </td>
                            </>
                        }
                    </tr>
                )
            } else {
                return (<></>)
            }
        }
        //условие уникальности
        function Unique(editable: boolean) {
            function option(fields: string[]) {
                return (
                    <option value={fields.join(separator)} key={fields.join(separator)}>
                        {uniqueConditionToHumanName(fields).join(separator)}
                    </option>
                )
            }
            function uniqueConditionToHumanName(fields: string[]) {
                const arr: string[] = []
                fields.forEach(x => {
                    accountConfigCtx.ProductFields.forEach(y => {
                        if (x == y.getDbname()) {
                            arr.push(y.getName())
                        }
                    })
                });
                return arr
            }

            if (SelectedTpl != undefined) {
                return (
                    <>
                        <tr>
                            <td>
                                Условие уникальности
                            </td>
                            <td>
                                {editable
                                    ? <select
                                        className="border rounded-sm"
                                        value={SelectedTpl.uniqueconditionList.join(separator)}
                                        onChange={(e) => { setSelectedTpl({ ...SelectedTpl, uniqueconditionList: (e.target.value).split(separator) }) }}>
                                        <option value="">Выберите условие уникальности</option>
                                        {accountConfigCtx.UniqueConditionList.map((condition) => {
                                            return (
                                                <>
                                                    {option(condition.toObject().fieldsList)}
                                                </>
                                            )
                                        })}
                                    </select>
                                    : <input type="text"
                                        className='m-1 p-1 border'
                                        value={uniqueConditionToHumanName(SelectedTpl.uniqueconditionList).join(separator)}
                                        onChange={() => { }} />
                                }
                            </td>
                        </tr>
                    </>


                )
            } else {
                return (<></>)
            }

        }
        //return
        if (SelectedTpl != undefined && SelectedTpl.references != undefined) {
            return (
                <>
                    <table>
                        <tbody>
                            {NameField(editable)}
                            {accountConfigCtx.ProductFields.map((k) => referencesFields(k.getAsobjectname() as keyof TTplReferences.AsObject, editable))
                            }
                            {Unique(editable)
                            }
                        </tbody>
                    </table>
                </>
            )
        } else {
            return (<></>)
        }
    }
    function Buttons() {
        if (SelectedTpl == undefined) {
            return (
                btnNew.render()
            )
        } else if (Mode == NEW && SelectedTpl != undefined) {
            return (
                <>
                    {btnSaveNew.render()}
                    {btnCancel.render()}
                </>
            )
        } else if (Mode == EDIT && SelectedTpl != undefined) {
            return (
                <>
                    {btnSaveEdit.render()}
                    {btnCancel.render()}
                </>
            )
        } else if (Mode == '' && SelectedTpl != undefined && SelectedTpl != DEFAULT_TPL) {
            return (
                <>
                    {btnNew.render()}
                    {btnEdit.render()}
                    {btnDelete.render()}
                </>
            )
        }
    }
    function apiNewTpl(t: TCatalogTemplate.AsObject | undefined) {
        if (t) {
            apiCtx.userClient.newTemplate(ObjToClass(t), apiCtx.getMetadata(authCtx.SessionId))
                .then((resp) => {
                    ChooseForm.update()
                })
                .catch((err) => {
                    setMessage('Ошибка создания шаблона: ' + err)
                })
        }
    }
    function apiEditTpl(t: TCatalogTemplate.AsObject | undefined) {
        if (t) {
            apiCtx.userClient.editTemplate(ObjToClass(t), apiCtx.getMetadata(authCtx.SessionId))
                .then((resp) => {
                    ChooseForm.update()
                })
                .catch((err) => {
                    setMessage('Ошибка сохранения шаблона: ' + err)
                })
        }
    }
    function apiDelTpl(t: TCatalogTemplate.AsObject | undefined) {
        if (t) {
            const req = new wrappers_pb.Int32Value
            req.setValue(t.id)
            apiCtx.userClient.delTemplate(req, apiCtx.getMetadata(authCtx.SessionId))
                .then((resp) => {
                    ChooseForm.update()
                })
                .catch((err) => {
                    setMessage('Ошибка удаления шаблона: ' + err)
                })
        }
    }



    //-------- return ---------------------------------------------------------------------------
    return {
        SelectedTpl,
        setSelectedTpl,
        setSelectedCell,
        render,
    }
    //------------------------------------------------------------------------
}

//TableForm --------------------------------------------------------------------------------
export function TableForm(SelectedTpl: TCatalogTemplate.AsObject): TableFormResult {
    //------------- vars --------------------------------------------------------------------------------------------   
    const [CellBGColor, setCellBGColor] = useState<{ [key: string]: string }>({})
    const [Table, setTable] = useState<string[][]>([])
    const [SelectedCell, setSelectedCell] = useState(NULL_CELL)
    const tableUploader = TableUploader(Table, SelectedTpl)
    const pagination = Pagination(Table, 20, DrawRow)

    //------------- useEffect ----------------------------------------------------------- 

    //---------- PUBLIC -------------------------------------------------------------------
    function render() {
        return (
            <div className="block">
                {buttons()}
                {tableUploader.renderProgressForm()}
                {table()}
            </div>
        )
    }

    //---------- Private -------------------------------------------------------------------------
    function buttons() {
        return (
            <>
                {(SelectedTpl != undefined && Table.length == 0) &&
                    <input className='m-1 p-1 rounded-sm bg-red-300'
                        type="file"
                        onChange={(e) => { openCSVFile(e, setTable) }} />}
                {(Table.length > 0) &&
                    <>
                        <button className='m-1 p-1 rounded-sm bg-green-400'
                            onClick={() => { tableUploader.upload() }}>
                            Загрузить каталог</button>
                        <button className='m-1 p-1 rounded-sm bg-green-400'
                            onClick={() => { setTable([]) }}>
                            Закрыть файл</button>
                    </>
                }
            </>
        )
    }
    function table() {

        return (
            <>
                {(Table.length > 0) &&
                    <>
                        {pagination.renderPages(3)}
                        <table>
                            <tbody>
                                {pagination.renderArr()}
                            </tbody>
                        </table>
                    </>
                }
            </>
        )
    }
    function DrawRow(row: string[], rowIndex: number): JSX.Element {
        return (<tr
            className="p-2"
            key={"row:" + rowIndex}>
            <td>{rowIndex}</td>
            {row.map((cell, colIndex) => {
                const cellKey = "cell:" + colIndex + "," + rowIndex
                return (
                    <td
                        className={"p-2 border " + CellBGColor[cellKey]}
                        key={cellKey}
                        onClick={(e) => {
                            setSelectedCell({ name: e.currentTarget.innerText, col: colIndex, row: rowIndex, enable: true, notnull: false })
                            setCellBGColor({ [cellKey]: GREEN })
                        }}
                    >
                        {cell}</td>
                )
            })}</tr>)
    }

    //-------- return ---------------------------------------------------------------------------
    return {
        Table,
        SelectedCell,
        render,
    }
}


function TableUploader(Table: string[][], SelectedTpl: TCatalogTemplate.AsObject): TableUploaderResult {
    //------------- vars ------------------------------------------------------------------          
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const authCtx = useContext(AuthCtx) as TAuthCtx
    const accountConfigCtx = useContext(AccountConfigCtx) as TAccountConfigCtx
    const [Error, setError] = useState<string | undefined>()
    //------------- useEffect ----------------------------------------------------------- 

    //---------- PUBLIC -------------------------------------------------------------------
    function upload() {
        //console.log("SelectedTpl:", SelectedTpl)
        ////console.log("Table:",Table.toString())

        //поиск наибольшего номера строки с заголовком в шаблоне
        const ref = SelectedTpl.references
        let maxHeaderRow = 0
        if (ref != undefined) {
            maxHeaderRow = Math.max(...Object.values(ref).map((value) => value.row))
        }
        //забиваем таблицу значениями
        let table = Table
            .slice(maxHeaderRow + 1, 10)
            .map((row) => {
                const prod = new TProduct()
                if (ref == undefined) {
                    return prod
                }
                if (ref.name?.enable) {
                    prod.setName(row[ref.name?.col || 0])
                }
                if (ref.artnum?.enable) {
                    prod.setArtnum(row[ref.artnum?.col || 0])
                }
                if (ref.price?.enable) {
                    const num = Number(row[ref.price?.col || 0])
                    if (num != NaN) {
                        prod.setPrice(0)
                    } else {
                        prod.setPrice(0)
                    }
                }
                if (ref.currency?.enable) {
                    prod.setCurrency(row[ref.currency?.col || 0])
                }
                if (ref.quantity?.enable) {
                    const num = Number(row[ref.quantity?.col || 0])
                    if (num != NaN) {
                        prod.setQuantity(0)
                    } else {
                        prod.setQuantity(0)
                    }
                }
                if (ref.unit?.enable) {
                    prod.setUnit(row[ref.unit?.col || 0])
                }
                if (ref.description1?.enable) {
                    prod.setDescription1(row[ref.description1?.col || 0])
                }
                if (ref.description2?.enable) {
                    prod.setDescription2(row[ref.description2?.col || 0])
                }
                ////console.log(r)
                return prod
            })
        const data = new TCatalogData()
        data.setProductsList(table)
        data.setTemplate(ObjToClass(SelectedTpl))
        //console.log('TableUploader: upload(): data:', data)
        apiCtx.userClient.uploadCatalog(data, apiCtx.getMetadata(authCtx.SessionId))
            .then(() => {
                //console.log('TableUploader: upload(): Данные загружены')
            })
            .catch((err) => {
                //console.log('TableUploader: upload(): err: ', err)
            })
    }

    function renderProgressForm() {
        return (
            <div className="block">
                <p>
                    {Error && Error}
                </p>
            </div>
        )
    }
    //---------- Private -------------------------------------------------------------------------
    function check() {
    }

    //-------- return ---------------------------------------------------------------------------
    return {
        renderProgressForm: renderProgressForm,
        upload: upload,
    }
}

//parseCSV --------------------------------------------------------------------------------
export function parseCSV(FileText: string, setResult: React.Dispatch<React.SetStateAction<string[][]>>) {
    const table =
        FileText
            .replaceAll("\r", "")
            .split("\n")
            .map((row) => {
                return row.split(";")
            })
    setResult(table)

}

//openCSVFile --------------------------------------------------------------------------------
export function openCSVFile(e: React.ChangeEvent<HTMLInputElement>, setResult: React.Dispatch<React.SetStateAction<string[][]>>) {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = (e) => {
        const text = (e.target?.result) as string
        parseCSV(text, setResult)
    };
    const data: FileList = e.target.files as FileList
    reader.readAsText(data[0], "windows-1251")
}

//ChooseTemplate --------------------------------------------------------------------------------
function ChooseForm(shop_id: number): ChooseTemplateResult {
    //------------- VARS -------------------------------------------------------------------
    const apiCtx = useContext(ApiCtx) as TApiCtx
    const authCtx = useContext(AuthCtx) as TAuthCtx
    const [Templates, setTemplates] = useState<TCatalogTemplate.AsObject[]>([])
    const [BGColor, setBGcolor] = useState<{ [key: string]: string }>({})
    const [SelectedTpl, setSelectedTpl] = useState<TCatalogTemplate.AsObject>()
    const [Message, setMessage] = useState('')

    //------------- useEffect -----------------------------------------------------------
    useEffect(() => {
        update()
    }, [shop_id])

    //---------- PUBLIC -------------------------------------------------------------------
    function render() {//отрисовка формы
        return (
            <>
                <p>Список шаблонов:</p>
                <div className="p-2 block w-96 h-32 border rounded overflow-y-auto" >
                    {(Message != '') && <p>{Message}</p>}
                    {TplList()
                    }
                </div>
            </>
        )
    }
    function update() {
        const req = new wrappers_pb.Int32Value
        req.setValue(shop_id)
        apiCtx.userClient.getTemplates(req, apiCtx.getMetadata(authCtx.SessionId))
            .then((resp) => {
                setTemplates(resp.toObject().valueList)
            })
            .catch((err) => {
                setTemplates([])
                setMessage('Ошибка загрузки данных: ' + err)
            })
    }
    function reset() {//сброс подсветки шаблона
        setBGcolor({})
        setSelectedTpl(undefined)
    }

    //---------- Private -------------------------------------------------------------------------
    function TplList() {
        return (
            <>
                {(Templates.length == 0)
                    ? <p>Шаблоны отсутствуют</p>
                    : Templates.map((tpl) => {
                        return (
                            <p key={tpl.id}
                                className={['cursor-pointer', BGColor[tpl.id]].join(' ')}
                                onClick={() => {
                                    setSelectedTpl(tpl)
                                    setBGcolor({ [tpl.id]: GRAY })
                                }}>
                                {tpl.name}
                            </p>
                        )
                    })
                }

            </>
        )
    }


    //---------- Return -----------------------------------------------------------------------
    return {
        render: render,
        reset: reset,
        Tpl: SelectedTpl,
        update: update
    }

}

function ObjToClass(t: TCatalogTemplate.AsObject): TCatalogTemplate {
    const req = new TCatalogTemplate
    const references = new TTplReferences
    const cell = new TTplCell

    if (t.references?.name?.name != undefined) { cell.setName(t.references?.name?.name) }
    if (t.references?.name?.col != undefined) { cell.setCol(t.references?.name?.col) }
    if (t.references?.name?.row != undefined) { cell.setRow(t.references?.name?.row) }
    if (t.references?.name?.enable != undefined) { cell.setEnable(t.references?.name?.enable) }
    if (t.references?.name?.notnull != undefined) { cell.setNotnull(t.references?.name?.notnull) }
    references.setName(cell.clone())

    if (t.references?.artnum?.name != undefined) { cell.setName(t.references?.artnum?.name) }
    if (t.references?.artnum?.col != undefined) { cell.setCol(t.references?.artnum?.col) }
    if (t.references?.artnum?.row != undefined) { cell.setRow(t.references?.artnum?.row) }
    if (t.references?.artnum?.enable != undefined) { cell.setEnable(t.references?.artnum?.enable) }
    if (t.references?.artnum?.notnull != undefined) { cell.setNotnull(t.references?.artnum?.notnull) }
    references.setArtnum(cell.clone())

    if (t.references?.price?.name != undefined) { cell.setName(t.references?.price?.name) }
    if (t.references?.price?.col != undefined) { cell.setCol(t.references?.price?.col) }
    if (t.references?.price?.row != undefined) { cell.setRow(t.references?.price?.row) }
    if (t.references?.price?.enable != undefined) { cell.setEnable(t.references?.price?.enable) }
    if (t.references?.price?.notnull != undefined) { cell.setNotnull(t.references?.price?.notnull) }
    references.setPrice(cell.clone())

    if (t.references?.currency?.name != undefined) { cell.setName(t.references?.currency?.name) }
    if (t.references?.currency?.col != undefined) { cell.setCol(t.references?.currency?.col) }
    if (t.references?.currency?.row != undefined) { cell.setRow(t.references?.currency?.row) }
    if (t.references?.currency?.enable != undefined) { cell.setEnable(t.references?.currency?.enable) }
    if (t.references?.currency?.notnull != undefined) { cell.setNotnull(t.references?.currency?.notnull) }
    references.setCurrency(cell.clone())

    if (t.references?.quantity?.name != undefined) { cell.setName(t.references?.quantity?.name) }
    if (t.references?.quantity?.col != undefined) { cell.setCol(t.references?.quantity?.col) }
    if (t.references?.quantity?.row != undefined) { cell.setRow(t.references?.quantity?.row) }
    if (t.references?.quantity?.enable != undefined) { cell.setEnable(t.references?.quantity?.enable) }
    if (t.references?.quantity?.notnull != undefined) { cell.setNotnull(t.references?.quantity?.notnull) }
    references.setQuantity(cell.clone())

    if (t.references?.unit?.name != undefined) { cell.setName(t.references?.unit?.name) }
    if (t.references?.unit?.col != undefined) { cell.setCol(t.references?.unit?.col) }
    if (t.references?.unit?.row != undefined) { cell.setRow(t.references?.unit?.row) }
    if (t.references?.unit?.enable != undefined) { cell.setEnable(t.references?.unit?.enable) }
    if (t.references?.unit?.notnull != undefined) { cell.setNotnull(t.references?.unit?.notnull) }
    references.setUnit(cell.clone())

    if (t.references?.description1?.name != undefined) { cell.setName(t.references?.description1?.name) }
    if (t.references?.description1?.col != undefined) { cell.setCol(t.references?.description1?.col) }
    if (t.references?.description1?.row != undefined) { cell.setRow(t.references?.description1?.row) }
    if (t.references?.description1?.enable != undefined) { cell.setEnable(t.references?.description1?.enable) }
    if (t.references?.description1?.notnull != undefined) { cell.setNotnull(t.references?.description1?.notnull) }
    references.setDescription1(cell.clone())

    if (t.references?.description2?.name != undefined) { cell.setName(t.references?.description2?.name) }
    if (t.references?.description2?.col != undefined) { cell.setCol(t.references?.description2?.col) }
    if (t.references?.description2?.row != undefined) { cell.setRow(t.references?.description2?.row) }
    if (t.references?.description2?.enable != undefined) { cell.setEnable(t.references?.description2?.enable) }
    if (t.references?.description2?.notnull != undefined) { cell.setNotnull(t.references?.description2?.notnull) }
    references.setDescription2(cell.clone())


    req.setId(t.id)
    req.setName(t.name)
    req.setUniqueconditionList(t.uniqueconditionList)
    req.setShopid(t.shopid)
    req.setReferences(references)
    //console.log("ObjToClass: ", req)
    return req
}

*/