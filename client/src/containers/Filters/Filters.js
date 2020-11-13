import React from 'react';
import TagsInput from '../TagsInput/TagsInput';
import Filter from '../Filter/Filter';

const Filters = props => (
  <div>
    <TagsInput
      tags={props.tags}
      setTags={props.setTags}
    />
  <Filter  />
  </div>
);

export default Filters;
