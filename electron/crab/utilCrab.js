
const {fg_list} = require('./fgapiCrab.js')

//sort out only cod hg from the list and return extracted list
function sortout_crab(list){

    let cnt_of_list = list.length
    let crab_list = list

    for (i=0; i<cnt_of_list; i++){
        let product_to_be_searched = crab_list[i].product

        if ( product_to_be_searched.includes('краб') && product_to_be_searched.includes('кмч') ){
            
        }else{
            crab_list[i] = ""           
        }
    }
    crab_list = crab_list.filter(Boolean) //配列の値から空の値、0、null、undefinedとなっているものを削除して詰める
    return crab_list
}

// using f/v database, extract crab corresponding to f/v written on dousei file, also converting producer name to english
function detect_fv(crab_list, XLSX, dbFile){
    let workbook = XLSX.readFile(dbFile)
    let matched_list = []
    let db_list = []
    let unknownFVList = []
    let revUnknownFVList = []
    const sheet_name_list = workbook.SheetNames
    const dbSheet          = workbook.Sheets[sheet_name_list[0]] 


    for(let i=4; i<500; i++){
        let db_producer_cell = "A" + i
        let db_producer_ru_cell = "B" + i
        let db_producer_ru_cell2 = "C" + i
        let db_vessel_cell_in_eng = "D" + i
        let db_vessel_cell_in_rus = "E" + i

        let vessel_in_rus
        let vessel_in_eng
        let producer
        let producer_ru
        let producer_ru2

        try{
            let obj = {}
            vessel_in_rus = dbSheet[db_vessel_cell_in_rus].v
            vessel_in_eng = dbSheet[db_vessel_cell_in_eng].v
            producer = dbSheet[db_producer_cell].v 
            producer_ru = dbSheet[db_producer_ru_cell].v
            producer_ru2 = dbSheet[db_producer_ru_cell2].v

            obj["ru"] = vessel_in_rus //vessel
            obj["eng"] = vessel_in_eng //vessel
            obj["producer"] = producer //producer eng
            obj["producer_ru"] = producer_ru //producer ru 1
            obj["producer_ru2"] = producer_ru2 //producer ru 2
            
            db_list.push(obj)
 
        }catch(e){
            console.log(e)
        }finally{
            
            if(vessel_in_rus == undefined) break
        }
    }
    crab_list.forEach((crab, idx) =>{
        db_list.forEach((db, idx)=>{
   
            if ( crab.f_vessel.toUpperCase() === db.ru.toUpperCase() && (crab.producer.toUpperCase() ===  db.producer_ru.toUpperCase() || crab.producer.toUpperCase() ===  db.producer_ru2.toUpperCase()) ) {
                let temp_obj = {...crab} //must use destructuring
                temp_obj.f_vessel = db.eng //convert f.vessel name to english
                temp_obj.producer = db.producer //convert producer name to english
                matched_list.push(temp_obj)

            }else{
                let dbValueArray = db_list.map(db => {
                    return db.ru
                })

                if(!dbValueArray.includes(crab.f_vessel)) unknownFVList.push(crab.f_vessel)
            }
        })
    })


    // convert f.ground name to japanese
    matched_list.forEach((crab, idx)=>{
        let appeared_count = 0 

        fg_list.forEach((fg, idx)=>{
            let target_words = new RegExp(fg.ru)
            let detect = (crab.f_ground).match(target_words)

            if ( detect !== null ){ 
                appeared_count += 1
                crab.f_ground = fg.jp
                
            }else {
                // do nothing
            }
        })

        if(appeared_count > 0) {
            // do nothing
        }else{
            crab.f_ground = "不明"
        }
    })
    

    revUnknownFVList = [...new Set(unknownFVList)]
    let sortedTypeList = sortType(matched_list)
   
    return [sortedTypeList, revUnknownFVList]
}


function sortType(matched_list){
    let sorted_obj = {}
    let katsugani_list = []
    let namagani_list = []
    let boilgani_list = []

    matched_list.forEach(obj => {
        let check = obj.product.match(/в\/м/) 

        if(obj.product.includes("жив")){
            katsugani_list.push(obj)
        }else if(obj.product.includes("сыр")){
            namagani_list.push(obj)
        }else if(obj.product.includes("вар") || check !== null || obj.product.includes("печень")){
            boilgani_list.push(obj)
        }
    })

    sorted_obj["katsu"] = katsugani_list
    sorted_obj["nama"] = namagani_list
    sorted_obj["boil"] = boilgani_list

    return sorted_obj
}

// SSDの日付から動静管理表の該当する日付を見つけ出し、その日付に対応する行番号を取得する
function find_column_in_dousei (dateToBeInserted, sheet2, XlsxPopulate){
    let target_date
    let target_column
  
    for (let i=8; i<374; i++){
        let currentDate = sheet2.row(5).cell(i).value()
        let date = XlsxPopulate.numberToDate(currentDate).toString()
        const converted = populateDateConvert(date)

        if ( converted === dateToBeInserted ){
            target_date = converted
            target_column = i
            break
        }else{
            // do nothing
        }
    }


    return target_column
}

// codes below are for finding the date in ssd
function detect_day (sheet1){
    let date_before_process1 = sheet1['B2'].v
    let date_before_process2 = date_before_process1.split(" ")
    let date = date_before_process2[4]
    let split_date = date.split(".")
    let day = split_date[0]
    day = Number(day) //01, 02の場合に先頭の0を取り除く

    return day
}

function detect_month (sheet1){
    let date_before_process1 = sheet1['B2'].v
    let date_before_process2 = date_before_process1.split(" ")
    let date = date_before_process2[4]
    let split_date = date.split(".")
    let month = split_date[1]
    month = Number(month)

    return month
}

function detect_year (sheet1){
    let date_before_process1 = sheet1['B2'].v
    let date_before_process2 = date_before_process1.split(" ")
    let date = date_before_process2[4]
    let split_date = date.split(".")
    let year = split_date[2]

    return year
}

function display_date (sheet1) {
    let day = detect_day(sheet1)
    let month = detect_month(sheet1)
    
    let result = month+'月'+day+'日'

    return result
}

function display_date_formatted(dateToBeInserted){
    let unformatted_date = dateToBeInserted
    let formatted_date = unformatted_date.replace('月', '/').replace('日', '')

    return formatted_date
}

function populateDateConvert(date) {
    let reg = /\w{3}\s\d{2}/
    let revDate = date.match(reg)[0]
    let temp = revDate.split(" ")
    let mon = temp[0]
    let day = Number(temp[1])

    const engMonth = {
        Jan: 1, Feb: 2, Mar: 3, Apr:4, May: 5, Jun: 6, Jul:7, Aug: 8, Sep:9, 
        Oct: 10, Nov:11, Dec:12
    }

    let translatedMonth = engMonth[mon]
    let converted = `${translatedMonth}月${day}日`

    return converted
}



exports.sortout_crab = sortout_crab
exports.find_column_in_dousei = find_column_in_dousei
exports.detect_fv = detect_fv
exports.detect_day = detect_day
exports.detect_month = detect_month
exports.detect_year = detect_year
exports.display_date = display_date
exports.display_date_formatted = display_date_formatted
