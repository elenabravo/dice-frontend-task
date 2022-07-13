import React from 'react'
import 'twin.macro'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p tw="border-2 border-red-500">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h1 tw="text-blue-500 text-4xl">Hello world</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
