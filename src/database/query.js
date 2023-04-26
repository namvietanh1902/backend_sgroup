const db = require('./connection')
const executeQuery = ({db,query,params})=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const [result] = await db.query(query,params);
                    
            
            resolve(result);

        }
        catch(err){
            reject(err);
        }
    })
}
const getOne = async ({db,query,params})=>{
        const records = await  executeQuery( {db,query,params});
        console.log(records)
        if(records.length>0){
            return records[0];
        }
        return null;

}
const getMany = async ({db,query,params})=>{
    const records = await executeQuery({db,query,params});
    if(records.length>0){
        return records;
    }
    return null;

}
const create = async ({db,query,params})=>{
    const result = await executeQuery({db,query,params});
    if(result.affectedRows>0){
        return true;
    }
    return false;
}
module.exports ={
    create,
    getOne,
    getMany
}