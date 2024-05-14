const {fv_list} = require('./fvapi.js')
const {fg_list} = require('./fgapi.js')

//sort out only cod hg from the list and return extracted list
function sortout_cod(list){

    let cnt_of_list = list.length
    let cod_list = list

    for (i=0; i<cnt_of_list; i++){
        let product_to_be_searched = cod_list[i].product

        if ( product_to_be_searched.includes('треска') && product_to_be_searched.includes('б/г') ){
            
        }else if ( product_to_be_searched.includes('треска') && product_to_be_searched.includes('пбг') ) {

        }else{
            cod_list[i] = ""           
        }
    }
    cod_list = cod_list.filter(Boolean) //配列の値から空の値、0、null、undefinedとなっているものを削除して詰める
    return cod_list
}

// extract cod corresponding to f/v written on dousei file
function detect_fv(cod_list){
    let matched_list = []

    cod_list.forEach((cod, idx) =>{
        fv_list.forEach((fv, idx)=>{
            if (cod.f_vessel === fv.ru) {
                cod.f_vessel = fv.en //convert f.vessel name to english
                matched_list.push(cod)
            }else{
                
            }
        })
    })

    // convert f.ground name to japanese
    matched_list.forEach((cod, idx)=>{
        fg_list.forEach((fg, idx)=>{
            let target_words = new RegExp(fg.ru)
            let detect = (cod.f_ground).match(target_words)
  
            if ( detect !== null ){ //lengthに修正必要か
                cod.f_ground = fg.jp
            }else{

            }
        })
    })
    
    return matched_list   
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

// find date for old ssd
function old_display_date(sheet1) {

    const sentenceDayIncluded = sheet1["A2"].v
    const splittedSentence = sentenceDayIncluded.split(" ")
    const datePart = splittedSentence[1]
    const splittedDatePart = datePart.split(".")
    const day = Number(splittedDatePart[0])
    const month = Number(splittedDatePart[1])
    const year = Number(splittedDatePart[2])

    return `${month}月${day}日`
}


exports.sortout_cod = sortout_cod
exports.find_column_in_dousei = find_column_in_dousei
exports.detect_fv = detect_fv
exports.detect_day = detect_day
exports.detect_month = detect_month
exports.detect_year = detect_year
exports.display_date = display_date
exports.display_date_formatted = display_date_formatted
exports.old_display_date = old_display_date
