import React from 'react';
import Button from 'react-bootstrap/Button';
import classes from './BookPreview.module.css';
import Aux from '../../hoc/Auxiliary';
import RatingField from '../../containers/RatingField/RatingField';
import { useTranslation } from 'react-i18next';

const BookPreview = props => {
const { t } = useTranslation();
console.log(props);

  return (
    <div className={classes.Wrapper}>
      <h1>{props.book.name}</h1>
      {props.book.image &&
        <img className={classes.Image} src={props.book.image} alt={props.book.name} />}
      {props.book.tags &&
        <p><b>{t("Tags")}:</b> {props.book.tags.split(";").map(tag => "#" + tag).join(" ")}</p>}
      <p><b>{t("Short description")}:</b> {props.book.short_description}</p>
      <p><b>{t("Genre")}:</b> {t(props.book.genre)}</p>
      <p><b>{t("Author")}:</b> {props.book.user?.firstname + " " + props.book.user?.lastname}</p>
      {props.book.chapters && props.book.chapters.length > 0 ? (
        <div>
          <div>
            <RatingField initialRating={props.book.rating} bookId={props.book.id} />
          </div>
          <Button onClick={() => {
            props.clickHandler(
              `/bookPreview/${props.book.id}/readBook`,
              props.book.chapters[0].id,
              [...props.book.chapters, props.book.id]
            )
          }}>{t("Read")}</Button>
          <hr />
          <h3>{t("Chapters")}</h3>
          <ol>
            {props.book.chapters.map(chapter => {
              return (
                <li
                  className={classes.Chapter}
                  key={chapter.id}
                  onClick={() =>
                    props.clickHandler(
                      `/bookPreview/${props.book.id}/readBook`,
                      chapter.id,
                      props.book.chapters
                    )
                  }>
                  {chapter.name}
                </li>
              )
            })}
          </ol>
        </div>
      ) :
      <Aux>
        <hr />
        <h4>{t("No chapters")}</h4>
      </Aux>}
    </div>
  )
}

export default BookPreview;
