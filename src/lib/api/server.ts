interface Body<TVariable>{
    query:string;
    variables?:TVariable
}

interface Error{
    message:string
}

export const server={
    fetch:async<TData=any,TVariable=any>(body:Body<TVariable>)=>{
        const res=await fetch('/api',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        })

        if(!res.ok){
            throw new Error("Failed to Fetch From Server")
        }

        return res.json() as Promise<{ data:TData,errors:[Error] }>
    }
}