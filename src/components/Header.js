import PropTypes from 'prop-types'
import React from 'react'
import parse from 'html-react-parser';
import { ok } from 'assert';

const formatTime = (timer) => {
  const getSeconds = `0${Math.floor((timer % 60))}`.slice(-2)
  const minutes = `${Math.floor(timer / 60)}`
  const getMinutes = `0${minutes % 60}`.slice(-2)
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

  return `${getHours} : ${getMinutes} : ${getSeconds}`
}

const useTimer = (initialState = 0) => {
  const [initialized, setInitialized] = React.useState(false);
  const [timer, setTimer] = React.useState(initialState)
  const [builtPassword, setBuiltPassword] = React.useState('')
  const [builtPasswordHumanReadable, setBuiltPasswordHumanReadable] = React.useState('')
  const [builtPasswordUnicode, setBuiltPasswordUnicode] = React.useState('')
  const [builtPasswordUnicodeHumanReadable, setBuiltPasswordUnicodeHumanReadable] = React.useState('')
  const [passwordInput, setPasswordInput] = React.useState('')
  const [isPasswordSet, setIsPasswordSet] = React.useState(false)
  const [hasOneUnicodeTimeCharacter, setHasOneUnicodeTimeCharacter] = React.useState(false)
  const countRef = React.useRef(null)
  const [passwordTestInput, setPasswordTestInput] = React.useState('');
  const [passwordTest, setPasswordTest] = React.useState('')
  const [passwordTestHumanReadable, setPasswordTestHumanReadable ] = React.useState('')
  const [passwordTestUnicode, setPasswordTestUnicode] = React.useState('')
  const [passwordTestUnicodeHumanReadable, setPasswordTestUnicodeHumanReadable  ] = React.useState('')

  const [doTestPasswordsMatch, setDoTestPasswordsMatch] = React.useState(false)
  const [doTestUnicodePasswordsMatch, setDoTestUnicodePasswordsMatch] = React.useState(false)
  const [doTestUnicodeHumanReadablePasswordsMatch, setDoTestUnicodeHumanReadablePasswordsMatch] = React.useState(false)

  if (!initialized)
  {
    setInitialized(true);

    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 0.1)
    }, 100);
  }

  const clearStates = () =>
  {
    setTimer(0);
    setHasOneUnicodeTimeCharacter(false);
    setIsPasswordSet(false);
    setPasswordInput('');
    setBuiltPassword('');
    setBuiltPasswordHumanReadable('');
    setBuiltPasswordUnicode('');
    setBuiltPasswordUnicodeHumanReadable('');

    setPasswordTestInput('');
    setPasswordTest('');
    setPasswordTestHumanReadable('');
    setPasswordTestUnicode('');
    setPasswordTestUnicodeHumanReadable('');
  }

  const handleSave = () =>
  {
    if (!hasOneUnicodeTimeCharacter)
    {
      alert('Please use at least one 1 second long pause in your password.')
    }
    else
    {
      setTimer(0);
      setIsPasswordSet(true);
    } 
  }

  const handleStartOver = () =>
  {
    clearStates();
  }

  const handleTest = () =>
  {
    setDoTestPasswordsMatch(builtPassword == passwordTest);
    setDoTestUnicodePasswordsMatch(builtPasswordUnicode != passwordTestUnicode);
    setDoTestUnicodeHumanReadablePasswordsMatch(builtPasswordUnicodeHumanReadable == passwordTestUnicodeHumanReadable);
  }

  const handleChange = (event) => {
    if(((!isPasswordSet && builtPassword) || (isPasswordSet && passwordTest)) && countRef?.current)
    {
      var gap = timer;
      if (!isPasswordSet && gap >= 10)
      {
        alert('please use gaps less than 10 seconds')

        clearStates();

        return;
      }

      var roundedGap = Math.round(gap);

      if (roundedGap >= 1)
      {
        if(isPasswordSet)
        {
          setPasswordTest(x => x)
          setPasswordTestHumanReadable(x => x + '<span style="color:#50ff50">[' + roundedGap + 's]</span>');
          setPasswordTestUnicode(x => x + String.fromCharCode(0xE001 + roundedGap));
          setPasswordTestUnicodeHumanReadable(x => x + '\\U+E001' + roundedGap);
        }
        else
        {
          setHasOneUnicodeTimeCharacter(true);
          setBuiltPassword(x => x);
          setBuiltPasswordHumanReadable(x => x + '<span style="color:#50ff50">[' + roundedGap + 's]</span>');
          setBuiltPasswordUnicode(x => x + String.fromCharCode(0xE001 + roundedGap));
          setBuiltPasswordUnicodeHumanReadable(x => x + '\\U+E001' + roundedGap);
        }
      }
    }

    setTimer(0);

    if (isPasswordSet)
    {
      if (event?.nativeEvent?.inputType == 'deleteContentBackward')
      {
        setPasswordTestInput('');
        setPasswordTest('');
        setPasswordTestHumanReadable('');
        setPasswordTestUnicode('');
        setPasswordTestUnicodeHumanReadable('');
      }
      else
      {
        var character = event?.nativeEvent?.data ?? '';

        if (character != '')
        {
          setPasswordTestInput(x => x + character);
          setPasswordTest(x => x + character);
          setPasswordTestHumanReadable(x => x + character);
          setPasswordTestUnicode(x => x + character);
          setPasswordTestUnicodeHumanReadable(x => x + character);
        }
      }
    }
    else
    {
      if (event?.nativeEvent?.inputType == 'deleteContentBackward')
      {
        setPasswordInput('');
        setBuiltPassword('');
        setBuiltPasswordHumanReadable('');
        setBuiltPasswordUnicode('');
        setBuiltPasswordUnicodeHumanReadable('');
      }
      else
      {
        var character = event?.nativeEvent?.data ?? '';

        if (character != '')
        {
          setPasswordInput(x => x + character);
          setBuiltPassword(x => x + character);
          setBuiltPasswordHumanReadable(x => x + character);
          setBuiltPasswordUnicode(x => x + character);
          setBuiltPasswordUnicodeHumanReadable(x => x + character);
        }
      }
    }
  }

  return { timer, builtPassword, builtPasswordHumanReadable, builtPasswordUnicode, builtPasswordUnicodeHumanReadable, passwordInput, isPasswordSet, handleSave, handleChange, handleTest, handleStartOver, passwordTestInput, passwordTest, passwordTestHumanReadable, passwordTestUnicode, passwordTestUnicodeHumanReadable, doTestPasswordsMatch, doTestUnicodePasswordsMatch, doTestUnicodeHumanReadablePasswordsMatch }
}

