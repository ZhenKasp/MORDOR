import React from 'react';
import { Card } from 'react-bootstrap';
import EmptyBook from '../../assets/images/empty-book.jpg';
import classes from './CardBook.module.css';
import RatingField from '../../containers/RatingField/RatingField';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CardBook = (props) => {
  const { t } = useTranslation();

  return(
    <Card
      bg={props.theme}
      text={props.theme === "dark" ? "light" : "dark"}
      className={classes.CardBook}
      onClick={() => props.clicked("bookPreview", props.book.id)}
    >
      <div className={classes.ImagePlaceholder}>
        <Card.Img
          className={classes.Image}
          variant="top"
          src={ props.book.image || EmptyBook }
        />
      </div>
      <Card.Body className={classes.CardBody}>
        <Card.Title className={classes.OneLined}>{props.book.name}</Card.Title>
          <Card.Subtitle className="mb-1">
            {t(props.book.genre)}
          </Card.Subtitle>
        <Card.Subtitle className={`mb-1 text-muted ${classes.OneLined}`}>
          {props.book.tags &&
            props.book.tags.split(";").map(tag => "#" + tag).join(" ")}
        </Card.Subtitle>
        <div className={classes.Rating}>
          <RatingField initialRating={props.book.rating} readonly />
        </div>
      </Card.Body>
    </Card>
  )
};

const mapStateToProps = state => ({ theme: state.theme });

export default connect(mapStateToProps)(CardBook);
