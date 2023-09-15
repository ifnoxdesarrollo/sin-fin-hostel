import React, { useState, useEffect } from 'react'
import { URI } from '../Constants'
import axios from 'axios';
import './MainScreen.css'
import Navbar from '../Navbar/Navbar';
import Note from '../Note/Note';
import Modal from '../Modal/Modal';

function MainScreen(props) {

  const [note, setNote] = useState({
    title: '',
    description: '',
    archived: false
  });
  const [notes, setNotes] = useState([]);


  const getNotes = async () => {
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
  }, [])



  return (
    <div className='layout'>
      <Navbar getNotes={getNotes} notes={notes} note={note}></Navbar>
      <div className="layout__container">
        <Modal getNotes={getNotes}></Modal>
      </div>
    </div>
  )
}

export default MainScreen