const Header = props => {
  const { timer, builtPassword, builtPasswordHumanReadable, builtPasswordUnicode, builtPasswordUnicodeHumanReadable, passwordInput, isPasswordSet, handleSave, handleChange, handleTest, handleStartOver, passwordTestInput, passwordTest, passwordTestHumanReadable, passwordTestUnicode, passwordTestUnicodeHumanReadable, doTestPasswordsMatch, doTestUnicodePasswordsMatch, doTestUnicodeHumanReadablePasswordsMatch } = useTimer(0)

  return (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <span className="icon fa-hand-o-up"></span>
    </div>
    <div className="content">
      <div className="inner">
        <h1>Dimension #4</h1>
        <br />
        {isPasswordSet == true &&
          <div>
          <p>Ok.  If you can type anything into the box below that makes a the three passwords match, I'll give you $1.</p>
          <h5>Hint, there isn't anything* you can type in here.  Try copying and pasting into other text editors.</h5>
          <form>
            <input type="text" name="passwordTestInput" value={passwordTestInput} onChange={handleChange}></input>
            <button type="button" onClick={(event) => handleTest()}>Test!</button>
          </form>
          <h4>{formatTime(timer)}</h4>
          [{builtPassword}] {doTestPasswordsMatch && <span className="icon fa-hand-o-up"></span>} {!doTestPasswordsMatch && <span className="icon fa-hand-o-down"></span>} [{passwordTest}]<br />
          [{builtPasswordUnicode}] {doTestUnicodePasswordsMatch && <span className="icon fa-hand-o-up"></span>} {!doTestUnicodePasswordsMatch && <span className="icon fa-hand-o-down"></span>} [{passwordTestUnicode}]<br />
          [{builtPasswordUnicodeHumanReadable}] {doTestUnicodeHumanReadablePasswordsMatch && <span className="icon fa-hand-o-up"></span>} {!doTestUnicodeHumanReadablePasswordsMatch && <span className="icon fa-hand-o-down"></span>} [{passwordTestUnicodeHumanReadable}]<br />
          <button type="button" onClick={(event) => handleStartOver()}>Start Over</button>
          </div> 
        }

        {!isPasswordSet == true &&
          <div>
          <p>Enter a password, but use pauses in between words.</p>

          <form>
            <input type="text" name="passwordInput" value={passwordInput} onChange={handleChange}></input>
            <button type="button" onClick={(event) => handleSave()}>Save</button>
          </form>
          <h4>{formatTime(timer)}</h4>
          Password: {builtPassword}<br />
          Password for display: {parse(builtPasswordHumanReadable)}<br />
          Password encoded in Unicode: {builtPasswordUnicode}<br />
          <h5>{parse(builtPasswordUnicodeHumanReadable ?? '')}</h5>
          </div>
        }
        <br />
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('intro')
            }}
          >
            Intro
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('work')
            }}
          >
            Work
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('about')
            }}
          >
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('contact')
            }}
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  </header>
)
          }

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timePwrdChanged: PropTypes.func,
  timeout: PropTypes.bool,
  timePwrd: PropTypes.string
}

export default Header
