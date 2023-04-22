import React, { useState } from 'react'
import './Paginator.scss'

const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / props.itemsMaxCount)

    const [currentPage, setCurrentPage] = useState(1)
    const [currentPortion, setCurrentPortion] = useState(Math.ceil(currentPage / props.itemsMaxCount))


    let leftPortionBorder = (currentPortion - 1) * props.itemsMaxCount + 1
    let rightPortionBorder = currentPortion * props.itemsMaxCount

    const onPageChanged=(i)=>{
        setCurrentPage(i)
        props.onPageChanged(i) 
    }

    return (
        <div className='pageButtons'>
            <button onClick={() => { setCurrentPortion(currentPortion - 1) }}
                disabled={currentPortion === 1}
                className='pageButtons_prevnext'
            >prev</button>
            {pages.filter(i => (i >= leftPortionBorder) && (i <= rightPortionBorder))
                .map(i => {
                    return (
                        <button
                            onClick={() => onPageChanged(i)}
                            className={currentPage === i ? "pageButtons_currentButton" : "pageButtons_button"}
                            key={i}
                        >
                            {i}&nbsp;
                        </button>
                    )
                })}
            <button onClick={() => { setCurrentPortion(currentPortion + 1) }}
                disabled={currentPortion === portionCount}
                className='pageButtons_prevnext'
            >next</button>
        </div>
    )
}
export default Paginator