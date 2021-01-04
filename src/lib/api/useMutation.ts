import { useReducer } from "react"
import { server } from "./server"

interface STATE<TData>{
    data:TData | null,
    loading:boolean,
    error:boolean
}

type MutationTuple<TData,TVariable> = [(variables?:TVariable)=>void,STATE<TData>]

type Action<TData> = {type:'FETCH'} | {type:'FETCH_SUCCESS',payload:TData} | {type:'FETCH_FAILED'}

const reducer=<TData>()=>(state:STATE<TData>,action:Action<TData>):STATE<TData> =>{
    switch (action.type) {
        case 'FETCH':
            return {...state,loading:true}
        case 'FETCH_SUCCESS':
            return {...state,loading:false,data:action.payload,error:false}
        case 'FETCH_FAILED':
            return {...state,loading:false,data:null,error:true}
        default:
            throw new Error()
    }
}

export const useMutation=<TData=any,TVariable=any>(query:string):MutationTuple<TData,TVariable>=>{
    const reducerFnc=reducer<TData>()
    const [state,dispatch]=useReducer(reducerFnc,{data:null,loading:false,error:false})
    
    const fetch=async (variables?:TVariable)=>{
        try{
            dispatch({type:'FETCH'})
            const { data,errors }=await server.fetch<TData,TVariable>({
                query:query,
                variables
            })
            
            if(errors && errors.length){
                throw new Error(errors[0].message)
            }
            dispatch({type:'FETCH_SUCCESS',payload:data})
        }
        catch(err){
            dispatch({type:'FETCH_FAILED'})
            console.error("erro:",err)
        }
    }

    return [fetch,state]
}