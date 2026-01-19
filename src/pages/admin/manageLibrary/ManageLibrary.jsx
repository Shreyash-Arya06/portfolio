import React, { useState } from "react";
import { Plus, Pencil, Trash2, EyeOff } from "lucide-react";

import style from "./ManageLibrary.module.css";
import AddBookModal from "../../../components/addBookModal/AddBookModal";

const ManageLibrary = () => {
  const [showModal, setShowModal] = useState(false);
  const baseData = [
    {
      id: 1,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=100",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    },
    {
      id: 2,
      cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=100",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
    },
    {
      id: 3,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=100",
      title: "1984",
      author: "George Orwell",
    },
    {
      id: 4,
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=100",
      title: "Pride and Prejudice",
      author: "Jane Austen",
    },
  ];

  const dummyData = [...baseData, ...baseData, ...baseData].map((item, index) => ({
    ...item,
    id: index
  }));

  return (
    <div className={style.page}>
      {showModal && <AddBookModal onClose={() => setShowModal(false)} />}
      <div className={style.hero}>
        <div className={style.headerRow}>
           <div className={style.addSection} onClick={() => setShowModal(true)}>
            <Plus size={20} />
            <p>Add New Read</p>
          </div>
        </div>
        <div className={style.addedReads}>
          <div className={style.title}>
            <p>Previous Reads</p>
          </div>
          <div className={style.tableArea}>
            <table>
              <thead>
                <tr>
                  <th className={style.colSr}>Sr. No.</th>
                  <th className={style.colCover}>Cover</th>
                  <th className={style.colDesc}>Title & Author</th>
                  <th className={style.colAction}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((book, index) => (
                  <tr key={book.id}>
                    <td className={style.srNo}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                    <td>
                      <div className={style.coverWrapper}>
                        <img src={book.cover} alt={book.title} />
                      </div>
                    </td>
                    <td>
                      <div className={style.bookInfo}>
                        <p className={style.bookTitle}>{book.title}</p>
                        <p className={style.bookAuthor}>{book.author}</p>
                      </div>
                    </td>
                    <td>
                      <div className={style.actionButtons}>
                        <button className={style.editBtn} title="Edit">
                          <Pencil size={18} />
                        </button>
                        <button className={style.hideBtn} title="Hide">
                          <EyeOff size={18} />
                        </button>
                        <button className={style.deleteBtn} title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLibrary;