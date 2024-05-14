

const dousei = require('./dousei.js')
const ssd    = require('./ssd.js')
const oldSsd = require('./ssdOld.js')
const utils  = require('./util.js')
const populate = require('./populate.js')

const XLSX   = require('xlsx')
const XlsxPopulate = require('xlsx-populate')
const path = require("path")



function main(ssdFile, douseiFile, desktopDir) {
        let EXTRACT_LIST = [] //この配列の位置に注意!!!

        try{
            ///////////////////////////////SSD file//////////////////////////////////////////
            //let p = path.join(__dirname, 'test.xlsx')
            let workbook = XLSX.readFile(ssdFile)

            const sheet_name_list = workbook.SheetNames
            const sheet1          = workbook.Sheets[sheet_name_list[0]]

            if(sheet_name_list[0].toLowerCase().includes("ф")) {
                const dateToBeInserted = utils.old_display_date(sheet1)

                ////////////////////////////preparation to dousei////////////////////////////////
                EXTRACT_LIST = oldSsd.extractCodFromOldSSD(sheet1, dateToBeInserted, EXTRACT_LIST)

                let cod_list = utils.sortout_cod(EXTRACT_LIST)

                let matched_list = utils.detect_fv(cod_list)

                console.log("50% completed...")
            
                ///////////////////////////////dousei file///////////////////////////////////////
                populate.loadWorkbookViaPopulate(XlsxPopulate, douseiFile).then(data => {
                    let workbook2 = data[0]
                    let sheet2 = data[1]
                    let target_column = utils.find_column_in_dousei(dateToBeInserted, sheet2, XlsxPopulate)

                    dousei.writeToDousei(sheet2, target_column, matched_list, workbook2, dateToBeInserted, desktopDir)

                    console.log("100% completed...")            
                })
                
                return "ファイル「updated-2024ロシア極東マダラ生産状況.xlsx」をデスクトップに保存しました。"

            }else{
                const dateToBeInserted = utils.display_date(sheet1)

                ////////////////////////////preparation to dousei////////////////////////////////
                EXTRACT_LIST = ssd.extractCodFromSSD(sheet1, dateToBeInserted, EXTRACT_LIST)

                let cod_list = utils.sortout_cod(EXTRACT_LIST)

                let matched_list = utils.detect_fv(cod_list)

                console.log("50% completed...")
            
                ///////////////////////////////dousei file///////////////////////////////////////
                populate.loadWorkbookViaPopulate(XlsxPopulate, douseiFile).then(data => {
                    let workbook2 = data[0]
                    let sheet2 = data[1]
                    let target_column = utils.find_column_in_dousei(dateToBeInserted, sheet2, XlsxPopulate)

                    dousei.writeToDousei(sheet2, target_column, matched_list, workbook2, dateToBeInserted, desktopDir)

                    console.log("100% completed...")                    
                })
                
                return "ファイル「updated-2024ロシア極東マダラ生産状況.xlsx」をデスクトップに保存しました。"
            }
        }catch(e){
            return e
        }

}



//main()

exports.main = main





