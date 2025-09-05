import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Form, Row, Col, Button, Spinner, Alert, Collapse } from "react-bootstrap";

const BookUserList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  
  // Advanced search states
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedSearchResults, setAdvancedSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Advanced search parameters
  const [searchParams, setSearchParams] = useState({
    searchTerm: '',
    category: '',
    author: '',
    minRating: '',
    maxRating: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    sortBy: 'title',
    sortOrder: 'asc'
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5000/api/book");
      setBooks(res.data);
      console.log("books", res.data);
    };
    fetch();
    fetchCategories();
    fetchAuthors();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleBookClick = (bookId) => {
    navigate(`/bookuserlist/${bookId}`);
  };

  const handleSearch = () => {
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/search/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/search/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const fetchSuggestions = async (term) => {
    if (term.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/search/search-suggestions?term=${encodeURIComponent(term)}`);
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'searchTerm') {
      fetchSuggestions(value);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchParams(prev => ({
      ...prev,
      searchTerm: suggestion
    }));
    setShowSuggestions(false);
  };

  const handleAdvancedSearch = async (page = 1) => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && value !== '') {
          params.append(key, value);
        }
      });
      
      params.append('page', page);
      params.append('pageSize', '10');

      const response = await axios.get(`http://localhost:5000/api/search/books?${params.toString()}`);
      setAdvancedSearchResults(response.data);
    } catch (error) {
      setError('Error performing search. Please try again.');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchParams({
      searchTerm: '',
      category: '',
      author: '',
      minRating: '',
      maxRating: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      sortBy: 'title',
      sortOrder: 'asc'
    });
    setAdvancedSearchResults(null);
    setError('');
  };

  const handlePageChange = (page) => {
    handleAdvancedSearch(page);
  };

  return (
    <div className="container-modern">
      {/* Page Header */}
      <div className="page-header-modern fade-in">
        <h1 className="page-title-modern">
          📚 Discover Amazing Books
        </h1>
        <p className="page-subtitle-modern">
          We believe that books have the power to inspire, educate, and entertain. 
          Find your next favorite read with our advanced search and discovery tools.
        </p>
      </div>

      {/* Search Section */}
      <div className="search-container-modern fade-in">
        <div className="position-relative">
          <svg className="search-icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            placeholder="Search for books, authors, or topics..."
            type="search"
            className="search-input-modern"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Advanced Search Toggle */}
      <div className="text-center mb-4 fade-in">
        <button 
          className="btn-secondary-modern"
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
        >
          {showAdvancedSearch ? '🔍 Hide Advanced Search' : '⚙️ Show Advanced Search'}
        </button>
      </div>

      {/* Advanced Search Panel */}
      <Collapse in={showAdvancedSearch}>
        <div className="advanced-search-panel slide-in">
          <div className="advanced-search-header">
            <h5 className="mb-0">🔍 Advanced Search Filters</h5>
            <span className="text-muted">Fine-tune your search to find exactly what you're looking for</span>
          </div>
          <div className="advanced-search-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Search Term</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      name="searchTerm"
                      value={searchParams.searchTerm}
                      onChange={handleInputChange}
                      placeholder="Search by title, author, or description..."
                      className="form-control-modern"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="position-absolute w-100 bg-white border rounded-bottom shadow" style={{ zIndex: 1000 }}>
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-2 border-bottom cursor-pointer hover:bg-gray-50"
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{ cursor: 'pointer' }}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Category</label>
                  <select
                    name="category"
                    value={searchParams.category}
                    onChange={handleInputChange}
                    className="form-select-modern"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Author</label>
                  <select
                    name="author"
                    value={searchParams.author}
                    onChange={handleInputChange}
                    className="form-select-modern"
                  >
                    <option value="">All Authors</option>
                    {authors.map((author, index) => (
                      <option key={index} value={author}>{author}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Min Rating</label>
                  <input
                    type="number"
                    name="minRating"
                    value={searchParams.minRating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    placeholder="1"
                    className="form-control-modern"
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Max Rating</label>
                  <input
                    type="number"
                    name="maxRating"
                    value={searchParams.maxRating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    placeholder="5"
                    className="form-control-modern"
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Min Price</label>
                  <input
                    type="number"
                    name="minPrice"
                    value={searchParams.minPrice}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    className="form-control-modern"
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Max Price</label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={searchParams.maxPrice}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="1000"
                    className="form-control-modern"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Min Year</label>
                  <input
                    type="number"
                    name="minYear"
                    value={searchParams.minYear}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="1900"
                    className="form-control-modern"
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Max Year</label>
                  <input
                    type="number"
                    name="maxYear"
                    value={searchParams.maxYear}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder={new Date().getFullYear()}
                    className="form-control-modern"
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Sort By</label>
                  <select
                    name="sortBy"
                    value={searchParams.sortBy}
                    onChange={handleInputChange}
                    className="form-select-modern"
                  >
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="rating">Rating</option>
                    <option value="price">Price</option>
                    <option value="year">Year</option>
                    <option value="category">Category</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group-modern">
                  <label className="form-label-modern">Sort Order</label>
                  <select
                    name="sortOrder"
                    value={searchParams.sortOrder}
                    onChange={handleInputChange}
                    className="form-select-modern"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 justify-content-center">
              <button 
                className="btn-modern"
                onClick={() => handleAdvancedSearch(1)} 
                disabled={loading}
              >
                {loading ? <span className="spinner-modern"></span> : '🔍 Search Books'}
              </button>
              <button 
                className="btn-secondary-modern"
                onClick={handleClearFilters}
              >
                🗑️ Clear Filters
              </button>
            </div>

            {error && <div className="alert-modern alert-danger">{error}</div>}

            {advancedSearchResults && (
              <div className="mt-4 text-center">
                <h5 className="text-gradient">Search Results ({advancedSearchResults.totalCount} books found)</h5>
                {advancedSearchResults.executionTimeMs && (
                  <small className="text-muted">⚡ Search completed in {advancedSearchResults.executionTimeMs}ms</small>
                )}
              </div>
            )}
          </div>
        </div>
      </Collapse>

      {/* Books Grid */}
      <div className="books-grid-modern fade-in">
        {(advancedSearchResults ? advancedSearchResults.books : (searchResults.length > 0 ? searchResults : books)).map(
          (book, index) => (
            <div
              key={index}
              className="book-card-modern"
              onClick={() => handleBookClick(book.id)}
            >
              <img
                src={book.image || '/placeholder-book.jpg'}
                alt={book.title}
                className="book-card-image-modern"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400/6366f1/ffffff?text=Book+Cover';
                }}
              />
              <div className="book-card-details-modern">
                <h3 className="book-card-title-modern">{book.title}</h3>
                <p className="book-card-author-modern">By {book.author}</p>
                <div className="book-card-extra-modern">
                  <span className="book-card-tag-modern">{book.category}</span>
                  <span className="book-card-rating-modern">
                    ⭐ {book.rating}/5
                  </span>
                  <span className="book-card-tag-modern">${book.price}</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Pagination for advanced search */}
      {advancedSearchResults && advancedSearchResults.totalPages > 1 && (
        <div className="pagination-modern">
          <ul className="pagination-modern">
            {Array.from({ length: advancedSearchResults.totalPages }, (_, i) => i + 1).map(page => (
              <li key={page} className={`page-item ${page === advancedSearchResults.page ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Results Message */}
      {((advancedSearchResults && advancedSearchResults.books.length === 0) || 
        (searchResults.length === 0 && searchTerm && !advancedSearchResults)) && (
        <div className="text-center py-5">
          <div className="card-modern" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="card-modern-body text-center">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
              <h4 className="text-gradient">No Books Found</h4>
              <p className="text-muted">
                {searchTerm ? 
                  `No books match your search for "${searchTerm}". Try adjusting your search terms or filters.` :
                  'No books are available at the moment. Check back later!'
                }
              </p>
              <button 
                className="btn-modern"
                onClick={() => {
                  setSearchTerm('');
                  setAdvancedSearchResults(null);
                  handleClearFilters();
                }}
              >
                🔄 Reset Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookUserList;
