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
    let data = getCookie('data')

    if (!data) {
        data = prompt('Enter Json Data')
        setCookie('data', data, 180)
    }

    fill(data)
}

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const setup = () => {
    document.getElementsByClassName("add-row")[0].addEventListener('click', () => {
        const table = document.getElementsByClassName("items")[0]
        const lastRow = table.rows[table.rows.length - 1]
        const newRow = lastRow.cloneNode(true)
        insertAfter(newRow, lastRow)
    })

    getData()

    // Hook up date and value calculation handlers
}

setup()
