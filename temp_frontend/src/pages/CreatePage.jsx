import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom' 
import { toast } from 'react-hot-toast'
import axios from 'axios'
import api from '../lib/axios.js'
 
const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setLoading(true)
    try{
      // Make API call to create note
      await api.post("/notes", {title, content})
      toast.success("Note created successfully")
      navigate("/")
    }
    catch(error){
      console.log("Error creating note:", error);
      toast.error("An error occurred while creating the note. Please try again later.");
    }
    finally {
      setLoading(false)
    }

}

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-base-100 p-6 rounded-lg shadow-md">
          <Link to={"/"} className="btn btn-ghost hover:bg-base-300 mb-2">
            <ArrowLeftIcon className="size-5"/> Back to Home
          </Link>

          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create Note</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter note title"
                    className="input input-bordered"
                    value={title}
                    onChange ={(e) => setTitle(e.target.value)} />
                  <div className="form-control mb-4">
                    <label className="label">
                    <span className="label-text pt-4">Content</span>
                  </label>
                  <textarea
                    placeholder="Enter note content here...."
                    className="input input-bordered h-32"
                    value={content}
                    onChange ={(e) => setContent(e.target.value)} />
                    </div>
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary">
                    {loading? <span className="loading loading-spinner">Creating...</span> : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreatePage
