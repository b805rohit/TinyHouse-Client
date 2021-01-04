import { useQuery,useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Listings as ListingsData } from './__generated__/Listings'
import { delete_listingVariables as DeleteListingVariable,delete_listing as DeleteListingData } from './__generated__/delete_listing'

const DELETE_LISTING=gql`
    mutation delete_listing($id:ID!){
        deleteListing(id:$id){
            id
        }
    }
`

const LISTINGS=gql`
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
    const { data,loading,error,refetch }=useQuery<ListingsData>(LISTINGS)

    const [deleteListing,{loading:deleteListingLoading,error:deleteListingError}]=useMutation<DeleteListingData,DeleteListingVariable>(DELETE_LISTING)

    const handleDeleteListing=async(id:string)=>{
        deleteListing({variables:{id}})
        refetch()
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