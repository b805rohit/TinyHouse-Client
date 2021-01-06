import { useQuery,useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Listings as ListingsData } from './__generated__/Listings'
import { delete_listingVariables as DeleteListingVariable,delete_listing as DeleteListingData } from './__generated__/delete_listing'
import { List, Avatar,Button,Alert,Spin } from 'antd';
import { ListingsSkeleton } from './components'
import './styles/listings.css'

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

interface Props{
    title:string
}

export const Listings=({title}:Props)=>{
    const { data,loading,error,refetch }=useQuery<ListingsData>(LISTINGS)

    const [deleteListing,{loading:deleteListingLoading,error:deleteListingError}]=useMutation<DeleteListingData,DeleteListingVariable>(DELETE_LISTING)

    const handleDeleteListing=async(id:string)=>{
        deleteListing({variables:{id}})
        refetch()
    }

    const listings= data ? data.listings :null;

    const listingsList= listings ? (
        <List
            itemLayout="horizontal"
            dataSource={listings}
            renderItem={item => (
                <List.Item actions={[<Button type="primary" onClick={()=>handleDeleteListing(item.id)}>Delete</Button>]}>
                    <List.Item.Meta title={item.title} description={item.address} avatar={<Avatar size={48} shape="square" src={item.image} />}/>
                </List.Item>
            )}
        />
    ) : null

    
    const deletListingErrorState=deleteListingError?
        <Alert message="OOPS Something Went Wrong :)" type="error"/>
        :null

    if(loading){
        return <ListingsSkeleton title={title} />
    }
    if(error){
        return <ListingsSkeleton title={title} error={true}/>
    }

    return (
        <Spin spinning={deleteListingLoading}>
            <div className='listings'>
                {deletListingErrorState}
                <h2>{title}</h2>
                {listingsList}
            </div>
        </Spin>
    )
}