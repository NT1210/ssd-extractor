let global_fv_cell 

function extractCrabFromOldSSD (sheet1, dateToBeInserted, EXTRACT_LIST) {
    // Extract all data from SSD file
    for(let i = 8; i < 2000; i++){ 
        let f_ground_cell = 'A'+i 
        // let producer_cell = 'A'+i
        let f_vessel_cell = 'A'+i
        let product_cell = 'G'+i
        let qtty_cell = 'J'+i
        let vessel_type_cell = "B"+i
        let obj = {}
        obj["date"]=dateToBeInserted
        
        try {
            let product = sheet1[product_cell].v
            obj["product"]=product
            
        } catch(e) { }
        
        if (obj.product){   //if product isn't in the obj dict, then skip the procedure below
            try {
                let itogo_row = 0
                for(let j=1; j<300; j++){
                    let rev_count = i-j
                    let rev_f_ground_cell = 'A'+rev_count
                    if(sheet1[rev_f_ground_cell] === undefined){
                       
                    }else{
                        if(sheet1[rev_f_ground_cell].v.toLowerCase().includes("итого") || sheet1[rev_f_ground_cell].v.toLowerCase().includes("название")){
                            itogo_row = rev_count
                            break
                        }
                    }
                }

                // let start_cell = 'A'+itogo_row
                for(let j=1; j<300; j++){
                    let rev_count = itogo_row+j
                    let rev_f_ground_cell = 'A'+rev_count

                    if(sheet1[rev_f_ground_cell] === undefined){
                      
                    }else{
                        obj["f_ground"] = sheet1[rev_f_ground_cell].v
                        break
                    }

                }} catch(e){}

            try {
                let f_vessel = sheet1[f_vessel_cell].v
                let vessel_type = sheet1[vessel_type_cell].v
                if(vessel_type){
                    obj["f_vessel"]=f_vessel
                    global_fv_cell = 'A'+ (i+1)
                }
               
            } catch(e) { 
                for(let j=1; j<500; j++){
                    let rev_f_vessel = ""
                    let rev_count = i-j
                    let rev_f_vessel_cell = 'A'+rev_count
                    let rev_vessel_type_cell = 'B'+rev_count
                    try{
                        
                        let vessel_type = sheet1[rev_vessel_type_cell].v
                        if(vessel_type){
                            rev_f_vessel = sheet1[rev_f_vessel_cell].v
                            obj["f_vessel"]=rev_f_vessel
                            global_fv_cell = 'A'+ (rev_count+1)
                        }
                    }catch(e){
        
                    }finally{
                        if(rev_f_vessel){
                            break
                        }
                    }
                }
            }
        
            try {
                obj["producer"] = sheet1[global_fv_cell].v               
            } catch(e) { 
                console.log(e)
            }
        

        
            try {
                let qtty = sheet1[qtty_cell].v
                obj["qtty"]=qtty
            } catch(e) { }

        }
    

        if(obj.product){
            EXTRACT_LIST.push(obj)
    
        }
    }

    return EXTRACT_LIST
}



exports.extractCrabFromOldSSD = extractCrabFromOldSSD