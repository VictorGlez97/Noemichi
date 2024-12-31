
import { InputText } from 'primereact/inputtext'
import { Fieldset } from 'primereact/fieldset'
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import api from '../services/noemichi';

const Config = () => {
    
    const [socialMedia, setSocialMedia] = useState([]);

    useEffect(() => {
        getConfigSocialMedia();
    }, [])

    const getConfigSocialMedia = async () => {
        const response = await api.get(`config?type=SOCIALMEDIA`);
        if (response.response.data.data !== undefined && response.response.data.data.length > 0) {
            setSocialMedia(response.data.data);
        }
    }

    const GuardaConfig = () => {

    }

    return(
        <>
            <div className='flex justify-content-center'>

                <Fieldset 
                    legend='Social media' 
                    toggleable
                    className='w-4'
                >

                    <div className='flex justify-content-around'>
                        <div className='vertical-align-middle'>
                            <span><i className='pi pi-instagram' style={{ fontSize: '2rem' }}></i></span>
                        </div>

                        <div>
                            <InputText value={instagram} className="p-inputtext-sm" onChange={(e) => setInstagram(e.target.value)} />
                        </div>

                        <div>
                            <Button label='Guardar' size='small' onClick={() => GuardaConfig('instagram', instagram)} />
                        </div>
                    </div>

                </Fieldset>

            </div>
        </>
    )
}

export default Config;