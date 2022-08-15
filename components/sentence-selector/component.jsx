import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translateText } from 'utils/lang';

import Dropdown from 'components/ui/dropdown';

import './styles.scss';

class SentenceSelector extends PureComponent {
  static defaultProps = {
    sentence: 'Displaying {name} for {selector}',
  };

  reduceSentence = (sentence, pattern, component) => {
    const split = sentence.split(pattern);
    return [split[0], component, split[1]];
  };

  render() {
    const { onChange, className, options, value, sentence, name } = this.props;

    const translateSentence = translateText(sentence);
    const nameRepl =
      translateSentence.includes('{name}') && name
        ? this.reduceSentence(translateSentence, '{name}', name).join('')
        : sentence;

    const selectorRepl = this.reduceSentence(
      nameRepl,
      '{selector}',
      <Dropdown
        key={name || `${value}-${sentence}`}
        className="sentence-dropdown"
        theme="theme-dropdown-native-button"
        value={value}
        options={options}
        onChange={onChange}
        native
      />
    );

    return (
      <div className={`c-sentence-selector notranslate ${className || ''}`}>
        {selectorRepl}
      </div>
    );
  }
}

SentenceSelector.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
  options: PropTypes.array,
  sentence: PropTypes.string,
  name: PropTypes.string,
};

export default SentenceSelector;
