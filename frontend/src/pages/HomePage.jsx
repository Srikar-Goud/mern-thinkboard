import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import api from '../lib/axios.js'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import { Link } from 'lucide-react'
import NotesNotFound from '../components/NotesNoteFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call to fetch notes
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      }
      catch(error){
        console.log("Error fetching notes:", error);
        if(error.response && error.response.status === 429){
          setIsRateLimited(true);
        } 
        else{
          toast.error("An error occurred while fetching notes. Please try again later.");
        }
      }
      finally{
        setLoading(false);
      }
    }
    fetchNotes();
  },[]);
  

  return (
    <div className="min-h-screen">
      <Navbar/>

      {isRateLimited && <RateLimitedUI/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary toast-center justify-between py-10">
          <span className="loading loading-spinner"></span>
          <span className="ml-2 py-6">Loading Notes...</span>
          </div>}

          {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length>0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
                <NoteCard key ={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
