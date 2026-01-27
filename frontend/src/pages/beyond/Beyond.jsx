import React from "react";

import BookCard from "./bookCard/BookCard";

import style from "./Beyond.module.css";
import saicMem from "../../assets/web1.png";
import cover from "../../assets/tempCover.jpg";

const Beyond = () => {
  return (
    <>
      <div className={style.pageContainer}>
        <div className={style.saic}>
          <div className={style.title}>
            <p>A Member of SAIC Family</p>
          </div>
          <div className={style.saicHero}>
            <div className={style.saicImage}>
              <img src={saicMem} alt="SAIC Memory" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam ipsam dolores ut commodi quidem quaerat provident cum corporis laudantium dolor voluptate tempora, totam incidunt laboriosam iste consequuntur repellendus harum alias inventore eaque aut soluta quae aperiam! Iure, commodi, ab debitis nobis accusamus amet alias accusantium nihil explicabo error non molestias.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus nobis labore officiis. Corrupti distinctio ad nihil consequuntur beatae id laboriosam numquam perferendis aperiam. Quod doloremque similique minus tempore consequuntur non temporibus delectus amet commodi expedita alias, cum sit quae et magni dolorem labore illum enim! Optio nisi ad incidunt soluta nobis, nostrum neque sit, accusamus voluptatum impedit maiores voluptatem excepturi. Officia sit at porro repellendus officiis eveniet voluptates quam.
            </p>
          </div>
        </div>
        <div className={style.lib}>
          <div className={style.title}>
            <p>Well Read</p>
            <p>Reflections on the pages I’ve turned and the lessons I’ve earned.</p>
          </div>
          <div className={style.libHero}>
            <BookCard title="The Very Secret Society of Irreguler Witches" author="Sangu Mandhana" rating="5" image={cover} review="Lorem ipsum, dolor sit amet consectetur adipisic" />
            <BookCard title="The Very Secret Society of Irreguler Witches" author="Sangu Mandhana" rating="5" image={cover} review="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, ipsa vero minus eligendi maiores ab vel doloribus tenetur. Itaque dolor nam similique, esse at, commodi eveniet officiis, quisquam odio porro praesentium. Eum assumenda nulla excepturi modi illo nisi officia. Voluptas omnis totam odit quaerat quasi provident repudiandae enim eius nostrum perspiciatis laboriosam neque ad doloribus expedita beatae, earum recusandae nam praesentium soluta ipsa, quam quibusdam? Molestiae accusamus, perspiciatis laboriosam ratione tempora, fugiat libero magni, ducimus placeat nemo totam. Sapiente, qui? Tempore accusamus eos qui, libero explicabo commodi quasi? Facilis beatae repellat accusamus quasi nostrum modi exercitationem nam. Voluptatibus, alias. Nostrum?" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Beyond;