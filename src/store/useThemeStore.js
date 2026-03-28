
import {create} from 'zustand'
const useThemeStore = create((set)=>
    ({
        mode: 'dark',
        toggleTheme: ()=>{
        
        
            set((state)=>({
                mode: state.mode === 'light'?  'dark' :'light'
            }));
            
        },
       
    })
);
export default useThemeStore;