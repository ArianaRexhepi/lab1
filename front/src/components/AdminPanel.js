import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Alert, Spinner, Tab, Tabs } from 'react-bootstrap';

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleExport = async (type, format) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/export/${type}/${format}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_export_${new Date().toISOString().split('T')[0]}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      showMessage(`${type} exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
      showMessage(`Error exporting ${type}: ${error.response?.data?.message || error.message}`, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (type, format, file) => {
    if (!file) {
      showMessage('Please select a file', 'warning');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`http://localhost:5000/api/import/${type}/${format}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      showMessage(`Import successful: ${response.data.importedCount} records imported, ${response.data.skippedCount} skipped`);
    } catch (error) {
      showMessage(`Error importing ${type}: ${error.response?.data?.message || error.message}`, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async (format) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/import/template/${format}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `books_import_template.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      showMessage(`Template downloaded successfully`);
    } catch (error) {
      showMessage(`Error downloading template: ${error.response?.data?.message || error.message}`, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const FileUpload = ({ type, format, onUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleUpload = () => {
      if (file) {
        onUpload(type, format, file);
        setFile(null);
        // Reset the file input
        const fileInput = document.querySelector(`input[type="file"][data-format="${format}"]`);
        if (fileInput) {
          fileInput.value = '';
        }
      }
    };

    return (
      <div className="mb-4">
        <div className="form-group-modern">
          <label className="form-label-modern">
            📁 {format.toUpperCase()} File Upload
          </label>
          <div className="d-flex gap-3 align-items-end">
            <input
              type="file"
              accept={format === 'csv' ? '.csv' : format === 'excel' ? '.xlsx,.xls' : '.json'}
              onChange={handleFileChange}
              data-format={format}
              className="form-control-modern"
              style={{ flex: 1 }}
            />
            <button 
              className="btn-modern"
              onClick={handleUpload}
              disabled={!file || loading}
              style={{ 
                background: file ? 'linear-gradient(135deg, #10b981, #059669)' : 'var(--gray-400)',
                minWidth: '120px'
              }}
            >
              {loading ? <span className="spinner-modern"></span> : `📤 Upload ${format.toUpperCase()}`}
            </button>
          </div>
          {file && (
            <div className="mt-2">
              <small className="text-muted">
                📄 Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </small>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container-modern">
      {/* Page Header */}
      <div className="page-header-modern fade-in">
        <h1 className="page-title-modern">
          🔧 Admin Panel
        </h1>
        <p className="page-subtitle-modern">
          Manage your book collection with powerful data export and import tools. 
          Generate reports and maintain your database efficiently.
        </p>
      </div>

      {message && (
        <div className={`alert-modern alert-${messageType} fade-in`}>
          {message}
        </div>
      )}

      <div className="card-modern fade-in">
        <div className="card-modern-header">
          <h4 className="mb-0">📊 Data Management Center</h4>
        </div>
        <div className="card-modern-body">
          <Tabs defaultActiveKey="export" className="mb-3">
            <Tab eventKey="export" title="📤 Export Data">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card-modern">
                    <div className="card-modern-header" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                      <h5 className="mb-0">📚 Books Export</h5>
                    </div>
                    <div className="card-modern-body">
                      <div className="d-grid gap-3">
                        <button 
                          className="btn-modern"
                          onClick={() => handleExport('books', 'csv')}
                          disabled={loading}
                        >
                          {loading ? <span className="spinner-modern"></span> : '📄 Export as CSV'}
                        </button>
                        <button 
                          className="btn-modern"
                          onClick={() => handleExport('books', 'excel')}
                          disabled={loading}
                          style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                        >
                          {loading ? <span className="spinner-modern"></span> : '📊 Export as Excel'}
                        </button>
                        <button 
                          className="btn-modern"
                          onClick={() => handleExport('books', 'json')}
                          disabled={loading}
                          style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
                        >
                          {loading ? <span className="spinner-modern"></span> : '🔧 Export as JSON'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card-modern">
                    <div className="card-modern-header" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                      <h5 className="mb-0">👥 Users Export</h5>
                    </div>
                    <div className="card-modern-body">
                      <div className="d-grid gap-3">
                        <button 
                          className="btn-modern"
                          onClick={() => handleExport('users', 'csv')}
                          disabled={loading}
                          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                        >
                          {loading ? <span className="spinner-modern"></span> : '📄 Export Users as CSV'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card-modern">
                    <div className="card-modern-header" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                      <h5 className="mb-0">📖 Borrows Export</h5>
                    </div>
                    <div className="card-modern-body">
                      <div className="d-grid gap-3">
                        <button 
                          className="btn-modern"
                          onClick={() => handleExport('borrows', 'csv')}
                          disabled={loading}
                          style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
                        >
                          {loading ? <span className="spinner-modern"></span> : '📄 Export Borrows as CSV'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card-modern">
                    <div className="card-modern-header" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                      <h5 className="mb-0">📈 Reports Export</h5>
                    </div>
                    <div className="card-modern-body">
                      <div className="d-grid gap-3">
                        <button 
                          className="btn-modern"
                          onClick={() => handleExport('reports/books-summary', 'json')}
                          disabled={loading}
                          style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                        >
                          {loading ? <span className="spinner-modern"></span> : '📊 Books Summary Report'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>

            <Tab eventKey="import" title="📥 Import Data">
              <div className="row">
                <div className="col-md-8 mb-4">
                  <div className="card-modern">
                    <div className="card-modern-header" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                      <h5 className="mb-0">📚 Import Books</h5>
                    </div>
                    <div className="card-modern-body">
                      <div className="mb-4">
                        <h6 className="text-gradient">📋 Download Templates:</h6>
                        <div className="d-flex gap-3 mb-4">
                          <button 
                            className="btn-secondary-modern"
                            onClick={() => handleDownloadTemplate('csv')}
                            disabled={loading}
                          >
                            📄 CSV Template
                          </button>
                          <button 
                            className="btn-secondary-modern"
                            onClick={() => handleDownloadTemplate('excel')}
                            disabled={loading}
                          >
                            📊 Excel Template
                          </button>
                        </div>
                      </div>
                      
                      <FileUpload type="books" format="csv" onUpload={handleImport} />
                      <FileUpload type="books" format="excel" onUpload={handleImport} />
                      <FileUpload type="books" format="json" onUpload={handleImport} />
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="card-modern">
                    <div className="card-modern-header" style={{ background: 'linear-gradient(135deg, #6b7280, #4b5563)' }}>
                      <h5 className="mb-0">📝 Import Guidelines</h5>
                    </div>
                    <div className="card-modern-body">
                      <ul className="list-unstyled" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                        <li className="mb-2">📋 Download the template first to see the required format</li>
                        <li className="mb-2">📄 CSV files should have headers in the first row</li>
                        <li className="mb-2">📊 Excel files should follow the template structure</li>
                        <li className="mb-2">🔧 JSON files should be an array of book objects</li>
                        <li className="mb-2">✅ Required fields: Title, Author</li>
                        <li className="mb-2">⚠️ Duplicate books (same title and author) will be skipped</li>
                        <li className="mb-2">❌ Invalid records will be skipped with error messages</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
