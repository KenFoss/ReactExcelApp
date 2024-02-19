import { useState, useEffect, createRef } from 'react';

function DataMapping({sheetCells}) {
  let sheetName = sheetCells['name'];
  let sheetContent = sheetCells['sheet'];

  let mapData = Object.entries(sheetContent).map(([key, value]) => {
      return(
        <div key={key} className="column">
          {value.map((x) => {
            return (
              <div className="row">
                <input type = "text" ref={x}/>
              </div>
            )
          })}
          { key === 'A' ? <a clasName = 'add-row'> Add Row </a> : ''}
        </div>
      );
    });

  return(
    <div className={"sheet-table"}>
      {mapData}
      <a className='add-column'> Add Column </a>
    </div>
  );
}

function Sheet() {
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
  
  useEffect( () => {console.log(sheetNum)},[sheetNum]);

  return (
    <div>
      <DataMapping className="sheet-page" sheetCells={sheets[sheetNum]}/>
      
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