import { FormFields } from "models/formFields.model";



export const formFields: FormFields = {

  users: [
    "firstName",
    "lastName",
    "email",
    "birthdate",
    "username",
    "password",
    "image"
  ],
  movies: [
    "title",
    "director",
    "releaseDate",
    "synopsis",
    "posterUrl"
  ],
  places: [
    "title",
    "address",
    "imageUrl",
    "openingHours"
  ]

}

