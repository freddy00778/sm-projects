import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {scopeActions} from "../_store/scopes.slice";

type ListItem = {
  id: string;
  content: string;
}

const ScopeForm: React.FC = () => {
  //@ts-ignore
  const {user} = useSelector(state => state.auth)
  //@ts-ignore
  const {scopes} = useSelector(state => state.scopes)
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [boxItems, setBoxItems] = useState<ListItem[]>([]);
  const dispatch = useDispatch()

  useEffect(() => {
    //@ts-ignore
    dispatch(scopeActions.getScopeByProjectId({ id: user.project_id }));
  }, [dispatch, user.project_id]);

  useEffect(() => {
    if (scopes && scopes.data) {
      const inScopeItems = scopes.data
          .filter(scp => scp.in_scope)
          .map(scp => ({
            id: scp.id,
            content: scp.description,
          }));

      const outOfScopeItems = scopes.data
          .filter(scp => !scp.in_scope)
          .map(scp => ({
            id: scp.id,
            content: scp.description,
          }));

      setBoxItems(inScopeItems);
      setListItems(outOfScopeItems);
    }
  }, [scopes]);


  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropToBox = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("text");
    const item = listItems.find((item) => item.id === id);

    if (item) {
      setListItems(listItems.filter((item) => item.id !== id));
      setBoxItems([...boxItems, item]);
      console.log("items", item)
      //@ts-ignore
      dispatch(scopeActions.updateScope({
        id: item.id,
        in_scope: true
      }))
    }
  };

  const handleDropToList = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("text");
    const item = boxItems.find((item) => item.id === id);

    if (item) {
      setBoxItems(boxItems.filter((item) => item.id !== id));
      setListItems([...listItems, item]);

      //@ts-ignore
      dispatch(scopeActions.updateScope({
        id: item.id,
        in_scope: false
      }))
    }
  };

  const handleDelete = (id: string) => {
    setListItems(listItems.filter((item) => item.id !== id));
    setBoxItems(boxItems.filter((item) => item.id !== id));
    //@ts-ignore
    dispatch(scopeActions.deleteScope({id: id}))
  };

  return (
      <form className="flex flex-col w-full h-screen overflow-y-auto max-h-[10000px]  scrollbar-none my-10 space-y-20 ">
        <div className="flex w-full h-full px-20 items-start justify-between space-x-6">
          <div className="w-2/4 h-full space-y-6">
            <h1>Drag a scope item into the box </h1>
            <div
                className="w-full flex flex-col border-border border rounded-xl h-[85%] px-4 py-2 space-y-3 cursor-grab"
                onDrop={handleDropToBox}
                onDragOver={handleDragOver}
            >
              {boxItems.length === 0 ? (
                  <h2>No item in scope</h2>
              ) : (
                  boxItems.map((item) => (
                      <div
                          key={item.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, item.id)}
                          className="flex w-full rounded-lg cursor-grab items-center mt-2 px-6 py-4 bg-primary-50 justify-between bg-opacity-50"
                      >
                        <h1 className="cursor-grab">{item.content}</h1>
                        <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                  ))
              )}
            </div>
          </div>
          <div className="w-2/4 h-full space-y-6">
            <h1 className="text-center">Scope List</h1>
            <div
                className="w-full h-full"
                onDrop={handleDropToList}
                onDragOver={handleDragOver}
            >
              <div>
                {listItems.length === 0 ? (
                    <h2>No item out of scope</h2>
                ) : (
                    listItems.map((item) => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            className="flex w-full rounded-lg cursor-grab items-center mt-2 px-6 py-4 bg-primary-50 justify-between bg-opacity-50"
                        >
                          <h1>{item.content}</h1>
                          <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="text-red-500"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
  );
};

export default ScopeForm;