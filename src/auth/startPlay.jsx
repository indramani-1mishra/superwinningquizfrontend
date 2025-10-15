function StartPlay () {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center text-white opacity-75'>
      <div class='start-banner'>
        
        <h3>
          LET’s DO SOME TRIAL
          <br />
          BEFORE
          <br />
          START TO PLAY
        </h3>
        <button className='glow-on-hover mt2' type='button'>
          <a class='play' href='/quiz'>
            Play
          </a>
        </button>
      </div>
    </div>
  )
}
export default StartPlay
