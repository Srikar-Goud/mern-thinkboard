import React from 'react'
import { Link } from 'react-router-dom'

const NotesNoteFound = () => {
  return (
<div className="flex flex-col items-center justify-center text-center text-primary py-10">
    <span className="text-lg">
      No notes found. Create your first note!
    </span>
    <Link to="/create" className="btn btn-primary mt-4 text-white">
      Create Note
    </Link>
  </div>
)}


export default NotesNoteFound
