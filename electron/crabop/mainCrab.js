

const dousei = require('./douseiCrab.js')
const ssd    = require('./ssdCrab.js')
const oldSsd = require("./ssdCrabOld.js")
const utils  = require('./utilCrab.js')
const populate = require('./populateCrab.js')

const XLSX   = require('xlsx')
const XlsxPopulate = require('xlsx-populate')
const path = require("path")



function main(ssdFile, douseiFile, desktopDir, dbFile) {
        let EXTRACT_LIST = [] //この配列の位置に注意!!!

        try{
            ///////////////////////////////SSD file//////////////////////////////////////////
            let workbook = XLSX.readFile(ssdFile)

            const sheet_name_list  = workbook.SheetNames
            const sheet1 = workbook.Sheets[sheet_name_list[0]] 
            
            if(sheet_name_list[0].toLowerCase().includes("ф")) {
                const dateToBeInserted = utils.old_display_date(sheet1)

                ////////////////////////////preparation to dousei////////////////////////////////
                EXTRACT_LIST = oldSsd.extractCrabFromOldSSD(sheet1, dateToBeInserted, EXTRACT_LIST)

                let crab_list = utils.sortout_crab(EXTRACT_LIST)
    
                let matched_lists = utils.detect_fv(crab_list, XLSX, dbFile) //matched_lists = sortedTypeList[0]-obj and reUnknownFVList[1]-arr
                
                console.log("50% completed...")
            
                ///////////////////////////////dousei file///////////////////////////////////////
                populate.loadWorkbookViaPopulate(XlsxPopulate, douseiFile).then(data => {
                    let workbook2   = data[0]
                    let sheet_katsu = data[1]
                    let sheet_boil  = data[2]
                    let sheet_nama  = data[3]
                    
                    let target_date_column = utils.find_column_in_dousei(dateToBeInserted, sheet_katsu, XlsxPopulate) //detect the date in which q'ty is to be written
    
                    dousei.writeToDousei(sheet_katsu, target_date_column, matched_lists, workbook2, dateToBeInserted, desktopDir, sheet_boil, sheet_nama)
    
                    console.log("100% completed...")
                })
                
                return `ファイル「updated-2023ロシア極東オピリオ冷凍品生産状況.xlsx」をデスクトップに保存しました。なお、${matched_lists[1]}が生産船DBに保存されていません。`
                
            }else{
                const dateToBeInserted = utils.display_date(sheet1)

                ////////////////////////////preparation to dousei////////////////////////////////
                EXTRACT_LIST = ssd.extractCrabFromSSD(sheet1, dateToBeInserted, EXTRACT_LIST)
    
                let crab_list = utils.sortout_crab(EXTRACT_LIST)
    
                let matched_lists = utils.detect_fv(crab_list, XLSX, dbFile) //matched_lists = sortedTypeList[0]-obj and reUnknownFVList[1]-arr
                
                console.log("50% completed...")
            
                // ///////////////////////////////dousei file///////////////////////////////////////
                populate.loadWorkbookViaPopulate(XlsxPopulate, douseiFile).then(data => {
                    let workbook2   = data[0]
                    let sheet_katsu = data[1]
                    let sheet_boil  = data[2]
                    let sheet_nama  = data[3]
                    
                    let target_date_column = utils.find_column_in_dousei(dateToBeInserted, sheet_katsu, XlsxPopulate) //detect the date in which q'ty is to be written
    
                    dousei.writeToDousei(sheet_katsu, target_date_column, matched_lists, workbook2, dateToBeInserted, desktopDir, sheet_boil, sheet_nama)
    
                    console.log("100% completed...")
                })
                
                return `ファイル「updated-2023ロシア極東オピリオ冷凍品生産状況.xlsx」をデスクトップに保存しました。なお、${matched_lists[1]}が生産船DBに保存されていません。`
            }

        }catch(e){
            return e
        }

}



exports.main = main





