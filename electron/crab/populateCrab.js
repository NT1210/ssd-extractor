
const path = require("path")
async function loadWorkbookViaPopulate (XlsxPopulate, douseiFile) {
        //const p = path.join(__dirname, '2023ロシア極東マダラ生産状況.xlsx')
        const wb = await XlsxPopulate.fromFileAsync(douseiFile)
        const sheet_katsu = await wb.sheet("活")
        const sheet_boil = await wb.sheet("ボイル")
        const sheet_nama = await wb.sheet("生")
        
        const arr = [wb, sheet_katsu, sheet_boil, sheet_nama]
        
        return arr
}


exports.loadWorkbookViaPopulate = loadWorkbookViaPopulate