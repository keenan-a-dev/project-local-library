function findAccountById(accounts, id) {
	return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
	return accounts.sort((accountA, accountB) =>
		accountA.name["last"].toLowerCase() > accountB.name["last"].toLowerCase()
			? 1
			: -1
	);
}

function getTotalNumberOfBorrows(account, books) {
	//could I use a helper function - below borrowsByBook(), or borrows of given book by given id
	const checkId = account.id;
	let sum = 0;
	books.forEach((book) => {
		for (let iterator = 0; iterator < book["borrows"].length; iterator++) {
			if (book["borrows"][iterator]["id"] === checkId) sum++;
		}
	});
	return sum;
}

function getBooksPossessedByAccount(account, books, authors) {
	//this function probably needs to use spread operator, focus on how to add to array shape;
	// const booksOutByInputAccount = books.filter(
	// 	(book) =>
	// 		book.borrows[0].id === account.id && books.borrows[0].returned === false
	// );
	return books
		.filter(
			(book) => !book.borrows[0].returned && book.borrows[0].id === account.id
		)
		.map((book) => ({
			...book,
			author: authors.find((author) => author.id === book.authorId),
		}));
}

module.exports = {
	findAccountById,
	sortAccountsByLastName,
	getTotalNumberOfBorrows,
	getBooksPossessedByAccount,
};
