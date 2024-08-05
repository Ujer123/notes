import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Note() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:6002/notes');
      if (response.status === 200) {
        setNotes(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSave = async () => {
    try {
      const newNote = { title, content };
      const response = await axios.post('http://localhost:6002/notes', newNote);
      if (response.status === 200) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving the note:', error);
    }
  };

  const handleUpdate = async () => {
    try {
        const updatedNote = { title, content, isArchived };
        const response = await axios.put(`http://localhost:6002/notes/${currentNote._id}`, updatedNote);
        if (response.status === 200) {
            fetchNotes();
            closeModal();
        }
    } catch (error) {
        console.error('Error updating the note:', error);
    }
};




  const handleDelete = async (noteId) => {
    try {
      console.log(`Attempting to delete note with ID: ${noteId}`);
      const response = await axios.delete(`http://localhost:6002/notes/${noteId}`);
      
      if (response.status === 200) {
        console.log('Note deleted successfully');
        fetchNotes(); // Refresh the list of notes
      } else {
        console.error('Error deleting the note:', response.data.remark);
      }
    } catch (error) {
      console.error('Error deleting the note:', error);
    }
  };
  
  
  
  

  const toggleArchive = async (noteId, isCurrentlyArchived) => {
    try {
      await axios.put(`http://localhost:6002/notes/${noteId}`, {
        archivedToggle: !isCurrentlyArchived,
      });
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const openModal = (note = null) => {
    setIsEditing(!!note);
    setCurrentNote(note);
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setIsArchived(note?.isArchived || false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setContent("");
    setIsArchived(false);
  };

  return (
    <>
      <nav>
        <ul className='flex justify-around bg-black text-white py-5'>
          <li>My Notes</li>
          <li><input type="text" placeholder='Search' className='p-2'/></li>
        </ul>
      </nav>

      <section>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 mt-5">
            {notes.length > 0 ? (
              notes.map((note) => (
                note.title && note.content && (
                  <div className="w-full md:w-1/2 px-4 mb-4" key={note._id}>
                    <div className="bg-white p-4 border rounded shadow">
                      <h4 className="font-bold text-lg mb-2">{note.title}</h4>
                      <p>{note.content}</p>
                      <button 
                        onClick={() => openModal(note)}
                        className='bg-black text-white px-4 py-1 m-2'
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(note._id)}
                        className='bg-black text-white px-4 py-1 m-2'
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => toggleArchive(note._id, note.isArchived)}
                        className='bg-black text-white px-4 py-1 m-2'
                      >
                        {note.isArchived ? 'Unarchive' : 'Archive'}
                      </button>
                    </div>
                  </div>
                )
              ))
            ) : (
              <p>No notes available</p>
            )}
          </div>
          <button 
            onClick={() => openModal()}
            className='bg-black text-white p-4 fixed bottom-10 right-10'
          >
            Add
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Note' : 'Write Note'}</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2 border mb-4"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your note here..."
              className="w-full p-2 border mb-4"
            ></textarea>
            <div className="flex justify-end">
              <button 
                onClick={isEditing ? handleUpdate : handleSave} 
                className='bg-black text-white px-4 py-2 mr-2'
              >
                {isEditing ? 'Update' : 'Save'}
              </button>
              <button onClick={closeModal} className='bg-gray-500 text-white px-4 py-2'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
