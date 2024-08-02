import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    const newNote = { title, content };
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    localStorage.setItem("notes", JSON.stringify([...savedNotes, newNote]));
    navigate('/');
  };

  return (
    <>
      <nav>
        <ul className='flex justify-around bg-black text-white py-5'>
          <li>Write Note</li>
        </ul>
      </nav>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your note here..."
                className="w-full p-2 border mt-2"
              ></textarea>
              <button onClick={handleSave} className='bg-black text-white p-2 mt-2'>Save</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
