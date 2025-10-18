import React from 'react'
import './StarterSection.css'

const StarterSection = ({todos,isCompleted}) => {
  return (
    <div className='todo-section'>

        {todos.length === 0 && (
          <div className="empty-state">
            <h2>Every big goal starts with one small task.</h2>
            <p>Plan it now. Complete it soon. Progress starts here.</p>
          </div>
        )}


        {todos.length > 0 && (
          <>
            <div className='article'>
              <div>
                <h2>Todo Done</h2>
                <p>Keep it up</p>
              </div>
            </div>

            <div>
              <p className='done-todo'>
                <span>
                  {isCompleted}/{todos.length}
                </span>
              </p>
            </div>
          </>
        )}

      </div>
  )
}

export default StarterSection
