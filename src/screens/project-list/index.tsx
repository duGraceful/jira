import React, { useState, useEffect } from 'react';
import * as qs from 'qs';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useMount, useDebounce } from 'utils';

const apiUrl = process.env.REACT_APP_API_URL;


export const ProjectListScreen = () => {


    const [param, setParams] = useState({
        name: '',
        personId: ''
    });
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    const debounceParam = useDebounce(param, 500)

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debounceParam])
    
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
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