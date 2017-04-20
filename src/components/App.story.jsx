import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { host } from 'storybook-host'
import { withKnobs, text, boolean, number, color, select } from '@kadira/storybook-addon-knobs'
import App from './App'

// add locale data for every locale you are going to use
import { addLocaleData } from 'react-intl'
import ru from 'react-intl/locale-data/ru'
import es from 'react-intl/locale-data/es'
import de from 'react-intl/locale-data/de'
addLocaleData(ru)
addLocaleData(es)
addLocaleData(de)

// Example Start
import { FormattedMessage, defineMessages } from 'react-intl'

const messages = defineMessages({
  caption: {
    id: 'button.caption',
    defaultMessage: 'Click Me (en - default)'
  }
})

const Button = ({ action }) => (
  <button onClick={action}>
    <FormattedMessage {...messages.caption} />
  </button>
)
// Example End
import PropTypes from 'prop-types'

const Button2 = ({ disabled, label, style, onClick }) => (
  <button className="btn btn-primary" disabled={disabled} onClick={onClick}>
    {label}
  </button>
)

Button2.displayName = 'Button'

Button2.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

// Example 2 END

storiesOf('Spinner Loader', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div className="todoapp">
      {story()}
    </div>
  ))
  .addDecorator(
    host({
      title: 'A host container for components under test.',
      align: 'center bottom',
      height: '80%',
      width: 400
    })
  )
  .add('Without props', () => <App />)
  .add('as dynamic variables', () => {
    const name = text('Name', 'Arunoda Susiripala')
    const options = {
      range: true,
      min: 60,
      max: 90,
      step: 1
    }
    const age = number('Age', 73, options)

    const defaultValue2 = '#ff00ff'
    const textColor = color('Color', defaultValue2)

    const options2 = {
      red: 'Red',
      blue: 'Blue',
      yellow: 'Yellow'
    }
    const backColor = select('Background Color', options2, 'red')

    const content = `I am ${name} and I'm ${age} years old.`
    return <div style={{ color: textColor, backgroundColor: backColor }}>{content}</div>
  })

storiesOf('Buttons', module)
  .addWithIntl(
    'Initial Locale (de-DE)',
    () => <Button action={action('another test')} />,
  {
    'ru-RU': {
      'button.caption': 'Нажми меня! (ru-RU)'
    },
    'de-DE': {
      'button.caption': 'Klick mich (de-DE)'
    },
    'es-ES': {
      'button.caption': 'Haz click en mi (es-ES)'
    }
  },
  {
    initialLocale: 'de-DE'
  }
  )
  .addWithInfo(
    'simple usage (inline info)',
    `
      This is the basic usage with the button with providing a label to show the text.
    `,
    () => <Button2 label="The Button" onClick={action('onClick')} />,
    { inline: true }
  )
  .addWithPropsCombinations(
    'Standard usage',
    Button2,
  {
    disabled: [false, true],
    onClick: [action('clicked')],
    label: ['hello world', <b>some elements</b>]
  },
  {
    CombinationRenderer: ({ Component, props, options }) => <Component {...props} />
  }
  )

import { muiTheme } from 'storybook-addon-material-ui'

const newTheme = {
  themeName: 'Grey Theme',
  palette: {
    primary1Color: '#00bcd4',
    alternateTextColor: '#4a4a4a',
    canvasColor: '#616161',
    textColor: '#bdbdbd',
    secondaryTextColor: 'rgba(255, 255, 255, 0.54)',
    disabledColor: '#757575',
    accent1Color: '#607d8b'
  }
}

/*
 import greyTheme from './greyTheme.json';
 addDecorator(greyTheme);
 */
storiesOf('Material-UI', module)
  .addDecorator(muiTheme([newTheme]))
  .add('Card Example Controlled', () => <Button2 label="The Button" />)
