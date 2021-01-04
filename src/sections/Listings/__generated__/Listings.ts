/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Listings
// ====================================================

export interface Listings_listings {
  __typename: "Listing";
  id: string;
  title: string;
  rating: number;
  numOfBeds: number;
  image: string;
  numOfBaths: number;
  numOfGuests: number;
  address: string;
  price: number;
}

export interface Listings {
  listings: Listings_listings[];
}
