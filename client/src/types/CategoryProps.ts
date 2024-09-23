export default interface CategoryProps {
  _id?: string; // Unique ID of the category
  name: string; // The name of the category
  owner?: string; // The owner of the category
  picture?: string; // Path to the category's image file
  createdAt?: Date; // Timestamp of when the category was created
}
