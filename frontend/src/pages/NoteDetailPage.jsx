import React, { use } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import api from '../lib/axios.js'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Trash2Icon } from 'lucide-react'
import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LoaderIcon } from 'lucide-react'

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  console.log("Note ID from URL:", id);

  useEffect(() => {
    const fetchNote = async () => {
      try{
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      }
      catch(error){
        console.log("Error fetching note details:", error);
        toast.error("Failed to load note details. Please try again later.");
      }
      finally{
        setLoading(false);
      }

    }
    fetchNote();
  },[id]);

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")){
      return;
    }
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note. Please try again later.");
    }
  };

const handleSave = async () => {
  if(!note || !note.title.trim() || !note.content.trim()){
    toast.error("Please add a title or content")
    return;
  }

setSaving(true)

try{
  await api.put(`/notes/${id}`,note);
  toast.success("Note updated successfully");
}
catch(error){
  console.log("Error saving the note:",error);
  toast.error("Failed to update note");
}
finally{
  setSaving(false);
}
};
if(loading){
  return(
  <div className="min-h-screen bg-base-200 flex items-center justify-center">
    <LoaderIcon className="animate-spin size-10" />
  </div>
  );
}

  return (
    <div className="min-h-screen bg-base-200 py-8">
  <div className="max-w-2xl mx-auto px-4">

    {/* Top Bar */}
    <div className="flex items-center justify-between mb-6">
      <Link to="/" className="btn btn-ghost btn-sm flex items-center gap-2">
        <ArrowLeftIcon className="size-4" />
        Back to Notes
      </Link>

      <button
        onClick={handleDelete}
        className="btn btn-outline btn-error btn-sm flex items-center gap-2"
      >
        <Trash2Icon className="size-4" />
        Delete
      </button>
    </div>

    {/* Card */}
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">

        {/* Title */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={note?.title || ""}
            onChange={(e) =>
              setNote({ ...note, title: e.target.value })
            }
          />
        </div>

        {/* Content */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-40"
            value={note?.content || ""}
            onChange={(e) =>
              setNote({ ...note, content: e.target.value })
            }
          />
          <div className="card-actions justify-end">
            <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
              {saving?"Saving...":"Save Changes"}
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
  )
}

export default NoteDetailPage
