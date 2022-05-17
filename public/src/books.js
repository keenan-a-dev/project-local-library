function findAuthorById(authors, id) {
	return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
	return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
	const checkedOut = parseCheckedOut(books);
	const inStock = parseReturned(books);
	return [checkedOut, inStock];
}

function getBorrowersForBook(book, accounts) {
	const borrowersIdReturnedMerge = book.borrows.map((item) => {
		const pulledAccount = accounts.find((item2) => item2.id === item.id);
		pulledAccount.returned = item.returned;
		return pulledAccount;
	});
	borrowersIdReturnedMerge.length = 10;
	return borrowersIdReturnedMerge;
}

//helper functions
function parseCheckedOut(books) {
	const result = [];
	books.forEach((book) => {
		if (book["borrows"][0]["returned"] === false) result.push(book);
	});
	return result;
}

function parseReturned(books) {
	const result = [];
	books.forEach((book) => {
		if (book["borrows"][0]["returned"] === true) result.push(book);
	});
	return result;
}

function borrowersIdsForSingleBook(book) {
	//array of the Ids only for a single book
	const result = [];
	for (let i = 0; i < book.borrows.length || i < 10; i++) {
		result.push(book.borrows[i].id);
		return result;
	}
}
module.exports = {
	findAuthorById,
	findBookById,
	partitionBooksByBorrowedStatus,
	getBorrowersForBook,
};
