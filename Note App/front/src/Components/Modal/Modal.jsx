import React, { useState, useEffect } from 'react'
import { URI } from '../Constants';
import Note from '../Note/Note';
import './Modal.css'
import axios from 'axios';


function Modal() {

    const [note, setNote] = useState({
        title: '',
        description: '',
        archived: false
    });
    const [notes, setNotes] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [stateNotes, setStateNotes] = useState(false);
    const [emptyNote, setEmptyNote] = useState({ title: '', description: '', archived: false })
    const [id, setId] = useState([]);


    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const changeState = () => {
        setStateNotes(!stateNotes)
    }

    const getNotes = async () => {
        console.log('get funciona');
        await axios.get(URI + "notes")
            .then(res => {
                setNotes(res.data);
            })
            .catch(error => {
                console.error(error);
            })
    }


    useEffect(() => {
        getNotes()
    }, [stateNotes])


    const createNote = async (note) => {
        console.log(URI + "notes");
        if (note.title === '') {
            note.title = 'No title'
        }
        if (note.description === '') {
            note.description = 'No description'
        }

        await axios.post(URI + "notes", note)
            .then(res => {
                console.log(res);
                getNotes();
                setNote({
                    title: '',
                    description: '',
                    archived: false
                })
            })
            .catch(error => {
                console.error(error);

            })

    }



    const editEmptyNote = async (emptyNote, id) => {
        if (emptyNote.title === '') {
            emptyNote.title = 'No title'
        }
        if (emptyNote.description === '') {
            emptyNote.description = 'No description'
        } if (emptyNote.archived === null) {
            emptyNote.archived = false
        }

        await axios.put(URI + "notes/edit/" + id, emptyNote)
            .then(res => {
                getNotes();
            })
            .catch(error => {
                console.error(error);
            })
    }

    const fillEmptyNote = (e) => {
        const { name, value } = e.target;
        setEmptyNote({ ...emptyNote, [name]: value })
    };

    const fillNote = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value })
    };


    const addCategory = async (categories, id) => {
        await axios.put(URI + "notes/categories/" + id)
            .then(res => {
                getNotes();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getNoteCategories = async (id) => {
        await axios.get(URI + "categories/note/" + id)
            .then(res => {
                getNotes();
            })
            .catch(error => {
                console.log(error)
            })
    }



    // crud methods for Category


    const [category, setCategory] = useState({
        title: ''
    });
    const [categories, setCategories] = useState([
        {
            title: '',
        }
    ]);
    const [addedCategories, setAddedCategories] = useState([]);


    const getCategories = async () => {
        console.log('get funciona');
        await axios.get(URI + "categories")
            .then(res => {
                setCategories(res.data);
            })
            .catch(error => {
                console.error(error);
            })
    }


    useEffect(() => {
        getCategories()
    }, [])


    const createCategory = async (category) => {
        console.log(URI + "categories");
        if (category.title === '') {
            category.title = 'No title'
        }


        await axios.post(URI + "categories", category)
            .then(res => {
                console.log(res);
                getCategory();
                setCategory({
                    title: '',
                })
            })
            .catch(error => {
                console.error(error);

            })

    }

    const fillCategory = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value })
    };


    const deleteCategory = async (id) => {
        await axios.delete(URI + "categories/delete/" + id)
            .then(res => {
                getCategories();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const addNote = async (note, id) => {
        await axios.put(URI + "categories/notes/" + id)
            .then(res => {
                getCategories();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const saveCategories = (category) => {
        setAddedCategories(category)
    }

    const elements = [];

    // addedCategories.forEach((item, index) => {
    //     elements.push(<div key={index}>{item.title}</div>);
    // });

    const print = () => {
        console.log(addedCategories);

        for (let index = 0; index < addedCategories.length; index++) {
            const element = addedCategories[index];
            elements.push(<div>{element.title}</div>);
        }
    }

    useEffect(() => {
        getCategories()
    }, [addedCategories])


    const lastIndex = notes.length - 1;

    return (
        <>
            {notes == 0 ?
                <div className="layout__container__icon">
                    <i className="bi bi-plus-circle plus" onClick={() => { openModal(); }}></i>
                </div>
                :
                <>
                    <div className="layout__container__icon-r">
                        <i className="bi bi-plus-circle plus-r" onClick={openModal}></i>
                    </div>
                    <Note notes={notes} getNotes={getNotes} categories={categories}></Note>
                </>
            }

            {showModal &&
                <div className='create-modal'>
                    <div className="modal__container">
                        <div className="modal__container__header">
                            <h5 className="modal__container__header__title">Create Note</h5>
                            {addedCategories.map(cat => (
                                <div><h5>{cat.title}</h5></div>
                            ))}
                            <i onClick={closeModal} className="bi bi-x-circle modal__container__header__button-close"></i>
                        </div>
                        <div className="modal__container__body">
                            <div className="modal__container__body__input-1">
                                <label onClick={print} className="modal__container__body__input-1__title">Title</label>
                                <input type="text" name='title' value={note.title} onChange={fillNote} className="form-control" id="title" />
                            </div>
                            <div className="modal__container__body__input-2">
                                <label className="modal__container__body__input-2__description">Description</label>
                                <textarea type="text" name='description' value={note.description} onChange={fillNote} className="form-control" id="description" />
                            </div>

                            {/* {
                                categories.map((category1, index) => (
                                    <>
                                        <div key={category1.id}>
                                            <li>
                                                <a onClick={() => { setAddedCategories([...addedCategories, category1]) }} href="#">
                                                    {category1.title}
                                                </a>
                                            </li>
                                        </div>
                                    </>
                                ))} */}


                            {/* <div class="dropdown drop">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {
                                        categories.map((category1, index) => (
                                            <div key={index}>
                                                <li>
                                                    <a onClick={() => setAddedCategories({ ...addedCategories, category1 })} className="dropdown-item" href="#">
                                                        {category1.title}
                                                    </a>
                                                </li>
                                            </div>
                                        ))}
                                </ul>
                            </div> */}
                        </div>
                        {/* <div className="modal__container__body__input-3">
                            <label className="modal__container__body__input-3__category">Add new category</label>
                            <input type="text" name='title' value={category.title} onChange={fillCategory} className="form-control" id="category" />
                            <div className="modal__container__body__input-3__plus">
                                <i className="bi bi-plus-circle plus-2" onClick={() => { createCategory(category); saveCategories(category) }}></i>
                            </div>
                        </div> */}
                        <button onClick={() => { closeModal(); changeState(); createNote(note); addCategory(addedCategories, notes[lastIndex].id) }} type="button" className="btn btn-primary">Create</button>
                        <div className="modal__container__footer">
                            <button onClick={closeModal} type="button" className="btn btn-secondary">Close</button>
                        </div>

                    </div>

                </div>
            }


        </>
    )
}

export default Modal