import {useState, useEffect, useCallback, useRef} from 'react';
import './style.css'

import logo from "../../../assets/images/logo.svg";

import todoService from '../../../services/todos';

function TodoInfo({item, ended}) {
    const imageRef = useRef();
    const draggingRef = useRef(false);
    const [ pos, setPos] = useState({x: 0, y: 0});

    const handler = useCallback((event) => {
        if(!draggingRef.current) return;

        const x = event.x - (imageRef.current.width / 2)
        const y = event.y - (imageRef.current.height / 2)

    console.log({x: imageRef.current.width})
        setPos({x, y});
    }, []);

    useEffect(() => {
        imageRef.current?.addEventListener('mousedown', () => {
            draggingRef.current = true;
            document.addEventListener('mousemove', handler)
        });

        imageRef.current?.addEventListener('mouseup', () => {
            draggingRef.current = false;
            document.removeEventListener('mousemove', handler)
        });
    }, [handler]);

    return (
        <div key={item} className="list-item-object">
            <div className="list-item-header">
                <img ref={imageRef} src={logo} className={`${ended ? 'ended' : ''}`} alt="logo"  style={{ transform: `translate(${pos.x}px, ${pos.y}px)`}}/>
                <h1>ID: {item.id}</h1>
            </div>
            <h2>userID: {item.userId}</h2>
            <h3>Title: {item.title}</h3>
            <h4>Completed: {item.completed}</h4>
            <div style={{height: 40}}>
                {ended && (<button>Click to reset</button>)}
            </div>
        </div>
    )
}

function ListItems() {
    const [list, setList] = useState([]);
    const [ended, setEnded] = useState(false);
    const containerRef = useRef();

    const handlePopulateList = useCallback(async () => {
        const { data: response } = await todoService.getTodos();

        setList(response);
    }, []);

    useEffect(() => {
        handlePopulateList();
    }, [handlePopulateList]);

    useEffect(() => {
        containerRef.current?.addEventListener('scroll', (event) => {
            const bottomScroll = event.target.scrollTop + event.target.clientHeight;
            const scrollHeight = event.target.scrollHeight;

            setEnded(bottomScroll >= scrollHeight)
        })
    }, []);

    return (
        <div className="list-item-container" ref={containerRef}>
            {list.slice(0,10).map((item) => (
                <TodoInfo item={item} key={item.id} ended={ended}/>
            ))}
        </div>
    )
}

export default ListItems;
