import React, { useState, useEffect } from 'react';
import * as qs from 'qs';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useMount, useDebounce } from 'utils';
import { useHttp } from 'utils/http';

const apiUrl = process.env.REACT_APP_API_URL;


export const ProjectListScreen = () => {


    const [param, setParams] = useState({
        name: '',
        personId: ''
    });
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    const debounceParam = useDebounce(param, 200)

    const client = useHttp();

    useEffect(() => {
        client('projects', {data: cleanObject(debounceParam)}).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceParam])
    
    useMount(() => {
        client('users').then(setUsers)
    })
    return (
        <div>
            <SearchPanel
                param={param}
                setParams={setParams}
                users={users}
            />
            <List
                list={list}
                users={users}
            />
        </div>
    )
}