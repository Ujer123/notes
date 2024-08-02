import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Note() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(savedNotes);
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
            {notes.map((note, index) => (
              note.title && note.content ? ( // Only render if title and content are non-empty
                <div className="w-full md:w-1/2 px-4 mb-4" key={index}>
                  <div className="bg-white p-4 border rounded shadow">
                    <h4 className="font-bold text-lg mb-2">{note.title}</h4>
                    <p>{note.content}</p>
                  </div>
                </div>
              ) : null // Don't render anything if title or content is empty
            ))}
          </div>
          <Link to="/write">
            <button className='bg-black text-white p-4 fixed bottom-10 right-10'>Add</button>
          </Link>
        </div>
      </section>
    </>
  );
}
