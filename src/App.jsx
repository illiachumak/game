import { Input as StrapInput } from "reactstrap";
import React from "react";
import styles from './App.module.scss';

function App() {
  const [password, setPassword] = React.useState('')
  const [strength, setStrength] = React.useState('EMPTY')
  const [strengthText, setStrengthText] = React.useState('')


  const formId = React.useId();

  const StrengthCheck = (e) => {
    setPassword(e.target.value);
    const password = e.target.value;
  
    if (password.length === 0) {
      setStrengthText('')
      setStrength('EMPTY')
      return
    } else if (password.length < 8) {
     setStrength('TOO_SHORT')
     setStrengthText('password must be at least 8 charachters!')
     return
    }
  
    const hasLetters = /[a-z]/i.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[^a-z\d]/i.test(password);
  
    if (hasLetters && hasNumbers && hasSymbols) {
      setStrength('STRONG')
      setStrengthText('strong')
      return
    } else if ((hasLetters && hasSymbols) || (hasLetters && hasNumbers) || (hasNumbers && hasSymbols)) {
      setStrength('MEDIUM')
      setStrengthText('medium')
      return
      
    } else {
      setStrength('EASY')
      setStrengthText('easy')
      return
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(strength === 'STRONG'){
    alert('Sending data to server')
    } else {
      alert('Password is too simple!')
    }
  }



  return (
    <>
      <div className={`${styles.wrapper}`}>
        <h3>Password Strength</h3>
            <form id={formId} className={`${styles.form_container}`} onSubmit={handleSubmit}>
              <div>
                <StrapInput
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={StrengthCheck}
                      className={`${styles.input}`}
                    />
                    
                    <div className={`${styles.progress_bar} ${styles[strength.toLowerCase()]}`}>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className={`${styles.alertion}`}>{strengthText}</div>

              </div>

                
                <button type="submit" id={formId} className={`${styles.form_button}`}>Submit</button>
            </form>
      </div>
    </>
  );
}

export default App;
