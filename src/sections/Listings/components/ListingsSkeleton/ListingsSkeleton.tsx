import { Skeleton,Divider,Alert } from 'antd'
import './styles/ListingsSkeleton.css'

interface Props{
    title:string,
    error?:Boolean
}

export const ListingsSkeleton=({title,error=false}:Props)=>{
    const errorAlert=error?<Alert message="Something Went Wrong Please Reload The Page :)" type="error" />:null
    return (
    <div className="listings">
        {errorAlert}
        <h2>{title}</h2>
        <Skeleton active paragraph={{
            rows:1
        }}></Skeleton>
        <Divider />
        <Skeleton active paragraph={{
            rows:1
        }}></Skeleton>
        <Divider />
        <Skeleton active paragraph={{
            rows:1
        }}></Skeleton>
    </div>)
}