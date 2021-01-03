import { server } from '../../lib/api'
import { ListingsData,DeleteListingData,DeleteListingVariable } from './types'
interface Props{
    title:string
}

const DELETE_LISTING=`
    mutation delete_listing($id:ID!){
        deleteListing(id:$id){
            id
        }
    }
`

const LISTINGS=`
    query Listings{
        listings{
            id
            title
            rating
            numOfBeds
            image
            numOfBaths
            numOfGuests
            address
            price
        }
    }
`

export const Listings=({title}:Props)=>{
    const fetchListings=async ()=>{
        const {data}=await server.fetch<ListingsData>({query:LISTINGS})
        console.log(data)
    }
    const deleteListing=async()=>{
        const {data}=await server.fetch<DeleteListingData,DeleteListingVariable>({
            query:DELETE_LISTING,
            variables:{
                id:"5fb7b4cc9c4eb11a9860675d"
            }
        })
        console.log(data)
    }
    return(
        <div>
            <h2>{title}</h2>
            <button onClick={fetchListings}>FetchData</button>
            <button onClick={deleteListing}>DeleteData</button>
        </div>
    )
}