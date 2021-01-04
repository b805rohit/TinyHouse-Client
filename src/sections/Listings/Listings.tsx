import { useQuery,useMutation } from '../../lib/api'
import { ListingsData,DeleteListingData,DeleteListingVariable } from './types'

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

export const Listings=()=>{
    const { data,loading,error,fetch }=useQuery<ListingsData>(LISTINGS)

    const [deleteListing,{loading:deleteListingLoading,error:deleteListingError}]=useMutation<DeleteListingData,DeleteListingVariable>(DELETE_LISTING)

    const handleDeleteListing=async(id:string)=>{
        deleteListing({id})
        fetch()
    }

    const listings= data ? data.listings :null;

    const listingsList= listings ? (
        <ul>
            {
                listings.map(listing=>(
                    <li key={listing.id}>
                        {listing.title}
                        <button onClick={()=>handleDeleteListing(listing.id)}>DeleteData</button>
                    </li>
                ))
            }
        </ul>
    ) : null

    const deletListingLoadingState=deleteListingLoading?
            <div>Loading...</div>
            :null
    
    const deletListingErrorState=deleteListingError?
        <div>OOPS Something Went Wrong :)</div>
        :null

    if(loading){
        return <div>Loading....</div>
    }
    if(error){
        return <div>Something Went Wrong Please Reload The Page :)</div>
    }

    return (
        <div>
            {listingsList}
            {deletListingLoadingState}
            {deletListingErrorState}
        </div>
    )
}