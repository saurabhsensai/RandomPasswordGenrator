import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [setchar, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordref = useRef(null);



  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbers) str += "0123456789"
    if (setchar) str += "!@#$%^&*(){}[]_+="

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbers, setchar, setPassword])


  const copyPasswordToClip = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);

  }, 
  [password])

  useEffect(() => {
    passwordGenrator();
  }, [length, numbers, setchar, passwordGenrator])

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg  px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Genrator </h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly 
            ref={passwordref}/>
          <button onClick={copyPasswordToClip} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />

            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numbers}
              id="numberInput"
              onChange={() => { setNumbers((prev) => !prev) }}>
            </input>
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={setchar}
              id="characterInput"
              onChange={() => { setCharacter((prev) => !prev) }}>
            </input>
            <label>Characters</label>
          </div>
        </div>
      </div>



    </>
  )
}

export default App
