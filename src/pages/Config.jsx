import { useEffect, useState } from 'react';
import api from '../services/noemichi';

import { InputText } from 'primereact/inputtext'
import { Fieldset } from 'primereact/fieldset'
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';

const Config = () => {
    
    const toast = useRef(null);

    // const [socialMedia, setSocialMedia] = useState([]);
    const [configurations, setConfigurations] = useState([]);

    useEffect(() => {
        getConfigs();
    }, [])

    const getConfigs = async () => {

        const response = await api.get('config/menu');

        console.log( response );

        if ( response.data.data && !response.data.error ) {
            setConfigurations(response.data.data);
        }

    }

    const handleInputChange = (configIndex, itemIndex, newValue) => {
        const updatedConfigurations = [...configurations]; 
        updatedConfigurations[configIndex].configs[itemIndex].value = newValue; 
        setConfigurations(updatedConfigurations);
    };

    const GuardaConfig = async ( configIndex, itemIndex, item ) => {
        try {
            
            item.value = configurations[configIndex].configs[itemIndex].value;
            const response = await api.put(`config/${item.idconfig}`, item);
            console.log( response );

            if ( response.data.data ) {
                
                if ( response.data.status === 200 && !response.data.data.error ) {
                    getConfigs();
                    toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Configuración actualizada!', life: 3000 });
                    return;   
                }
            }

            toast.current.show({ severity: 'error', summary: 'Error', detail: res.data.data.mensaje, life: 3000 });

        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
        }
    }

    return(
        <div className='flex justify-content-center'>
            <Toast ref={toast} />
            <div className='flex-block justify-content-center col-6 gap-5'>

                {
                    configurations.map((config, indexC) => (
                        <Fieldset
                            legend={config.type}
                            key={config.type}
                            toggleable
                            className='w-full mt-2 mb-2'
                        >
                            {
                                config.configs.map((itm, indexI) => (
                                    <div className='flex justify-content-around mb-2 mt-1' key={itm.idconfig}>
                                        <div className='vertical-align-middle'>
                                            <span>
                                                <i 
                                                    className={itm.value2}
                                                    style={{ fontSize: '2rem', marginTop: '.3rem' }}
                                                ></i>
                                            </span>
                                        </div>

                                        {
                                            itm.value3 === 'Text'
                                            && 
                                            <div>
                                                <InputText 
                                                    className="p-inputtext-sm" 
                                                    value={config.configs[indexI].value} 
                                                    onChange={(e) => { handleInputChange( indexC, indexI, e.target.value ) }} 
                                                />
                                            </div>
                                        }

                                        {
                                            itm.value3 === 'Check'
                                            &&
                                            <div className='flex align-items-center gap-2'>
                                                <Checkbox 
                                                    inputId="isActive" 
                                                    checked={config.configs[indexI].value === 'true' ? true : false} 
                                                    onChange={(e) => { handleInputChange( indexC, indexI, e.checked.toString() ) }} 
                                                />
                                                <label htmlFor="isActive"> { config.configs[indexI].value2 } </label>
                                            </div>
                                        }
                                        
                                        <div>
                                            <Button 
                                                icon='pi pi-save' 
                                                size='small' 
                                                onClick={(e) => GuardaConfig( indexC, indexI, itm )} 
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </Fieldset>
                    ))
                }

            </div>
        </div>
    )
}

export default Config;