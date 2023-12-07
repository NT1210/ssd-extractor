
const path = require("path")
async function loadWorkbookViaPopulate (XlsxPopulate, douseiFile) {
        //const p = path.join(__dirname, '2023ロシア極東マダラ生産状況.xlsx')
        const wb = await XlsxPopulate.fromFileAsync(douseiFile)
        const sheet2 = await wb.sheet("2023ロシア極東マダラ")
        
        const arr = [wb, sheet2]
        
        return arr
}


exports.loadWorkbookViaPopulate = loadWorkbookViaPopulate