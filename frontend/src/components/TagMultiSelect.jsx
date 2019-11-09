import React from 'react';

import Select from 'react-select';

class TagMultiSelect extends React.Component {

  handleChange(tags) {
    if (tags) {
      this.props.onSelectChange({target: {value: tags.map(tag => tag.value)}});
    } else {
      this.props.onSelectChange({target: {value: []}});
    }
  }

  render() {
    const { id, disabled = false } = this.props;
    const options = this.props.tags.map(name => {
      return {value: name, label: name}
    });

    const selected = this.props.selectedTags.map(name => {
      return {value: name, label: name}
    });

    return (
        <Select
          id={id}
          isMulti
          value={selected}
          options={options}
          onChange={this.handleChange.bind(this)}
          isDisabled={disabled}
          placeholder={"--- No Tags ---"}
          className="custom-control-alternative"
        />
    );
  }
}

export default TagMultiSelect;