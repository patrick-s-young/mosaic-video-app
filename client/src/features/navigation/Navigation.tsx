import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNavSection } from 'features/navigation/navSlice';
import type { NavState, NavSection } from 'features/navigation/navSlice';
import { v1 as uuid } from 'uuid';
import type { RootState } from 'app/rootReducer';



export const Navigation: React.FC  = () => {
  const dispatch = useDispatch();
  const navSections: Array<NavSection> = ['Upload Video', 'Edit Mosaic', 'Render Mosaic'];
  const { navSection } = useSelector<RootState, NavState>((state) => state.nav);

  const onClickHandler = (newStateValue: NavSection) => {
    dispatch(setNavSection({navSection: newStateValue}));
  }

  return (
    <div style={{display: 'flex', width: '480px'}}>
      { navSections.map((section) =>
        <div key={uuid()} >
          { section !== navSection ?
              <div  onClick={() => onClickHandler(section)} 
                    style={{backgroundColor: '#009900', width: '156px', height: '80px', margin: '2px', color: '#fff' }}>
                    {section}
              </div>
            : <div  style={{backgroundColor: '#00ff00', width: '156px', height: '80px', margin: '2px' }}>
                    {section}
              </div>
          }
        </div>  
        )
      }
    </div>
  )

}