//引入文件进行组合
import React from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import { useEffect,useState } from "react";
import { cleanObject } from "utils";
import qs from 'qs';

const apiUrl=process.env.REACT_APP_API_URL;
export const ProjectListScreen=()=>{
       //设置存储修改下拉框中的用户。
       const [users,setUsers]=useState([])
    const [param,setParam]=useState({
        name:'',
        personId:''
    })
    const [list,setList]=useState([]) 
    //此hooks相当于生命周期里的componentDidMount,componentDidUpdate,componentWillUnmount
    //添加依赖数组param，当其发生变化时，就会适用fetch发送请求获取数据。
    useEffect(()=>{
        //qs.stringify(cleanObject(param)) 用于替代路径中问号后面的部分。name=${param.name}&&personId=${param.personId}
          fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response=>{
              if(response.ok){
                  setList(await response.json())
              }
          })
    },[param])
    useEffect(()=>{
        fetch(`${apiUrl}/users`).then(async response=>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
  },[param])
    return (
        <div>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>,
        <List list={list} users={users}></List>
        </div>
      
    )
}