import { useState, useEffect } from 'react';
import './App.css';



const arr = [];
const arrSize =32;
function getAmount(arr) {
  let number = Math.floor(Math.random()*60);
  let found = false;
  for(let i=0;i<arr.length;i++) {
    if(number==arr[i].amount){
      found=true;
    }
    
  }
  if(found==true) {
    return getAmount(arr)
  }
  return number;
}
for(let i=0;i<arrSize/2;i++) {
arr.push({"id":i+1,"amount":getAmount(arr)});
}
for(let i=0;i<arrSize/2;i++) {
arr.push({"id":i+arrSize/2, "amount":arr[i].amount});
}

const pairOfArrayCards = [...arr]


const App= () =>  {

  const[arrayCards, setArrayCards] = useState([])
  const[openedCards, setOpenedCards] = useState([])
  const[matched, setMatched] = useState([])
  const[moves, setMoves] = useState(0)



  const shuffle = (array) =>{
    let currentIndex = array.length,
    temporaryValue,
    randomIndex

    while(currentIndex !==0){
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -=1

      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  useEffect(()=>{
    setArrayCards(shuffle(pairOfArrayCards))
  },[])

  const flipCard = (index) => () => {
    setOpenedCards(opened => [...opened, index])
    setMoves(prevMove => prevMove + 1)
  
  }


  useEffect(() => {
    if(openedCards < 2) return
   const firstMatched = arrayCards[openedCards[0]]
   const secondMatched = arrayCards[openedCards[1]]

  if(secondMatched && firstMatched.amount === secondMatched.amount){
    setMatched([...matched,firstMatched.amount])
  }
   if(openedCards.length ===2) setTimeout(() => setOpenedCards([]), 1000)
 
}, [openedCards])

  const handleGameRestart = () => {
      setOpenedCards([])
      setMatched([])
      setMoves(0)
      setArrayCards(shuffle(pairOfArrayCards))
  }


  return (
    <div className="container">
    <div className='mahjong'>Mahjong</div>
     <p className='number_strokes'>Moves: {moves}</p>
     <div className='cards'>
      {arrayCards.map(( item, index  ) => {
        let isFlipped = false;

        if(openedCards.includes(index)) isFlipped = true
        if(matched.includes(item.amount)) isFlipped = true

        return (
          <div key={index}  
          className={`card ${isFlipped ? 'flipped' : ''}`}
          onClick={flipCard(index)}> 
              <div className='inner'>
                <div className='front'>{item.amount} 
                </div>
               
         </div>
      </div>
        )
      })}
     </div>
     <button className='butt_restart' onClick={handleGameRestart}>Restart</button>
    </div>
  );
}

export default App;
