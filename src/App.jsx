import { useState , useCallback , useEffect , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length , setLength] = useState(8);
  const [numAllowed , setNumAllowed ] = useState(false);
  const [charAllowed , setCharAllowed ] = useState(false);
  const [ password ,  setPassword ] = useState("");
  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvexyz"

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*"

    for(let i = 1; i <= length; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  } , [length , numAllowed , charAllowed , setPassword]) 

  const copyPasswordToClipbord = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0 , 999)
    window.navigator.clipboard.writeText(password)
  } , [password])

 useEffect(() => {passwordGenerator()} , [length , numAllowed , charAllowed ,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8
       text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>password generator</h1>
         <div className="flex shadown rounded-lg overflow-hidden mb-4">
          <input 
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref = {passwordRef}
          />
          <button 
          onClick={copyPasswordToClipbord}
          className='outline-none bg-blue-700 text-white
           py-3 py-0.5 shrink-0
          '>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) =>{setLength(e.target.value)}}
            />
            <label> Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
             type='checkbox'
             defaultChecked={numAllowed}
             id='numberInput'
             onChange={()=>{
              setNumAllowed((prev)=> !prev)
             }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
             type='checkbox'
             defaultChecked={charAllowed}
             id='characterInput'
             onChange={()=>{
              setCharAllowed((prev)=> !prev)
             }}
            />
            <label htmlFor='characterInput'>Character</label>
          </div>

        </div>
        </div>
    </>
  )
}

export default App
