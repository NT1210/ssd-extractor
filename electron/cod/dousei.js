

const utils  = require('./util.js')

function writeToDousei (sheet2, target_column, matched_list, workbook2, dateToBeInserted, desktopDir) {
    // matched_listの船名とdouseiのD列がマッチするか調べ、マッチしたら対象の行を見つける
    // 行が見つかったら上記target_columnと組み合わせ、数量を転記するセルをあぶりだす。
    // セルが特定できたら転記する。
    // 漁場も同時に記入する。

    for (let i=6; i<200; i++){
        let fvcell = "D"+i
    
        matched_list.forEach(matc =>{
            try{
                if(sheet2.cell(fvcell).value() === matc.f_vessel){
                  
                    let qtty = matc.qtty
                    qtty.toFixed(3) //少数第３位までに固定
                    let new_qtty = 0
                    
                    try{
                        let temp =sheet2.row(i).cell(target_column).value() 
                        new_qtty = temp + qtty
                        new_qtty.toFixed(3)
                        sheet2.row(i).cell(target_column).value(new_qtty)
                    }catch(e){
                        
                    }finally{
                        if (new_qtty > 0){
                            //do nothing
                        }else{
                            sheet2.row(i).cell(target_column).value(qtty)
                        }
                    }
                    
                    let fgcell = "E"+i // fishing ground
                    try{
                        if( sheet2.cell(fgcell).value()){
                            let checkOrigin = (sheet2.cell(fgcell).value()).split('→').slice(-1)[0]
                            let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                           
                           if(fg_date_romoved === matc.f_ground){
                                // do nothing
                           }else{
                            let exsisting_value = sheet2.cell(fgcell).value()
                            let formatted_date = utils.display_date_formatted(dateToBeInserted)
                            let rewrite_value = exsisting_value + "→" + formatted_date + matc.f_ground
                            sheet2.cell(fgcell).value(rewrite_value)
                           }
                           
                        // if nothing witten in f.ground col, just write
                        }else if (sheet2.cell(fgcell).value() === undefined){
                            let formatted_date = utils.display_date_formatted(dateToBeInserted)
                            let newValue = formatted_date + matc.f_ground
                            sheet2.cell(fgcell).value(newValue)
                        }
                    }catch(e){
                        console.log(e)
                    }

                    
                }
            }catch(e){
                
            }
        })
    }

    let outputName = "updated-2023ロシア極東マダラ生産状況.xlsx"
    let exportFileName = desktopDir + "/" + outputName
    workbook2.toFileAsync(exportFileName)

}



exports.writeToDousei = writeToDousei