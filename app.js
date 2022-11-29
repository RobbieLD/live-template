const fill = (input) => {
    const data = JSON.parse(input)
    for (let prop of Object.keys(data)) {
        document.getElementsByClassName(prop)[0].innerHTML = data[prop]
    }
}


const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
}

const getData = () => {
    let data = window.localStorage.getItem('data')

    if (!data) {
        data = prompt('Enter Json Data')
        window.localStorage.setItem('data', data)
    }

    fill(data)
}

const formatDate = (date) => {
    var day = ("0" + date.getDate()).slice(-2)
    var month = ("0" + (date.getMonth() + 1)).slice(-2)
    return date.getFullYear()+"-"+(month)+"-"+(day)
}

const updateRowCost = (row) => {
    const count = Number.parseInt(row.getElementsByClassName("item-number")[0].value)
    const price = Number.parseFloat(row.getElementsByClassName("item-price")[0].value)
    row.getElementsByClassName("item-total")[0].innerHTML = count * price
    calculateTotal()
}

const hookupRowEvents = (row) => {
    row.getElementsByClassName("item-number")[0].addEventListener('input', () => updateRowCost(row))
    row.getElementsByClassName("item-price")[0].addEventListener('input', () => updateRowCost(row))
}

const addZeroes = (num) => {
    return num.toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2})
}

const calculateTotal = () => {
    const totals = document.getElementsByClassName("item-total")

    let total = 0

    Array.prototype.forEach.call(totals, (t) => {
        total += Number.parseFloat(t.innerHTML)
    })

    const placeholders = document.getElementsByClassName("final-total")
    Array.prototype.forEach.call(placeholders, (ph) => {
        ph.innerHTML = "$" + addZeroes(total)
    })
}

const setup = () => {
    document.getElementsByClassName("add-row")[0].addEventListener('click', () => {
        const table = document.getElementsByClassName("items")[0]
        const lastRow = table.rows[table.rows.length - 1]
        const newRow = lastRow.cloneNode(true)
        insertAfter(newRow, lastRow)
        hookupRowEvents(newRow)
    })

    getData()

    document.getElementsByClassName("issuedate")[0].addEventListener('input', (e) => {
        const date = new Date(e.target.value)
        date.setMonth(date.getMonth() + 1)
        document.getElementsByClassName("duedate")[0].value = formatDate(date)
    })

    const rows = document.getElementsByClassName("data-row")

    Array.prototype.forEach.call(rows, (row) => hookupRowEvents(row))
}

setup()
