import { useReducer,useEffect, useCallback } from "react"
import { server } from "./server"

interface STATE<TData>{
    data:TData | null,
    loading:boolean,
    error:boolean
}

interface tupleQueryType<TData> extends STATE<TData>{
    fetch:()=>void
}

type Action<TData> = {type:'FETCH'} | {type:'FETCH_SUCCESS',payload:TData} | {type:'FETCH_FAILED'}

const reducer=<TData>()=>(state:STATE<TData>,action:Action<TData>):STATE<TData>=>{
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

export const useQuery=<TData=any>(query:string):tupleQueryType<TData> =>{
    const reducerFnc=reducer<TData>()
    const [state, dispatch] = useReducer(reducerFnc,{data:null,loading:false,error:false})

    const fetch=useCallback(()=>{
        const fetchList=async ()=>{
            try{
                dispatch({type:'FETCH'})

                const {data}=await server.fetch<TData>({query})
                
                dispatch({type:'FETCH_SUCCESS',payload:data})
            }
            catch(err){
                dispatch({type:'FETCH_FAILED'})
                console.error("Error is:",err)
            }
        }
        fetchList()
    },[query])

    useEffect(() => {
        fetch()
    }, [fetch])

    return {...state,fetch}
}