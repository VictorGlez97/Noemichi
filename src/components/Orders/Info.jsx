import moment from "moment";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";


const Info = ({ info, HandleCloseModal }) => {

    return(
        <div style={{ marginTop: '-.5rem' }}>
            <div className="mb-4">

                <div className="mt-1 mb-2">
                    <label htmlFor="" className="text-lg"> Nombre pedido: </label>
                    <span className="text-lg font-bold">{ info.title }</span>
                </div>

                <div className="mt-1 mb-2">
                    <label htmlFor="" className="text-lg"> Telefono: </label>
                    <span className="text-lg font-bold">{ info.phone }</span>
                </div>

                <div className="mt-1 mb-2">
                    <label htmlFor="" className="text-lg"> Día de entrega: </label>
                    <span className="text-lg font-bold">{ moment(info.deliver).format('DD/MM/YYYY') }</span>
                </div>
                
                <div className="mt-1 mb-2">
                    <label htmlFor="" className="text-lg"> Nota: </label>
                    <span className="text-lg font-bold">{ info.text }</span>
                </div>

            </div>

            {
                info.products !== undefined && info.products.length > 0
                ?
                <div className="flex justify-content-center mb-4">
                    <DataTable
                        value={info.products} 
                        tableStyle={{ minWidth: '50rem' }}
                    >
                        <Column field='name' header='Producto'></Column>
                        <Column field='number' header='No. pancitos'></Column>
                        <Column field='amount' header='Ninero'></Column>
                    </DataTable>
                </div>
                : 
                <></>
            }

            <div className="flex justify-content-end">
                <Button label='Cerrar' onClick={HandleCloseModal} />
            </div>
        </div>
    )
}

export default Info;