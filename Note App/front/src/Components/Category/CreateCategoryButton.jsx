import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { URI } from '../Constants';
import './Category.css'

function CreateCategoryButton() {

    const [category, setCategory] = useState({
        title: '',
    });
    const [categories, setCategories] = useState([]);

    let [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const getCategories = async () => {
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



    return (
        <>
            <h3 onClick={openModal} className='navbar__container__block-2__subtitle-2'>Create Category</h3>

            {showModal &&

                <div className='create-modal category'>
                    <div className="modal__container">
                        <div className="modal__container__header">
                            <h5 className="modal__container__header__title">Create Category</h5>
                            <i onClick={closeModal} className="bi bi-x-circle modal__container__header__button-close"></i>
                        </div>
                        <div className="modal__container__body">
                            <div className="modal__container__body__input-1">
                                <label className="modal__container__body__input-1__title">Name</label>
                                <input type="text" name='title' value={category.title} onChange={fillCategory} className="form-control" id="category-name" />
                            </div>
                            <div className="modal__container__body__input-2">
                                <label className="modal__container__body__input-2__description">Add note?</label>
                                {/* <textarea type="text" name='description' value={note.description} onChange={fillNote} className="form-control" id="description" /> */}
                            </div>
                            <button onClick={() => { createCategory(category); closeModal(); changeState() }} type="button" className="btn btn-primary">Create</button>
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

export default CreateCategoryButton