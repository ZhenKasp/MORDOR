import React from 'react';
import TagsInput from '../TagsInput/TagsInput';
import GenreSelector from '../../components/GenreSelector/GenreSelector';
import classes from './Filters.module.css';

const Filters = props => (
  <div>
    <div className={classes.Filters}>
      <div className={classes.TagsInput}>
        <TagsInput
          tags={props.tags}
          setTags={props.setTags}
        />
      </div>
    <GenreSelector defaultGenre="All" genre={props.genre} handleChange={(e) => props.setGenre(e.target.value)} />
    </div>
  </div>
);


export default Filters;
