function getTotalBooksCount(books) {
	return books.length;
}

function getTotalAccountsCount(accounts) {
	return accounts.length;
}

function getBooksBorrowedCount(books) {
	return parseCheckedOut(books).length;
}

function getMostCommonGenres(books) {
	const genreNameCount = books.reduce((groupedGenres, book) => {
		if (groupedGenres.length === 0) {
			const toAdd = { name: book.genre, count: 1 };
			groupedGenres.push(toAdd);
			return groupedGenres;
		}
		//need if statement here to check if genre is already created
		if (groupedGenres.some((group) => group.name === book.genre)) {
			const selectedItem = groupedGenres.find(
				(item) => item.name === book.genre
			);
			selectedItem.count += 1;
			return groupedGenres;
		}
		const newGenre = { name: book.genre, count: 1 };
		groupedGenres.push(newGenre);
		return groupedGenres;
	}, []);
	genreNameCount.sort((genreA, genreB) => genreB.count - genreA.count);
	genreNameCount.length = 5;
	return genreNameCount;
}

function getMostPopularBooks(books) {
	const bookNameWithCount = books.map((book) => {
		return { name: book.title, count: book.borrows.length };
	});
	bookNameWithCount.sort((bookA, bookB) => bookB.count - bookA.count);
	bookNameWithCount.length = 5;
	return bookNameWithCount;
}

function getMostPopularAuthors(books, authors) {
	const authorIdOrderedCount = books.reduce((groupedAuthorId, book) => {
		if (groupedAuthorId === 100) {
			groupedAuthorId = [];
			const toAdd = { name: book.authorId, count: book.borrows.length };
			groupedAuthorId.push(toAdd);
			return groupedAuthorId;
		}
		//need if statement here to check if id is already created
		if (groupedAuthorId.some((group) => group.name === book.authorId)) {
			const selectedItem = groupedAuthorId.find(
				(item) => item.name === book.authorId
			);
			selectedItem.count += book.borrows.length;
			return groupedAuthorId;
		}
		const newAuthor = { name: book.authorId, count: book.borrows.length };
		groupedAuthorId.push(newAuthor);
		return groupedAuthorId;
	}, 100);
	authorIdOrderedCount.sort(
		(authorA, authorB) => authorB.count - authorA.count
	);
	authorIdOrderedCount.length = 5;

	const idFirstLast = authors.map(({ id, name: { first, last } }) => {
		const shapedObject = {};
		shapedObject.id = id;
		shapedObject.firstLast = `${first} ${last}`;
		return shapedObject;
	});

	const authorWithCount = authorIdOrderedCount.map((withCount) => {
		const printedNameObj = withCount;
		const nameAdd = idFirstLast.find((item) => item.id === printedNameObj.name);
		printedNameObj.name = nameAdd.firstLast;
		return printedNameObj;
	});
	return authorWithCount;
}

//helper function for getMostPopularAuthors
//[{id, firstLast},]

function parseCheckedOut(books) {
	const result = [];
	books.forEach((book) => {
		if (book["borrows"][0]["returned"] === false) result.push(book);
	});
	return result;
}

module.exports = {
	getTotalBooksCount,
	getTotalAccountsCount,
	getBooksBorrowedCount,
	getMostCommonGenres,
	getMostPopularBooks,
	getMostPopularAuthors,
};
