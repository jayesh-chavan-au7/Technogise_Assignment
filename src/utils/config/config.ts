export const config = Object.freeze({
  bookModelPath: '../../dist/MOCK/BOOK_MOCK.json',
  userModelPath: '../../dist/MOCK/USER_MOCK.json',
  pageSize: 10,
  tableConfig: {
    head: [
      'ID',
      'Title',
      'Author',
      'Description',
      'Average Rating',
      'Is Available',
      'Number of Copies Available',
    ],
    colWidths: [10, 20, 20, 20, 20, 20, 30],
  },
});
