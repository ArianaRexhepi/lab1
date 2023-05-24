import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EditBook() {
    return (
        <div className="modal-dialog" style={{width: 600}}>
            <div className="modal-content">
                <form className="form">
                    <div className="modal-header">
                        <h4 className="modal-title">Edito Libër</h4>
                        <Link to="/books"><button type="button" className="close" data-dismiss="modal" aria-hidden="true" onclick="window.location='/books';">&times;</button></Link>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Titulli:</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Autori:</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <Link to="/books"><input type="button" className="btn btn-dark" value="Anulo" /></Link>
                        <input type="submit" value="Edito" className="btn btn-primary float-right" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBook;