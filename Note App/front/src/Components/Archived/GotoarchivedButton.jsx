import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URI } from '../Constants';
import './GotoarchivedButton.css'
import '../Note/Note.css'
import Swal from 'sweetalert2';


function GotoarchivedButton(props) {

    let [showModal, setShowModal] = useState(false);
    let [showModal2, setShowModal2] = useState(false);
    const [noteEdited, setNoteEdited] = useState([
        {
            title: '',
            description: '',
            archived: false
        }
    ]);
    const [id, setId] = useState([]);
    let [isArchived, setIsArchived] = useState();


    const fillEditNote = (e) => {
        const { name, value } = e.target;
        setNoteEdited({ ...noteEdited, [name]: value })
    };



    const deleteNote = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(URI + "notes/delete/" + id)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your note has been deleted.',
                            'success'
                        );
                        getNotes();
                    })
                    .catch(error => {
                        console.log(error);
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the note.',
                            'error'
                        );
                    });
            }
        });
    };



    const editNote = async (note, id) => {
        if (note.title === '') {
            note.title = 'No title'
        }
        if (note.description === '') {
            note.description = 'No description'
        } if (note.archived === null) {
            note.archived = false
        }

        await axios.put(URI + "notes/edit/" + id, note)
            .then(res => {
                console.log(notes);
                getNotes();

            })
            .catch(error => {
                console.error(error);
            })
    }

    const archiveNote = async (id) => {
        await axios.put(URI + "notes/archive/" + id)
            .then(res => {
                getNotes();
            })
            .catch(error => {
                console.error(error);
            })
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openModal2 = () => {
        setShowModal2(true);
    };

    const closeModal2 = () => {
        setShowModal2(false);
    };


    const setArchived = (bool) => {
        setIsArchived(bool);
        props.getNotes();
    }

    useEffect(() => {
        props.getNotes()
    }, [isArchived])

    return (
        <>
            <h3 onClick={() => { props.getNotes(); openModal2() }} data-bs-toggle="modal" data-bs-target="#archive" className='navbar__container__block-2__subtitle-2'>Go to Archived</h3>

            {showModal2 &&
                <div className='archived'>
                    <div className="archived__container">
                        <div className="archived__container__header">
                            <h5 className="archived__container__header__title">Edit Note</h5>
                            <button onClick={closeModal2} type="button" className="modal__container__header__button-close"><i class="bi bi-x-circle"></i></button>
                        </div>
                        <div className="archived__container__body">
                            
                            {props.notes.filter(note => note.archived)
                                .map(note => (
                                    <div key={note.id} className="note">
                                        <div className="note__container">
                                            <div className="note__container__header">
                                            </div>
                                            <div className="note__container__body">
                                                <h2 className='note__container__body__title'>{note.title}</h2>
                                                <p className='note__container__body__text'>{note.description}</p>
                                            </div>
                                            <div className="note__container__footer">
                                                <button onClick={() => { archiveNote(note.id); props.getNotes() }} className='action-button archive'><i className="bi bi-upload"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="archived__container__footer">
                            <button onClick={closeModal2} type="button" className="btn btn-secondary">Close</button>
                        </div>
                    </div >
                </div >
            }


            {showModal &&
                <div className='edit-modal'>
                    <div className="modal__container">
                        <div className="modal__container__header">
                            <h5 className="modal__container__header__title">Edit Note</h5>
                            <button onClick={closeModal} type="button" className="modal__container__header__button-close"><i class="bi bi-x-circle"></i></button>
                        </div>
                        <div className="modal__container__body">
                            <div className="modal__container__body__input-1">
                                <label className="modal__container__body__input-1__title">Title</label>
                                <input type="text" name='title' value={noteEdited.title} onChange={fillEditNote} className="form-control" id="note-title" />
                            </div>
                            <div className="modal__container__body__input-2">
                                <label className="modal__container__body__input-2__description">Description</label>
                                <textarea type="text" name='description' value={noteEdited.description} onChange={fillEditNote} className="form-control" id="description" />
                            </div>
                            <button onClick={() => { editNote(noteEdited, id); closeModal(); changeState() }} type="button" className="btn btn-primary">Submit</button>
                        </div>
                        <div className="modal__container__footer">
                            <button onClick={closeModal} type="button" className="btn btn-secondary">Close</button>
                        </div>
                    </div>
                </div>
            }



        </>
    )
}

export default GotoarchivedButton