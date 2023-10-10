const utils  = require('./utilCrab.js')

function writeToDousei (sheet_katsu, target_date_column, matched_lists, workbook2, dateToBeInserted, desktopDir, sheet_boil, sheet_nama) {

    funcKatsu(sheet_katsu, target_date_column, matched_lists, workbook2, dateToBeInserted, desktopDir)
    funcBoil(sheet_boil, target_date_column, matched_lists, workbook2, dateToBeInserted, desktopDir)
    funcNama(sheet_nama, target_date_column, matched_lists, workbook2, dateToBeInserted, desktopDir)

    let outputName = "updated-2023ロシア極東オピリオ冷凍品生産状況.xlsx"
    let exportFileName = desktopDir + "/" + outputName

    workbook2.toFileAsync(exportFileName)
}


function funcKatsu (sheet_katsu, target_date_column, matched_lists, workbook2, dateToBeInserted, desktopDir){
    let producer_column = 2
    let vessel_column = 3
    let f_ground_column = 4
    let type_column = 5 //taraba or opilio
    let processing_type_column = 6
    let size_column = 7
    
    let sortedTypeListObj = matched_lists[0] //katsu, nama, boil lists in obj
    let revUnknownFVList = matched_lists[1]
    
    sortedTypeListObj.katsu.forEach(katsu => {
        let check = {doubled: false, row: 0} //check whether or not current f/v is already in excel
        let done = false

        try{
            for(let i=7; i<101; i++){ 
                if(sheet_katsu.row(i).cell(vessel_column).value() === katsu.f_vessel){
                    check["doubled"] = true
                    check["row"] = i
                   
                    break
                }else{
                    // do nothing
                }
            }
            //amur duplicated so need to identify which producer the f/v belongs to (important)
            if(check.doubled){
                for(let i=0; i<100; i++){
                    if(sheet_katsu.row(check.row+i).cell(producer_column).value() === katsu.producer && 
                        sheet_katsu.row(check.row+i).cell(vessel_column).value() === katsu.f_vessel ){

                        sheet_katsu.row(check.row+i).cell(target_date_column).value(katsu.qtty)

                        // below is about fishing ground
                        if( sheet_katsu.row(check.row+i).cell(f_ground_column).value() !== undefined){
                            let checkOrigin = sheet_katsu.row(check.row+i).cell(f_ground_column).value().split('→').slice(-1)[0]
                            let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                            
                            if(fg_date_romoved === katsu.f_ground){
                                // do nothing
                            }else{
                                let exsisting_value = sheet_katsu.row(check.row+i).cell(f_ground_column).value()
                                let formatted_date = utils.display_date_formatted(dateToBeInserted)
                                let rewrite_value = exsisting_value + "→" + formatted_date + katsu.f_ground
                                sheet_katsu.row(check.row+i).cell(f_ground_column).value(rewrite_value)
                            }

                        // if nothing witten in f.ground col, just write
                        }else if (sheet_katsu.row(check.row+i).cell(f_ground_column).value() === undefined){
                            let formatted_date = utils.display_date_formatted(dateToBeInserted)
                            let newValue = formatted_date + katsu.f_ground
                            sheet_katsu.row(check.row+i).cell(f_ground_column).value(newValue)
                        }
                        
                        done = true

                        break
                    }else{
                        // do nothing, continue
                    }
                }

                if(!done){
                    for(let i=7; i<101; i++){
                        if(sheet_katsu.row(i).cell(vessel_column).value() === undefined){
    
                            sheet_katsu.row(i).cell(producer_column).value(katsu.producer)
                            sheet_katsu.row(i).cell(vessel_column).value(katsu.f_vessel)

                            sheet_katsu.row(i).cell(type_column).value("オピリオ")
                            sheet_katsu.row(i).cell(processing_type_column).value("活")
                            sheet_katsu.row(i).cell(size_column).value("N/A")
                            
                            sheet_katsu.row(i).cell(target_date_column).value(katsu.qtty)
    
                            // below is about fishing ground
                            if( sheet_katsu.row(i).cell(f_ground_column).value() !== undefined){
                                let checkOrigin = sheet_katsu.row(i).cell(f_ground_column).value().split('→').slice(-1)[0]
                                let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                                
                                if(fg_date_romoved === katsu.f_ground){
                                    // do nothing
                                }else{
                                    let exsisting_value = sheet_katsu.row(i).cell(f_ground_column).value()
                                    let formatted_date = utils.display_date_formatted(dateToBeInserted)
                                    let rewrite_value = exsisting_value + "→" + formatted_date + katsu.f_ground
                                    sheet_katsu.row(i).cell(f_ground_column).value(rewrite_value)
                                }
                                
                            // if nothing witten in f.ground col, just write
                            }else if (sheet_katsu.row(i).cell(f_ground_column).value() === undefined){
                                let formatted_date = utils.display_date_formatted(dateToBeInserted)
                                let newValue = formatted_date + katsu.f_ground
                                sheet_katsu.row(i).cell(f_ground_column).value(newValue)
                            }
                            
                            break 
                        }else{
                            //do nothing
                        }
                    }
                }
            }else{
                for(let i=7; i<101; i++){
                    if(sheet_katsu.row(i).cell(vessel_column).value() === undefined ){

                        sheet_katsu.row(i).cell(producer_column).value(katsu.producer)
                        sheet_katsu.row(i).cell(vessel_column).value(katsu.f_vessel)

                        sheet_katsu.row(i).cell(type_column).value("オピリオ")
                        sheet_katsu.row(i).cell(processing_type_column).value("活")
                        sheet_katsu.row(i).cell(size_column).value("N/A")
                        sheet_katsu.row(i).cell(target_date_column).value(katsu.qtty)

                        // below is about fishing ground
                        if( sheet_katsu.row(i).cell(f_ground_column).value() !== undefined){
                            let checkOrigin = sheet_katsu.row(i).cell(f_ground_column).value().split('→').slice(-1)[0]
                            let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                            
                            if(fg_date_romoved === katsu.f_ground){
                                // do nothing
                            }else{
                                let exsisting_value = sheet_katsu.row(i).cell(f_ground_column).value()
                                let formatted_date = utils.display_date_formatted(dateToBeInserted)
                                let rewrite_value = exsisting_value + "→" + formatted_date + katsu.f_ground
                                sheet_katsu.row(i).cell(f_ground_column).value(rewrite_value)
                            }
                            
                        // if nothing witten in f.ground col, just write
                        }else if (sheet_katsu.row(i).cell(f_ground_column).value() === undefined){
                            let formatted_date = utils.display_date_formatted(dateToBeInserted)
                            let newValue = formatted_date + katsu.f_ground
                            sheet_katsu.row(i).cell(f_ground_column).value(newValue)
                        }

                        break 
                    }else{
                        //do nothing
                    }
                }
            }
        }catch(e){
            console.log(e)
        }
    })   
}

function funcBoil(sheet_boil, target_date_column, matched_lists, workbook2, dateToBeInserted, desktopDir){
    let producer_column = 2
    let vessel_column = 3
    let f_ground_column = 4
    let type_column = 5 //taraba or opilio
    let processing_type_column = 6
    let size_column = 7

    let sortedTypeListObj = matched_lists[0] //katsu, nama, boil lists in obj
    let revUnknownFVList = matched_lists[1]

    const order = ["6L", "5L", "4L", "3L", "2L", "L", "M", "H", "М", "Н", "клешненосн", "ходильн"]

    sortedTypeListObj.boil.sort((x,y) => {
        return order.indexOf(x.product.split(" ").slice(-1)[0]) - order.indexOf(y.product.split(" ").slice(-1)[0])
    })

    sortedTypeListObj.boil.forEach(boil => {
        let check = { //check whether or not current f/v is already in excel, we have to define check obj here so it will be reset on each loop
            doubled: false, 
            row: 0
        } 

        try{
            for(let i=7; i<201; i++){ 
                if(sheet_boil.row(i).cell(vessel_column).value() === boil.f_vessel){
                    check["doubled"] = true
                    check["row"] = i   

                    break // realy important !!!
                }else{
                    // do nothing
                }
            }
        }catch(e){
            console.log(e)
        }

        try{
            if(check.doubled){
               
                let target_size_list = ["6L", "5L", "4L", "3L", "2L", "L", "M", "H", "М", "Н", "клешненосн", "ходильн"] //M and H rus eng mixed
                let splitted_product_arr = boil.product.split(" ")
                let size_detected = splitted_product_arr.filter(ele => {
                    return target_size_list.indexOf(ele) !== -1
                })
         
                size_detected = size_detected.slice(-1)[0]

                if(size_detected === "клешненосн") size_detected = "爪下"
                if(size_detected === "ходильн") size_detected = "肩肉＋小指"

                if( sheet_boil.row(check.row).cell(producer_column).value() === boil.producer && sheet_boil.row(check.row).cell(size_column).value() === size_detected){

                    sheet_boil.row(check.row).cell(target_date_column).value(boil.qtty)

                    // below is about fishing ground
                    if( sheet_boil.row(check.row).cell(f_ground_column).value()){
                        let checkOrigin = sheet_boil.row(check.row).cell(f_ground_column).value().split('→').slice(-1)[0]
                        let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                        
                        if(fg_date_romoved === boil.f_ground){
                            // do nothing
                        }else{
                            let exsisting_value = sheet_boil.row(check.row).cell(f_ground_column).value()
                            let formatted_date = utils.display_date_formatted(dateToBeInserted)
                            let rewrite_value = exsisting_value + "→" + formatted_date + boil.f_ground
                            sheet_boil.row(check.row).cell(f_ground_column).value(rewrite_value)
                        }
                        
                    // if nothing witten in f.ground col, just write
                    }else if (sheet_boil.row(check.row).cell(f_ground_column).value() === undefined){
                        let formatted_date = utils.display_date_formatted(dateToBeInserted)
                        let newValue = formatted_date + boil.f_ground
                        sheet_boil.row(check.row).cell(f_ground_column).value(newValue)
                    }

                }else{
                    for(let j=1; j<9; j++){
                        if(sheet_boil.row(check.row+j).cell(vessel_column).value() === undefined){
                            
                            sheet_boil.row(check.row+j).cell(producer_column).value(boil.producer)
                            sheet_boil.row(check.row+j).cell(vessel_column).value(boil.f_vessel)
                            sheet_boil.row(check.row+j).cell(type_column).value("オピリオ")
                            sheet_boil.row(check.row+j).cell(processing_type_column).value("ボイル")
                            sheet_boil.row(check.row+j).cell(size_column).value(size_detected)
                            sheet_boil.row(check.row+j).cell(target_date_column).value(boil.qtty)

                            // convert from ru to jp if product name is one of the three products below
                            if(size_detected === "клешненосн") sheet_boil.row(check.row+j).cell(size_column).value("爪下")
                            if(size_detected === "ходильн") sheet_boil.row(check.row+j).cell(size_column).value("肩肉＋小指")

                            if( sheet_boil.row(check.row+j).cell(f_ground_column).value()){
                                let checkOrigin = sheet_boil.row(check.row+j).cell(f_ground_column).value().split('→').slice(-1)[0]
                                let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                                
                                if(fg_date_romoved === boil.f_ground){
                                    // do nothing
                                }else{
                                    let exsisting_value = sheet_boil.row(check.row+j).cell(f_ground_column).value()
                                    let formatted_date = utils.display_date_formatted(dateToBeInserted)
                                    let rewrite_value = exsisting_value + "→" + formatted_date + boil.f_ground
                                    sheet_boil.row(check.row+j).cell(f_ground_column).value(rewrite_value)
                                }
                                
                            // if nothing witten in f.ground col, just write
                            }else if (sheet_boil.row(check.row+j).cell(f_ground_column).value() === undefined){
                                let formatted_date = utils.display_date_formatted(dateToBeInserted)
                                let newValue = formatted_date + boil.f_ground
                                sheet_boil.row(check.row+j).cell(f_ground_column).value(newValue)
                            }

                            break
                        }else{
                            if(sheet_boil.row(check.row+j).cell(size_column).value() === size_detected){
                                sheet_boil.row(check.row+j).cell(target_date_column).value(boil.qtty)
                                break 
                            }
                        }
                    }
                }
                
            }else{ // if current target vessel is not yet on the list of excel file

                let target_size_list = ["6L", "5L", "4L", "3L", "2L", "L", "M", "H", "М", "Н", "клешненосн", "ходильн"] //M and H rus eng mixed
                let splitted_product_arr = boil.product.split(" ")
                let size_detected = splitted_product_arr.filter(ele => {
                    return target_size_list.indexOf(ele) !== -1
                })

                size_detected = size_detected.slice(-1)[0]

                if(size_detected === "клешненосн") size_detected = "爪下"
                if(size_detected === "ходильн") size_detected = "肩肉＋小指"
                
                let written_vessel_positions = []

                for(let i=7; i<201; i++){
                    if(sheet_boil.row(i).cell(vessel_column).value() !== undefined ) {
                        written_vessel_positions.push(i)
                    }else{
                        // do nothing
                    }
                }

                let lowest_bottom_row = written_vessel_positions.reduce((prev, curr) => {
                    return prev < curr ? curr : prev
                }, 0)
                
                if(lowest_bottom_row <= 0){

                    sheet_boil.row(7).cell(producer_column).value(boil.producer)
                    sheet_boil.row(7).cell(vessel_column).value(boil.f_vessel)
                    sheet_boil.row(7).cell(type_column).value("オピリオ")
                    sheet_boil.row(7).cell(processing_type_column).value("ボイル")
                    sheet_boil.row(7).cell(size_column).value(size_detected)
                    sheet_boil.row(7).cell(target_date_column).value(boil.qtty)

                    if( sheet_boil.row(7).cell(f_ground_column).value()){
                        let checkOrigin = sheet_boil.row(7).cell(f_ground_column).value().split('→').slice(-1)[0]
                        let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                        
                        if(fg_date_romoved === boil.f_ground){
                            // do nothing
                        }else{
                            let exsisting_value = sheet_boil.row(7).cell(f_ground_column).value()
                            let formatted_date = utils.display_date_formatted(dateToBeInserted)
                            let rewrite_value = exsisting_value + "→" + formatted_date + boil.f_ground
                            sheet_boil.row(7).cell(f_ground_column).value(rewrite_value)
                        }
                        
                    // if nothing witten in f.ground col, just write
                    }else if (sheet_boil.row(7).cell(f_ground_column).value() === undefined){
                        let formatted_date = utils.display_date_formatted(dateToBeInserted)
                        let newValue = formatted_date + boil.f_ground
                        sheet_boil.row(7).cell(f_ground_column).value(newValue)
                    }

                }else{

                    //detect the target row where the new f/v is written
                    let max_count_for_space = 14
                    let exsisting_count = 1
                    let row_for_new_vessel = 0

                    for(let i=1; i<11; i++){
                        if( sheet_boil.row(lowest_bottom_row-i).cell(vessel_column).value() !== undefined ){
                            exsisting_count += 1
                        }else{
                            break
                        }
                    }

                    row_for_new_vessel = lowest_bottom_row + (max_count_for_space - exsisting_count)

                    sheet_boil.row(row_for_new_vessel).cell(producer_column).value(boil.producer)
                    sheet_boil.row(row_for_new_vessel).cell(vessel_column).value(boil.f_vessel)
                    sheet_boil.row(row_for_new_vessel).cell(type_column).value("オピリオ")
                    sheet_boil.row(row_for_new_vessel).cell(processing_type_column).value("ボイル")
                    sheet_boil.row(row_for_new_vessel).cell(size_column).value(size_detected)
                    sheet_boil.row(row_for_new_vessel).cell(target_date_column).value(boil.qtty)

                    if( sheet_boil.row(row_for_new_vessel).cell(f_ground_column).value()){
                        let checkOrigin = sheet_boil.row(row_for_new_vessel).cell(f_ground_column).value().split('→').slice(-1)[0]
                        let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                        
                        if(fg_date_romoved === boil.f_ground){
                            // do nothing
                        }else{
                            let exsisting_value = sheet_boil.row(row_for_new_vessel).cell(f_ground_column).value()
                            let formatted_date = utils.display_date_formatted(dateToBeInserted)
                            let rewrite_value = exsisting_value + "→" + formatted_date + boil.f_ground
                            sheet_boil.row(row_for_new_vessel).cell(f_ground_column).value(rewrite_value)
                        }
                        
                    // if nothing witten in f.ground col, just write
                    }else if (sheet_boil.row(row_for_new_vessel).cell(f_ground_column).value() === undefined){
                        let formatted_date = utils.display_date_formatted(dateToBeInserted)
                        let newValue = formatted_date + boil.f_ground
                        sheet_boil.row(row_for_new_vessel).cell(f_ground_column).value(newValue)
                    }
                }
            }
        }catch(e){
            console.log(e)
        }

    })   
}

function funcNama(sheet_nama, target_date_column, matched_lists, workbook2, dateToBeInserted, desktopDir){
    let producer_column = 2
    let vessel_column = 3
    let f_ground_column = 4
    let type_column = 5 //taraba or opilio
    let processing_type_column = 6
    let size_column = 7

    let sortedTypeListObj = matched_lists[0] //katsu, nama, boil lists in obj
    let revUnknownFVList = matched_lists[1]

    const order = ["6L", "5L", "4L", "3L", "2L", "L", "M", "H", "М", "Н", "клешненосн", "ходильн"]

    sortedTypeListObj.nama.sort((x,y) => {
        return order.indexOf(x.product.split(" ").slice(-1)[0]) - order.indexOf(y.product.split(" ").slice(-1)[0])
    })
    
    sortedTypeListObj.nama.forEach(nama => {

        let check = { //check whether or not current f/v is already in excel, we have to define check obj here so it will be reset on each loop
            doubled: false, 
            row: 0
        } 

        try{
            for(let i=7; i<201; i++){ 
                if(sheet_nama.row(i).cell(vessel_column).value() === nama.f_vessel){
                    check["doubled"] = true
                    check["row"] = i   

                    break // realy important !!!
                }else{
                    // do nothing
                }
            }
        }catch(e){
            console.log(e)
        }

        try{
            if( check.doubled){
                
                let target_size_list = ["6L", "5L", "4L", "3L", "2L", "L", "М", "Н", "M", "H", "ходильн"] //M and H rus eng mixed
                let splitted_product_arr = nama.product.split(" ")
                
                let size_detected = splitted_product_arr.filter(ele => {
                    return target_size_list.indexOf(ele) !== -1
                })
       
                size_detected = size_detected.slice(-1)[0]

                if(size_detected === "ходильн") size_detected = "脚"

                if( sheet_nama.row(check.row).cell(producer_column).value() === nama.producer && sheet_nama.row(check.row).cell(size_column).value() === size_detected){

                    sheet_nama.row(check.row).cell(target_date_column).value(nama.qtty)

                    // below is about fishing ground
                    if( sheet_nama.row(check.row).cell(f_ground_column).value()){
                        let checkOrigin = sheet_nama.row(check.row).cell(f_ground_column).value().split('→').slice(-1)[0]
                        let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                        
                        if(fg_date_romoved === nama.f_ground){
                            // do nothing
                        }else{
                            let exsisting_value = sheet_nama.row(check.row).cell(f_ground_column).value()
                            let formatted_date = utils.display_date_formatted(dateToBeInserted)
                            let rewrite_value = exsisting_value + "→" + formatted_date + nama.f_ground
                            sheet_nama.row(check.row).cell(f_ground_column).value(rewrite_value)
                        }
                        
                    // if nothing witten in f.ground col, just write
                    }else if (sheet_nama.row(check.row).cell(f_ground_column).value() === undefined){
                        let formatted_date = utils.display_date_formatted(dateToBeInserted)
                        let newValue = formatted_date + nama.f_ground
                        sheet_nama.row(check.row).cell(f_ground_column).value(newValue)
                    }

                }else{
                    for(let j=1; j<9; j++){
                        if(sheet_nama.row(check.row+j).cell(vessel_column).value() === undefined){ //and when qtty not written?
                            
                            sheet_nama.row(check.row+j).cell(producer_column).value(nama.producer)
                            sheet_nama.row(check.row+j).cell(vessel_column).value(nama.f_vessel)
                            sheet_nama.row(check.row+j).cell(type_column).value("オピリオ")
                            sheet_nama.row(check.row+j).cell(processing_type_column).value("生")
                            sheet_nama.row(check.row+j).cell(size_column).value(size_detected)
                            sheet_nama.row(check.row+j).cell(target_date_column).value(nama.qtty)                            

                            // if(size_detected === "ходильн") sheet_nama.row(check.row+j).cell(size_column).value("脚")

                            if( sheet_nama.row(check.row+j).cell(f_ground_column).value()){
                                let checkOrigin = sheet_nama.row(check.row+j).cell(f_ground_column).value().split('→').slice(-1)[0]
                                let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                                
                                if(fg_date_romoved === nama.f_ground){
                                    // do nothing
                                }else{
                                    let exsisting_value = sheet_nama.row(check.row+j).cell(f_ground_column).value()
                                    let formatted_date = utils.display_date_formatted(dateToBeInserted)
                                    let rewrite_value = exsisting_value + "→" + formatted_date + nama.f_ground
                                    sheet_nama.row(check.row+j).cell(f_ground_column).value(rewrite_value)
                                }
                                
                            // if nothing witten in f.ground col, just write
                            }else if (sheet_nama.row(check.row+j).cell(f_ground_column).value() === undefined){
                                let formatted_date = utils.display_date_formatted(dateToBeInserted)
                                let newValue = formatted_date + nama.f_ground
                                sheet_nama.row(check.row+j).cell(f_ground_column).value(newValue)
                            }

                            break
                        }else{
                            if(sheet_nama.row(check.row+j).cell(size_column).value() === size_detected){
                                sheet_nama.row(check.row+j).cell(target_date_column).value(nama.qtty)
                                break 
                            }
                        }
                    }
                }
                
            }else{ // if current target vessel is not yet on the list of excel file

                let target_size_list = ["6L", "5L", "4L", "3L", "2L", "L", "М", "Н", "M", "H", "ходильн"] //M and H rus eng mixed
                let splitted_product_arr = nama.product.split(" ")
                
                let size_detected = splitted_product_arr.filter(ele => {
                    return target_size_list.indexOf(ele) !== -1
                })

                size_detected = size_detected.slice(-1)[0]

                if(size_detected === "ходильн") size_detected = "脚"
                
                let written_vessel_positions = []

                for(let i=7; i<201; i++){
                    if(sheet_nama.row(i).cell(vessel_column).value() !== undefined ) {
                        written_vessel_positions.push(i)
                    }else{
                        // do nothing
                    }
                }

                let lowest_bottom_row = written_vessel_positions.reduce((prev, curr) => {
                    return prev < curr ? curr : prev
                }, 0)
                
                if(lowest_bottom_row <= 0){

                    sheet_nama.row(7).cell(producer_column).value(nama.producer)
                    sheet_nama.row(7).cell(vessel_column).value(nama.f_vessel)
                    sheet_nama.row(7).cell(type_column).value("オピリオ")
                    sheet_nama.row(7).cell(processing_type_column).value("生")
                    sheet_nama.row(7).cell(size_column).value(size_detected)
                    sheet_nama.row(7).cell(target_date_column).value(nama.qtty)

                    if( sheet_nama.row(7).cell(f_ground_column).value()){
                        let checkOrigin = sheet_nama.row(7).cell(f_ground_column).value().split('→').slice(-1)[0]
                        let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                        
                        if(fg_date_romoved === nama.f_ground){
                            // do nothing
                        }else{
                            let exsisting_value = sheet_nama.row(7).cell(f_ground_column).value()
                            let formatted_date = utils.display_date_formatted(dateToBeInserted)
                            let rewrite_value = exsisting_value + "→" + formatted_date + nama.f_ground
                            sheet_nama.row(7).cell(f_ground_column).value(rewrite_value)
                        }
                        
                    // if nothing witten in f.ground col, just write
                    }else if (sheet_nama.row(7).cell(f_ground_column).value() === undefined){
                        let formatted_date = utils.display_date_formatted(dateToBeInserted)
                        let newValue = formatted_date + nama.f_ground
                        sheet_nama.row(7).cell(f_ground_column).value(newValue)
                    }

                }else{

                    //detect the target row where the new f/v is written
                    let max_count_for_space = 14
                    let exsisting_count = 1
                    let row_for_new_vessel = 0

                    for(let i=1; i<11; i++){
                        if( sheet_nama.row(lowest_bottom_row-i).cell(vessel_column).value() !== undefined ){
                            exsisting_count += 1
                        }else{
                            break
                        }
                    }

                    row_for_new_vessel = lowest_bottom_row + (max_count_for_space - exsisting_count)

                    sheet_nama.row(row_for_new_vessel).cell(producer_column).value(nama.producer)
                    sheet_nama.row(row_for_new_vessel).cell(vessel_column).value(nama.f_vessel)
                    sheet_nama.row(row_for_new_vessel).cell(type_column).value("オピリオ")
                    sheet_nama.row(row_for_new_vessel).cell(processing_type_column).value("生")
                    sheet_nama.row(row_for_new_vessel).cell(size_column).value(size_detected)
                    sheet_nama.row(row_for_new_vessel).cell(target_date_column).value(nama.qtty)

                    if( sheet_nama.row(row_for_new_vessel).cell(f_ground_column).value()){
                        let checkOrigin = sheet_nama.row(row_for_new_vessel).cell(f_ground_column).value().split('→').slice(-1)[0]
                        let fg_date_romoved= checkOrigin.replace( /(\d{1,2})\/(\d{1,2})/, '' ) // remove only date
                        
                        if(fg_date_romoved === nama.f_ground){
                            // do nothing
                        }else{
                            let exsisting_value = sheet_nama.row(row_for_new_vessel).cell(f_ground_column).value()
                            let formatted_date = utils.display_date_formatted(dateToBeInserted)
                            let rewrite_value = exsisting_value + "→" + formatted_date + nama.f_ground
                            sheet_nama.row(row_for_new_vessel).cell(f_ground_column).value(rewrite_value)
                        }
                        
                    // if nothing witten in f.ground col, just write
                    }else if (sheet_nama.row(row_for_new_vessel).cell(f_ground_column).value() === undefined){
                        let formatted_date = utils.display_date_formatted(dateToBeInserted)
                        let newValue = formatted_date + nama.f_ground
                        sheet_nama.row(row_for_new_vessel).cell(f_ground_column).value(newValue)
                    }
                }
            }
        }catch(e){
            console.log(e)
        }

    })   
}

exports.writeToDousei = writeToDousei


