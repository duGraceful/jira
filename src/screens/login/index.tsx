import React, { FormEvent } from 'react';

// interface Base {
//     id: number
// }
// interface Person extends Base {
//     name: string
// }
// const p: Person = { name: '123', id: 123 };

const apiUrl = process.env.REACT_APP_API_URL;


// 鸭子类型：面向接口编程，不是面向对象编程
export const LoginScreen = () => {

    const login = (param: {username: string, password: string}) => {
        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(param)
        }).then(async response => {
            if (response.ok) {
            }
        })
    }

    // HTMLFormElement extends Element
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLFormElement).value
        const password = (event.currentTarget.elements[1] as HTMLFormElement).value
        login({ username, password });
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id={"username"} />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id={"password"} />
            </div>
            <button type="submit">登录</button>
        </form>
    )
}