import React, { useEffect, useState } from 'react';
import classes from './TagsInput.module.css';
import { WithContext as ReactTags } from 'react-tag-input';

const TagsInput = (props) => {
  const [tags, setTags] = useState(props.parentTags)

  const handleDelete = (i) => {
    const { tags } = tags;
    setTags(tags.filter((_, index) => index !== i));
  }

  const handleAddition = (tag) => {
    setTags(tags => ([...tags, tag]));
  }

  const handleDrag = (tag, currPos, newPos) => {
    const tags = [...tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  }

  useEffect(() => {
    if (props.onChange) props.onChange(tags);
  }, [props, tags])

  useEffect(() => {
    setTags(props.parentTags);
  }, [props.parentTags])

  let suggestions = props.suggestions.map(tag => { return {id: tag, text: tag}});

  return (
    <ReactTags
      classNames={{
        tag: classes.Tag,
        tagInputField: classes.TagInputField,
        tagInput: classes.TagInput,
        remove: classes.RemoveTag,
        suggestions: classes.SuggestionsTag
      }}
      suggestions={suggestions}
      tags={tags}
      name="tags"
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      inputFieldPosition="inline"
    />
  )
}

export default TagsInput;
