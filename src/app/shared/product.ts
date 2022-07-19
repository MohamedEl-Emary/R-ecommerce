export interface Product{
  "id": number,
  "name": string,
  "description": string,
  "picture": string,
  "price": number,
  "discount": number,
  "category": Category,
  "quantity": number,
  "deletedBy": string,
  "deletedOn": Date,
  "createdBy": string,
  "createdOn": Date,
  "modifiedBy": string,
  "modifiedOn": Date
}
enum Category{
  Health,
  Home,
  Sporting,
  Children,
  Style,
  Other
}
