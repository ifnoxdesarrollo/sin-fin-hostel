import React, { useState, useEffect } from 'react'
import './Navbar.css'
import axios from 'axios';
import { URI } from '../Constants';
import CreateNoteButton from '../Note/CreateNoteButton';
import CreateCategoryButton from '../Category/CreateCategoryButton';
import GotoarchivedButton from '../Archived/GotoarchivedButton';
import Login from '../Account/Login';
import Signup from '../Account/Signup';
import Modal from '../Modal/Modal';

function Navbar(props) {


    // const getCategories = async () => {
    //     console.log('get funciona');
    //     await axios.get(URI + "categories")
    //         .then(res => {
    //             setCategories(res.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }


    // useEffect(() => {
    //     getCategories()
    // }, [])


    return (
        <>
            <div className='navbar'>
                <div className="navbar__container">
                    <div className="navbar__container__block-1">
                        <h1 className='navbar__container__block-1__brand'>Note App</h1>
                    </div>
                    <div className="navbar__container__block-2">
                        {/* <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </button>
                            {
                                props.notes.map(category => (
                                    <ul key={category.id} className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a data-bs-toggle="modal" data-bs-target="#archive" className="dropdown-item" href="#">{category.name}</a></li>
                                        <li><a data-bs-toggle="modal" data-bs-target="#archive" className="dropdown-item" href="#">Show All</a></li>
                                    </ul>))}
                        </div> */}
                        {/* <CreateNoteButton></CreateNoteButton> */}
                        {/* <CreateCategoryButton></CreateCategoryButton> */}
                        <GotoarchivedButton notes={props.notes} getNotes={props.getNotes} note={props.note}></GotoarchivedButton>
                        <Login></Login>
                        <Signup></Signup>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar