

function extractCrabFromSSD (sheet1, dateToBeInserted, EXTRACT_LIST) {
    // Extract all data from SSD file
    for(let i = 6; i < 2000; i++){ 
        let f_ground_cell = 'A'+i 
        let producer_cell = 'B'+i
        let f_vessel_cell = 'C'+i
        let product_cell = 'J'+i
        let qtty_cell = 'M'+i
        let obj = {}
        obj["date"]=dateToBeInserted
        
        try {
            let product = sheet1[product_cell].v
            obj["product"]=product
        } catch(e) { }
        
        if (obj.product){   //if product isn't in the obj dict, then skip the procedure below
            try {
                let f_ground = sheet1[f_ground_cell].v
                obj["f_ground"]=f_ground
            } catch(e) { 
                for(let j=1; j<500; j++){
                    let rev_f_ground = ""
                    let rev_count = i-j
                    let rev_f_ground_cell = 'A'+rev_count
                    try{
                        rev_f_ground = sheet1[rev_f_ground_cell].v
                        obj["f_ground"]=rev_f_ground
                    }catch(e){
        
                    }finally{
                        if(rev_f_ground){
                            break
                        }
                    }
                }
            }
        
            try {
                let producer = sheet1[producer_cell].v
                obj["producer"]=producer
            } catch(e) { 
                for(let j=1; j<500; j++){
                    let rev_producer = ""
                    let rev_count = i-j
                    let rev_producer_cell = 'B'+rev_count
                    try{
                        rev_producer = sheet1[rev_producer_cell].v
                        obj["producer"]=rev_producer
                    }catch(e){
        
                    }finally{
                        if(rev_producer){
                            break
                        }
                    }
                }
            }
        
            try {
                let f_vessel = sheet1[f_vessel_cell].v
                obj["f_vessel"]=f_vessel
            } catch(e) { 
                for(let j=1; j<500; j++){
                    let rev_f_vessel = ""
                    let rev_count = i-j
                    let rev_f_vessel_cell = 'C'+rev_count
                    try{
                        rev_f_vessel = sheet1[rev_f_vessel_cell].v
                        obj["f_vessel"]=rev_f_vessel
                    }catch(e){
        
                    }finally{
                        if(rev_f_vessel){
                            break
                        }
                    }
                }
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



exports.extractCrabFromSSD = extractCrabFromSSD