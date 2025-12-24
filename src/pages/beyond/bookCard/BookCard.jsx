import React from 'react'
import { Star } from 'lucide-react';

import style from "./BookCard.module.css";

const BookCard = (props) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.hero}>
        <div className={style.headerGroup}>
          <div className={style.title}>
            <p>{props.title}</p>
          </div>
          <div className={style.author}>
            <p>by {props.author}</p>
          </div>
          <div className={style.titleLine}></div>
        </div>
        <div className={style.reviewSection}>
          <div className={style.coverSection}>
            <div className={style.bookCoverImg}>
              <img src={props.image} alt={props.title} />
            </div>
            <div className={style.ratingBadge}>
              <span>{props.rating}</span>
              <Star size={14} fill="#fbbf24" stroke="none" />
            </div>
          </div>
          <div className={style.reviewContent}>
            <p>{props.review}</p>
          </div>
        </div>
      </div>
      <div className={style.separator}></div>
    </div>
  )
}

export default BookCard;