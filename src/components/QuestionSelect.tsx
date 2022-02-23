import React,{ useState } from 'react'
import { Difficulty } from '../API'

type Props = {
    callback: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const QuestionSelect: React.FC<Props> = ({
   callback 
}) => {

  return (
    <div>
        <select name="difficulty" id="difficulty" onChange={callback}>
            <option value={Difficulty.EASY}>{Difficulty.EASY}</option>
            <option value={Difficulty.MEDIUM}>{Difficulty.MEDIUM}</option>
            <option value={Difficulty.HARD}>{Difficulty.HARD}</option>
        </select>
    </div>
  )
}

export default QuestionSelect