import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {Cart, Star, StarFill} from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';

function ProductoCard({producto}) {
    const [imgDir, setImgDir] = useState('/noImg.jpg');
    const [star, setStar] = useState(false);
    
    useEffect(() => {
        if(producto.direccionImagenes != null){
            if(producto.direccionImagenes.length > 0){
                setImgDir(producto.direccionImagenes[0]);
            }
        }
    },[producto]);

    const handleStar = () => {
        setStar(!star);
    }

    return (
        <div className="card h-100" style={{ width: '250px', height: '300px' }}>
            <div className="position-relative" style={{ height: '150px' }}>
                {star ? <StarFill className="position-absolute" style={{ color: 'yellow', top: '10px', right: '10px' }} onClick={handleStar}/> : <Star className="position-absolute" style={{ color: 'yellow', top: '10px', right: '10px' }} onClick={handleStar}/>}
                <img alt="" src={imgDir} className="card-img-top" style={{height: '100%'}}/>
            </div>
            <div className="card-body text-center">
                <h5 className="card-title text-truncate" style={{ maxHeight: '50px', overflow: 'hidden' }}>{producto.descripcion}</h5>
                <div className="mt-2">
                    <p className="mb-1 fs-4">${producto.precio}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/producto/${producto.id}`} className="btn btn-primary">
                        Ver detalle
                    </Link>
                    <Button className="btn btn-primary"><Cart /></Button>
                    <p className="mb-1 pt-3" style={{fontSize:'12px'}}>Stock: {producto.stock}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductoCard;