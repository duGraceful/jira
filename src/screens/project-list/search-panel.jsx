import React from 'react';

export const SearchPanel = ({ param,  setParams, users }) => {

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