import React, { useState, useEffect } from 'react'
import { URI } from '../Constants';
import axios from 'axios';
import './Note.css'
import Swal from 'sweetalert2';

function Note({ notes, getNotes, note }) {

    let [showModal, setShowModal] = useState(false);
    const [noteEdited, setNoteEdited] = useState([
        {
            title: '',
            description: '',
            archived: false
        }
    ]);
    const [id, setId] = useState([]);
    const [noteCategories, setNoteCategories] = useState([]);


    const fillEditNote = (e) => {
        const { name, value } = e.target;
        setNoteEdited({ ...noteEdited, [name]: value })
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
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
                console.log(notes);
                getNotes();
            })
            .catch(error => {
                console.error(error);
            })
    }


    const getNoteCategories = async (id) => {
        await axios.get(URI + "categories/note/" + id)
            .then(res => {
                setNoteCategories(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    }
    // <div className="tags">
    //     {categories.map(category => (
    //         <div className="tag">
    //             {category.title}
    //         </div>
    //     ))}

    // </div>

    
    return (
        <>
            <div className="cards">

                {
                    notes.filter(note => note.archived == false)
                        .map(note => (
                            <div key={note.id} className="note">
                                <div className="note__container">
                                    <div className="note__container__header">
                                        {/* <div class="dropdown drop">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                Category
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                {noteCategories.map(category => (
                                                    <div key={category.id} className="categories">
                                                        <li><a className="dropdown-item" href="#">{category.title}</a></li>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div> */}
                                    </div>
                                    <div className="note__container__body">
                                        <div className='note__container__body__cont'>
                                            <h2 className='note__container__body__title'>{note.title}</h2>
                                            <p className='note__container__body__text'>{note.description}</p>
                                        </div>
                                    </div>
                                    <div className="note__container__footer">
                                        <button onClick={() => { openModal(); setId(note.id) }} className='action-button edit'><i class="bi bi-pencil-square"></i></button>
                                        <button onClick={() => archiveNote(note.id)} className='action-button archive'><i class="bi bi-archive"></i></button>
                                        <button onClick={() => { deleteNote(note.id); getNotes() }} className='action-button delete'><i class="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))
                }

                {showModal &&
                    <div className='edit-modal'>
                        <div className="modal__container">
                            <div className="modal__container__header">
                                <h5 className="modal__container__header__title">Edit Note</h5>
                                <i onClick={closeModal} class="bi bi-x-circle modal__container__header__button-close"></i>
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
                                <button onClick={() => { editNote(noteEdited, id); closeModal(); changeState() }} type="button" className="btn btn-primary">Edit</button>
                            </div>
                            <div className="modal__container__footer">
                                <button onClick={closeModal} type="button" className="btn btn-secondary">Close</button>
                            </div>
                        </div>
                    </div>
                }

            </div>
            <div className="cards">
            </div>
        </>
    )
}

export default Note