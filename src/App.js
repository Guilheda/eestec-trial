import React from 'react';

function App() {

  const [list, setList] = React.useState([]) //saves list
  const [item, setItem] = React.useState("") //gets items
  const [itemEditing, setItemEditing] = React.useState(null)//saves the id of the item being edited
  const [editingText, setEditingText] = React.useState("")//saves the text for the item editing

  function addtolist(e){
    e.preventDefault()//blocks default form actions(like refreshing the page)
    const newitem = {
      id: newID(),
      string: item,
    }
    setList([...list].concat(newitem));
    setItem("");
  }

  function newID(){
    let x = 0;
    list.map((item) => {
      if (item.id >= x) 
        x = item.id;
      return x;
    });
    return x+1;
  }

  function deleteItem(id){
    let templist = [...list].filter((item) => item.id !== id)
    setList(templist)
  }

  function editItem(id){
    let templist = [...list].map((item) => {
      if (item.id === id) {
        item.string = editingText;
      }
      return item;
    });
    setList(templist);
    setItemEditing(null);
  }

  return (
    <div>
      <h1>My list</h1>
      <form onSubmit={addtolist}>
      <input type="text" name="name" onChange={(e) => setItem(e.target.value)}/>
      <button type="submit">Add to the list</button>
      </form>
      <ul>
      {list.map((item) => {
         return (<li>
           {item.id === itemEditing ? (
              <input
                type="text"
                placeholder={item.string}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div key={item.id}>{item.string}</div>
            )}

           {item.id === itemEditing ? (
              <button onClick={() => editItem(item.id)}>Done</button>
            ) : (
              <button onClick={() => setItemEditing(item.id)}>Edit</button>
            )} 
           <button onClick={() => deleteItem(item.id)}>Delete</button>
           
           </li>
          );
        })}
      </ul> 
    </div>
  );
}

export default App;
