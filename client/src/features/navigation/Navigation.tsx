import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavState, NavSection, setNavSection } from 'features/navigation/navSlice';
import { v1 as uuid } from 'uuid';
import type { RootState } from 'app/rootReducer';



export const Navigation: React.FC  = () => {
  const dispatch = useDispatch();
  const navSections: Array<NavSection> = ['Upload Video', 'Mosaic Video', 'Mosaic Image', 'Render Download'];
  const { navSection } = useSelector<RootState, NavState>((state) => state.nav);

  const onClickHandler = (newStateValue: NavSection) => {
    dispatch(setNavSection({navSection: newStateValue}));
  }

  return (
    <div style={{display: 'flex'}}>
      { navSections.map((section) =>
        <div key={uuid()} >
          { section !== navSection ?
              <div  onClick={() => onClickHandler(section)} 
                    style={{backgroundColor: '#00ff00', width: '100px', height: '100px'}}>
                    {section}
              </div>
            : <div  style={{backgroundColor: '#005500', width: '100px', height: '100px'}}>
                    {section}
              </div>
          }
        </div>  
        )
      }
    </div>
  )

}