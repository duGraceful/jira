import React from 'react';
export interface User {
    id: string,
    name: string,
    email: string,
    title: string,
    organization: string,
}

interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string,
    },
    setParams: (param: SearchPanelProps['param']) => void,
}

export const SearchPanel = ({ param,  setParams, users }: SearchPanelProps) => {

    return <form action="">
        <div>
            <input
                type="text"
                value={param.name}
                onChange={evt => setParams({ ...param, name: evt.target.value })}
            />
            <select
                value={param.personId}
                onChange={evt => setParams({ ...param, personId: evt.target.value })}
            >
                <option  value=''>负责人</option>
                {
                    users.map((user, index) => (
                        <option
                            key={index}
                            value={user.id}
                        >
                            {user.name}
                        </option>
                    ))
                }
            </select>
        </div>
    </form>
}