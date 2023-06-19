import { IBook } from "@entities/";

export const formatBooksDataForTable = (books: IBook[]) => {
 const formatedBooks = books.map((book) => {
   return [
     `${book.id}`,
     `${book.title}`,
     `${book.author}`,
     `${book.description}`,
     `${book.avarageRating}`,
     `${book.isAvailable}`,
     `${book.numberOfCopies - book.borrowDetails.length}`,
   ];
 });
 return formatedBooks;
};