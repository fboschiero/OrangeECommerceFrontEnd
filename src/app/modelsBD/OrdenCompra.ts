import { Item } from './Item';
import { Pago } from './Pago';

export class OrdenCompra {

    numero: string;
    impuestos: number;
    fecha: Date;
    estado: number;

    items: Item[];
    pago: Pago;

    constructor(){
    }

    getMontoVenta(): number{
        let montoTotal = 0;
        
        this.items.forEach(i => {
            let precioItem = i.precio * i.cantidad;
            if (i.descuento) {
                // aplicar descuento
                const porcentaje = i.descuento.porcentaje;
                if (porcentaje) {
                    precioItem = precioItem * 100 / porcentaje;
                }
                const montoDescuento = i.descuento.montoFijo;
                if (montoDescuento) {
                    precioItem = precioItem - montoDescuento;
                }
            }
            montoTotal = montoTotal + precioItem;
        });

        return montoTotal;
    }

}
