interface Listing{
    id:string,
    title:string,
    rating:number,
    numOfBeds:number
    image:string,
    numOfBaths:number,
    numOfGuests:number,
    address:string,
    price:number
}

export interface ListingsData{
    listings:Listing[]
}

export interface DeleteListingData{
    listings:Listing
}

export interface DeleteListingVariable{
    id:string
}

