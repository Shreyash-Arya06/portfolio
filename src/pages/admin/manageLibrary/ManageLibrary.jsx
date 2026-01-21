import React, { useState } from "react";
import { Plus, Pencil, Trash2, EyeOff } from "lucide-react";

import style from "./ManageLibrary.module.css";
import AddBookModal from "../../../components/addBookModal/AddBookModal";

const ManageLibrary = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [overlayTitle, setOverlayTitle] = useState("Share a Find");

  const baseData = [
    {
      id: 1,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=100",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      rating: "4.5",
      review: "A classic tragedy..."
    },
    {
      id: 2,
      cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=100",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      rating: "4.5",
      review: "A classic tragedy..."
    },
    {
      id: 3,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=100",
      title: "1984",
      author: "George Orwell",
      rating: "4",
      review: "A classic tragedy..."
    },
    {
      id: 4,
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=100",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      rating: "4.8",
      review: "A classic tragedy..."
    },
  ];

  const dummyData = [...baseData, ...baseData, ...baseData].map((item, index) => ({
    ...item,
    id: index
  }));

  const openAddOverlay = () => {
    setOverlayTitle("Share a Find");
    setSelectedBook(null);
    setShowModal(true);
  };

  const openEditOverlay = (book) => {
    setOverlayTitle("Change Your Mind?");
    setSelectedBook(book);
    setShowModal(true);
  };

  return (
    <div className={style.page}>
      {showModal && (
        <AddBookModal
          onClose={() => setShowModal(false)}
          initialData={selectedBook}
          overlayTitle={overlayTitle}
        />
      )}
      <div className={style.hero}>
        <div className={style.headerRow}>
          <div className={style.addSection} onClick={openAddOverlay}>
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
                        <button className={style.editBtn} title="Edit" onClick={() => openEditOverlay(book)}>
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