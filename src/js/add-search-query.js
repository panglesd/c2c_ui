export const add_search_queries = function (query, documents) {
  let add_query = (document, i) => {
    let offset = query.offset ? query.offset : '0';
    let index = parseInt(offset) + i; // index in the whole list of search results
    let search_query = Object.assign({}, query);
    search_query.offset = Math.max(0, index - 5); // We take 5 results before
    search_query.limit = 11; // And 11 results maximum: 5 before, 5 after
    document.search_query = search_query;
  };
  if (documents !== null) documents.forEach(add_query);
};
