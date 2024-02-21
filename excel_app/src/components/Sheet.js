import { useState, useEffect, createRef } from 'react';

function Sheet() {
  // states, constants
  const [sheetNum, setSheetNum] = useState(0);
  const [maxSheetNum, setMaxSheetNum] = useState(1);
  const [sheets, setSheets] = useState(
    [{"name" : 'sheet1', "sheet" : {
      A : [createRef(''), createRef(''), createRef(''), createRef(''), createRef('')
      , createRef(''), createRef(''), createRef(''), createRef(''), createRef('')],
      B : [createRef(''), createRef(''), createRef(''), createRef(''), createRef('')
      , createRef(''), createRef(''), createRef(''), createRef(''), createRef('')],
      C : [createRef(''), createRef(''), createRef(''), createRef(''), createRef('')
      , createRef(''), createRef(''), createRef(''), createRef(''), createRef('')],
      D : [createRef(''), createRef(''), createRef(''), createRef(''), createRef('')
      , createRef(''), createRef(''), createRef(''), createRef(''), createRef('')],
      E : [createRef(''), createRef(''), createRef(''), createRef(''), createRef('')
      , createRef(''), createRef(''), createRef(''), createRef(''), createRef('')]
    }}]
  )

  // letter reference
  let letterReference = ['A','B','C','D','E','F','G','H','I','J','K','L']

  // methods

  const handleSheetChange = (index) => {
    setSheetNum(index);
  }

  const addSheet = () => {
    setSheets([...sheets, 
      {"name" : `sheet${maxSheetNum+1}`, "sheet" : {
        A : [createRef(''), createRef(''), createRef(''), createRef(''), createRef('')
        , createRef(''), createRef(''), createRef(''), createRef(''), createRef('')],
        B : [createRef(''), createRef(''), createRef(''), createRef(''), createRef('')
        , createRef(''), createRef(''), createRef(''), createRef(''), createRef('')],
        C : [createRef(''), createRef(''), createRef(''), createRef(''), createRef('')
        , createRef(''), createRef(''), createRef(''), createRef(''), createRef('')],
        D : [createRef(''), createRef(''), createRef(''), createRef(''), createRef('')
        , createRef(''), createRef(''), createRef(''), createRef(''), createRef('')],
        E : [createRef(''), createRef(''), createRef(''), createRef(''), createRef('')
        , createRef(''), createRef(''), createRef(''), createRef(''), createRef('')]
        }}
      ]);
    setMaxSheetNum(maxSheetNum+1);
  }

  const addSheetRow = () => {
    console.log('hello')
    console.log(sheets[sheetNum]['sheet'])
    let addRow = Object.entries(sheets[sheetNum]['sheet']).reduce( (acc, [key, value]) => {
      acc[key] = [...value, createRef('')]
      return acc
    }, {});


    // It is easier to remake the sheet I am manipulating here
    // React uses simple comparison to determine if 'sheets' has changed
    // when determining if a re-render is necessary when 'setSheets' is called.
    // 
    // if I let newSheets = sheets and then manipulate this I will change this reference object.
    // If I then setSheets(newSheets) react doesn't recognize the change as it is comparing to the same 
    // reference object I just changed, and sees no difference.
    setSheets(
      [
        ...sheets.slice(0, sheetNum), 
        {'name' : sheets[sheetNum]['name'], 'sheet' : addRow},
        ...sheets.slice(sheetNum+1)
      ]
    );
  }

  const addSheetCol = () => {
    // let newColRefs = Array.from(sheets[sheetNum]['sheet']['A'], (x) => createRef(''))
    let lastLetter = 'A'

    // Iterate through current column and put a flag at the last letter
    for (let [key, value] of Object.entries(sheets[sheetNum]['sheet'])){
      if(letterReference.indexOf(key)> letterReference.indexOf(lastLetter)){
        lastLetter = key
      }
    }

    console.log(`last letter ref ${letterReference.indexOf(lastLetter)}`)
    console.log(`len is ${letterReference.length}`)
    // Ensure this is a valid column to add
    if(letterReference.indexOf(lastLetter) >= letterReference.length - 1){
      console.error('You have reached the max column number!!')
      return;
    }

    // new letter is lastLetter index +1
    let newLetter = letterReference[letterReference.indexOf(lastLetter)+1]

    let newSheet = sheets[sheetNum]['sheet'];
    newSheet[newLetter] = Array.from(sheets[sheetNum]['sheet']['A'], (x) => createRef(''));

    setSheets(
      [
        ...sheets.slice(0, sheetNum),
        {'name':sheets[sheetNum]['name'], "sheet" : newSheet},
        ...sheets.slice(sheetNum+1)
      ]
    )

  }

  const handleDownKey = (e, colLetter, index) => {
    // if arrow is down and there is an input below our current location, move cursor down
    if(e.key === 'ArrowDown' && index + 1 < sheets[sheetNum]['sheet'][colLetter].length) {
      console.log(`Sheets are da sheet`)
      console.log(sheets[sheetNum]['sheet'])
      console.log(`col letter ${colLetter}`)
      console.log(`index is ${index}`)
      console.log(`max index is ${sheets[sheetNum]['sheet'][colLetter].length}`)
      console.log(`c index is ${index}`)
      console.log(`is next index ${index + 1 < sheets[sheetNum]['sheet'][colLetter].length}`)
      console.log('IMPORTANT PARET')
      console.log(sheets[sheetNum]['sheet'][colLetter][index+1])
      sheets[sheetNum]['sheet'][colLetter][index+1].current.focus()
    } else if(e.key === 'ArrowDown') {
      // This is arrow down in last box of the column, we want to move to the top of the col
      sheets[sheetNum]['sheet'][colLetter][0].current.focus()
    } else if (e.key === 'ArrowRight'){
      let lastLetter = 'A'
      // Iterate through current column and put a flag at the last letter
      for (let [key, value] of Object.entries(sheets[sheetNum]['sheet'])){
        if(letterReference.indexOf(key)> letterReference.indexOf(lastLetter)){
          lastLetter = key
        }
      }

      // If this is not the last letter, move right, else move to the beginning
      if(letterReference.indexOf(colLetter) + 1 <= letterReference.indexOf(lastLetter)){
        sheets[sheetNum]['sheet'][letterReference[letterReference.indexOf(colLetter) + 1]][index].current.focus()
      } else {
        // else move to the beginning
        sheets[sheetNum]['sheet']['A'][index].current.focus()
      }

      console.log(`this col letter inded ${letterReference.indexOf(colLetter)}`)
      console.log(`total length ${letterReference.indexOf(lastLetter)}`)
      console.log(`Have we reached the end? ${letterReference.indexOf(colLetter) + 1 <= letterReference.indexOf(lastLetter)}`)
    }
  }


  // Components

  function DataMapping() {
    let sheetCells = sheets[sheetNum]['sheet'];
    let sheetName = sheetCells['name'];
  
    let mapData = Object.entries(sheetCells).map(([key, value]) => {
        return(
          <div key={key} className="column">
            {value.map((x, index) => {
              return (
                <div className="row">
                  <input type = "text" 
                    ref={x}
                    onKeyDown={(e) => handleDownKey(e, key, index)}
                  />
                </div>
              )
            })}
            { key === 'A' ? <a className = 'add-row' onClick = {() => addSheetRow()}> Add Row </a> : ''}
          </div>
        );
      });
  
    return(
      <div className={"sheet-table"}>
        {mapData}
        <a className='add-column' onClick={() => addSheetCol()}> Add Column </a>
      </div>
    );
  }

  // Effects
  
  useEffect( () => {console.log(sheets)},[sheets]);


  // jsx
  return (
    <div>
      <DataMapping className="sheet-page"/>
      
      <div className="sheet-selector">
        {
          sheets.map((x,index) => {
            return(
              <a 
                key={index} 
                className = {index == sheetNum ? 'sheet-selected' : 'sheet-not-selected'} 
                onClick={() => handleSheetChange(index)}> 
                  Select {x['name']} 
              </a>
            )
          }) 
        }
        <a
          className='sheet-not-selected'
          key='add_page'
          onClick={() => addSheet()}
        >
          Add Page
        </a>
      </div>
    </div>
  )
}

export default Sheet;