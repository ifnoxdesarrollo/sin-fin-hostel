import React from 'react'
import './CreateNoteButton.css'

function CreateNoteButton() {
    return (
        <>
            <h3 data-bs-toggle="modal" data-bs-target="#create" className='navbar__container__block-2__subtitle-1'>Create Note</h3>

            <div className="modal" id="create" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Archive</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="note-title" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="description" />
                                </div>
                                <div className="mb-3">

                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateNoteButton