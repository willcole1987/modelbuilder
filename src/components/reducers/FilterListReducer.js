import {  filterListByNameSearchTextAndLevel,
          filterListByLevel,
          getListWithExcludedNode} from '../helpers/helpers';

const FilterListReducer = (filterList, action) =>
{
     let filteredList = [];

     switch (action.type)
     {
          case 'update':
               if(action.node !== 0)
               {
                    filteredList = filterListByNameSearchTextAndLevel(action.list, action.text, 5);
                    filteredList = getListWithExcludedNode(filteredList, action.excludedNode);
                    filterList = filteredList;
               }
               else
               {
                    filteredList = filterListByNameSearchTextAndLevel(action.list, action.text, 4);
                    filterList = filteredList;
               } 
               return filterList;    

          case 'reset':
               if(action.node === 0)
               {
                    filteredList = filterListByLevel(action.list, 4);
               }
               else
               {
                    filteredList = filterListByLevel(action.list, 5);
                    filteredList = getListWithExcludedNode(filteredList, action.excludedNode);
               }
               filterList = filteredList;
               return filterList;
                   
          default:
               return;
     }

}

export default FilterListReducer;