function Padre () { 
    const [like, setLike] = useState<boolean>({
        status: false,
        contador:0,
        page: "www.henry.com",
        texto:'otro dato'
    })
    
    const handlerLike = () => {
        setLike({
            ...like,
            status: true,
            contador: like.contador + 1
        })
    }

    const handlerDislike = () => {
        setLike({
            ...like,
            status: false,
            contador: like.contador - 1
        })
    }

    return(
        <div> 
            <h1>Padre</h1>
            <Hijo 
                like={like.status} 
                contador={like.contador}
                handlerLike={handlerLike}
                handlerDislike={handlerDislike}
            />
        </div>
    )
}

interface HijoProps {
    like: boolean;
    contador: number;
    handlerLike: () => void;
    handlerDislike: () => void;
}

function Hijo ({like, contador, handlerLike, handlerDislike}: HijoProps) { 

    return(
        <div> 
            <h2>Hijo</h2>
            <button 
            onClick={
                like ? handlerDislike() : handlerLike()
            }>Cambiar like {like ? "Le gusta" : "No le gusta"}</button>
        </div>
    )
}

function HijoDos ({ like, handlerLike }: HijoProps) {
    
    return(
        <div>
            <h2>HijoDos</h2>
        </div>
    )
}
