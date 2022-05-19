export const isFalsy=(value)=>value===0?false:!value;  //！value的意思就是true，只是用了这种表达方式。
//在一个函数里改变传入的对象是一种不好的行为
export const cleanObject=(object)=>{
    //将传入的值进行结构赋值
    const result={...object}
    Object.keys(object).forEach(key=>{
        //0为有效值，不是空值
        const value=result[key]
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result;
}