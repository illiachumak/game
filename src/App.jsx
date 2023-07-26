import { Input as StrapInput } from "reactstrap";
import React, { useEffect, useState } from "react";
import styles from './App.module.scss';
import { setPassword } from "./redux/slices/passwordSlice";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from 'lodash';

function App() {

  const dispatch = useDispatch();

  const { password, strength, text: strengthText } = useSelector(state => state.password);
  const [localPassword, setLocalPassword] = useState(password);
  
  const debouncedDispatch = debounce(value => dispatch(setPassword(value)), 500);

  useEffect(() => {
    debouncedDispatch(localPassword);
    return debouncedDispatch.cancel;
  }, [localPassword, debouncedDispatch]);

  const handleChange = (e) => {
    setLocalPassword(e.target.value);
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
        <form className={`${styles.form_container}`} onSubmit={handleSubmit}>
          <div>
            <StrapInput
              placeholder="Password"
              name="password"
              value={localPassword}
              onChange={handleChange}
              className={`${styles.input}`}
            />
            
            <div className={`${styles.progress_bar} ${styles[strength.toLowerCase()]}`}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={`${styles.alertion}`}>{strengthText}</div>

          </div>
          <button type="submit" className={`${styles.form_button}`}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
